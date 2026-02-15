"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Users } from "lucide-react";
import { useState } from "react";

export default function Referral() {
  const [copied, setCopied] = useState(false);

  const referralLink = "https://autorithm.com/ref/user_12345";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "2024-02-05",
      status: "converted",
      reward: "$10.00",
    },
    {
      id: 2,
      name: "Mike Chen",
      date: "2024-01-20",
      status: "converted",
      reward: "$10.00",
    },
    {
      id: 3,
      name: "Emma Davis",
      date: "2024-01-15",
      status: "pending",
      reward: "$0.00",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Referral Program
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Earn rewards by referring friends
        </p>
      </div>

      {/* Referral Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Total Earnings
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              $20.00
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Referrals
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              3
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Converted
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              2
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 font-mono text-sm text-zinc-600 dark:text-zinc-400 truncate">
              {referralLink}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              Copied to clipboard!
            </p>
          )}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Share this link to earn $10 for each successful referral
          </p>
        </CardContent>
      </Card>

      {/* Referrals List */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Recent Referrals
        </h3>
        <div className="space-y-3">
          {referrals.map((referral) => (
            <Card key={referral.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-zinc-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {referral.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Referred on{" "}
                        {new Date(referral.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {referral.reward}
                      </p>
                      <Badge
                        variant={
                          referral.status === "converted"
                            ? "default"
                            : "outline"
                        }
                        className="text-xs mt-1"
                      >
                        {referral.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
