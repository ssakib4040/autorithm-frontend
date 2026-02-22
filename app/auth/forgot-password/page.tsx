"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { Loader2, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthShell from "@/components/auth/AuthShell";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      // For development - show the reset token
      if (data.resetToken) {
        setResetToken(data.resetToken);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Forgot password"
      description="Enter your email and we will send you secure reset instructions."
    >
      <Card className="border-zinc-800/90 bg-zinc-900/85 shadow-2xl shadow-black/30 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-zinc-100">
              Reset Password
            </CardTitle>
            <CardDescription className="text-zinc-400">
              We&apos;ll send you instructions to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    If an account exists with that email, we&apos;ve sent
                    password reset instructions.
                  </AlertDescription>
                </Alert>

                {resetToken && (
                  <Alert>
                    <AlertDescription className="text-xs text-zinc-300">
                      <strong>Development Mode:</strong>
                      <br />
                      <Link
                        href={`/auth/reset-password?token=${resetToken}`}
                        className="break-all text-teal-300 hover:text-teal-200"
                      >
                        Click here to reset your password
                      </Link>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="pt-4 flex flex-col gap-2">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/auth/login">Back to Login</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-zinc-700 bg-zinc-950/80 pl-10 text-zinc-100 placeholder:text-zinc-500"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-teal-500 font-semibold text-zinc-950 hover:bg-teal-400"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          {!success && (
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-zinc-400">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-teal-300 hover:text-teal-200"
                >
                  Sign in
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>
    </AuthShell>
  );
}
