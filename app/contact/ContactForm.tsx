"use client";

import { FormEvent, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { contactApi } from "@/features/api";

export default function ContactForm() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = Boolean(accessToken);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!turnstileToken) {
      setError("Please complete the security verification");
      return;
    }

    if (!accessToken) {
      setError("Please sign in to send a message");
      return;
    }

    setIsLoading(true);

    try {
      const result = await contactApi.create(
        {
          name,
          subject,
          message,
          turnstileToken,
        },
        accessToken,
      );
      setSuccess(result.message);
      setName("");
      setSubject("");
      setMessage("");
      setTurnstileToken("");
    } catch (err) {
      const error = err as Error;
      setError(error?.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-zinc-200/80 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
      <CardContent className="pt-8">
        <div className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Contact
          </p>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            Send a message
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            We reply within one business day.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {success && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <AlertDescription className="text-green-800 dark:text-green-200">
                {success}
              </AlertDescription>
            </Alert>
          )}
          {!isAuthenticated && (
            <Alert variant="destructive">
              <AlertDescription>
                Please sign in to contact support.
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              disabled={isLoading || !isAuthenticated}
              className="bg-white/80 dark:bg-zinc-900/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="How can we help?"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              disabled={isLoading || !isAuthenticated}
              className="bg-white/80 dark:bg-zinc-900/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              required
              className="min-h-37.5 bg-white/80 dark:bg-zinc-900/60"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              disabled={isLoading || !isAuthenticated}
            />
          </div>
          <div className="w-full">
            <Turnstile
              siteKey={
                process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                "1x00000000000000000000AA"
              }
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setError("Verification failed. Please try again.")}
              onExpire={() => setTurnstileToken("")}
              options={{
                theme: "auto",
                size: "flexible",
              }}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            size="lg"
            disabled={!turnstileToken || isLoading || !isAuthenticated}
          >
            <Send className="mr-2 h-4 w-4" />
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
