"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Messages() {
  // Placeholder data - would be fetched from API in production
  const messages = [
    {
      id: 1,
      subject: "Support for AI Lead Enrichment setup",
      sender: "support@autorithm.com",
      date: "2024-02-12",
      status: "resolved",
    },
    {
      id: 2,
      subject: "Question about workflow customization",
      sender: "support@autorithm.com",
      date: "2024-02-08",
      status: "resolved",
    },
    {
      id: 3,
      subject: "Account upgrade inquiry",
      sender: "support@autorithm.com",
      date: "2024-02-01",
      status: "new",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300";
      case "in-progress":
        return "bg-yellow-100 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300";
      case "resolved":
        return "bg-emerald-100 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300";
      default:
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Messages
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          View your support messages and inquiries
        </p>
      </div>

      {/* Messages List */}
      <div>
        {messages.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <MessageSquare className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400 text-center">
                No messages yet
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-950/20 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                        {message.subject}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        {message.sender} —{" "}
                        {new Date(message.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/contact">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Need help?
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                Contact our support team or send a new inquiry
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact">Send Message</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
