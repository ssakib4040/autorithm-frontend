import { Metadata } from "next";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us - Autorithm",
  description: "Get in touch with the Autorithm team for support or inquiries.",
};

export default function Contact() {
  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Have a question or need help? Send us a message.
            </p>
          </div>

          {/* Contact Form */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  {/* <textarea
                    id="message"
                    className="flex min-h-37.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message..."
                    required
                  /> */}
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    required
                    className="min-h-37.5"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Email Alternative */}
          <div className="text-center p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
              Or email us directly at
            </p>
            <a
              href="mailto:hello@autorithm.com"
              className="text-lg font-semibold text-zinc-900 dark:text-white hover:text-primary transition-colors"
            >
              hello@autorithm.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
