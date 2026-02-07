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
import { ThemeToggle } from "@/components/theme-toggle";

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
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-8">
        {/* Logo/Brand */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Email Verification
          </h1>
          <p className="text-muted-foreground">
            {status === "loading"
              ? "Verifying your email..."
              : "Verification Status"}
          </p>
        </div>

        {/* Verification Card */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {status === "loading" && "Verifying..."}
              {status === "success" && "Verified!"}
              {status === "error" && "Verification Failed"}
            </CardTitle>
            <CardDescription className="text-center">
              {status === "loading" && "Please wait while we verify your email"}
              {status === "success" &&
                "Your email has been successfully verified"}
              {status === "error" && "We couldn't verify your email"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {status === "loading" && (
              <div className="flex justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            )}

            {status === "success" && (
              <>
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">
                    {message}
                  </AlertDescription>
                </Alert>

                <div className="flex justify-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>

                <p className="text-center text-sm text-muted-foreground">
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
              <Button asChild className="w-full" size="lg">
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

        {/* Additional Links */}
        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
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
