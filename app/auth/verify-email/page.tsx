"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
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

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [isResending, setIsResending] = useState(false);

  const verifyEmail = useCallback(
    async (verificationToken: string) => {
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: verificationToken }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Verification failed");
        }

        setStatus("success");
        setMessage(data.message || "Email verified successfully!");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login?verified=true");
        }, 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Verification failed");
      }
    },
    [router],
  );

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("Verification token is missing");
    }
  }, [token, verifyEmail]);

  const handleResendVerification = async () => {
    if (!email) {
      setMessage("Email address is required to resend verification");
      return;
    }

    setIsResending(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification");
      }

      setMessage("Verification email sent! Please check your inbox.");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Failed to resend verification",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthShell
      title="Email verification"
      description={
        status === "loading"
          ? "Verifying your email and activating your account."
          : "Check your verification result and continue."
      }
    >
      <Card className="border-zinc-800/90 bg-zinc-900/85 shadow-2xl shadow-black/30 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold text-zinc-100">
              {status === "loading" && "Verifying..."}
              {status === "success" && "Verified!"}
              {status === "error" && "Verification Failed"}
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              {status === "loading" && "Please wait while we verify your email"}
              {status === "success" &&
                "Your email has been successfully verified"}
              {status === "error" && "We couldn't verify your email"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === "loading" && (
                <div className="flex justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-teal-300" />
                </div>
              )}

            {status === "success" && (
              <>
                <Alert className="border-emerald-500/30 bg-emerald-500/10 text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <AlertDescription>
                    {message}
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-emerald-300" />
                </div>

                <p className="text-center text-sm text-zinc-400">
                  Redirecting you to login...
                </p>
              </>
            )}

            {status === "error" && (
              <>
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>

                <div className="flex justify-center">
                  <XCircle className="h-16 w-16 text-destructive" />
                </div>

                {email && (
                  <Button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Resend Verification Email
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {status === "success" && (
              <Button
                asChild
                className="w-full bg-teal-500 font-semibold text-zinc-950 hover:bg-teal-400"
                size="lg"
              >
                <Link href="/auth/login">Continue to Login</Link>
              </Button>
            )}

            {status === "error" && (
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
    </AuthShell>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
