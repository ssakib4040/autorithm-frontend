"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";

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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const callbackUrl = searchParams.get("callbackUrl");
  const registered = searchParams.get("registered");
  const verified = searchParams.get("verified");
  const reset = searchParams.get("reset");

  const successMessage = registered
    ? "Registration successful! Please sign in."
    : verified
      ? "Email verified successfully! You can now sign in."
      : reset === "success"
        ? "Password reset successful! Please sign in with your new password."
        : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    console.log("Turnstile token:", turnstileToken);

    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/profile",
      });

      if (result?.error) {
        console.log("Login error:", result);
        setError(result?.error || "Something went wrong");
      } else if (result?.ok) {
        router.push(callbackUrl || "/");
      }
    } catch {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to access your automations, purchases, and account settings."
    >
      <Card className="border-zinc-800/90 bg-zinc-900/85 shadow-2xl shadow-black/30 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-zinc-100">
              Sign in
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Enter your email and password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMessage && (
                <Alert className="border-emerald-500/30 bg-emerald-500/10 text-emerald-200">
                  <AlertDescription>
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-200">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-zinc-700 bg-zinc-950/80 pl-10 pr-10 text-zinc-100 placeholder:text-zinc-500"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-2.5 rounded p-1 text-zinc-400 hover:text-zinc-100"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Turnstile */}
              <div className="w-full">
                <Turnstile
                  siteKey={
                    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                    "1x00000000000000000000AA"
                  }
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() =>
                    setError("Verification failed. Please try again.")
                  }
                  onExpire={() => setTurnstileToken("")}
                  options={{
                    theme: "auto",
                    size: "flexible",
                  }}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-500 font-semibold text-zinc-950 hover:bg-teal-400"
                size="lg"
                disabled={isLoading || !turnstileToken}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-teal-300 hover:text-teal-200"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
    </AuthShell>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
