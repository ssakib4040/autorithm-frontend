"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Sparkles, Trophy, Users } from "lucide-react";

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://autorithm.com/ref/user_12345";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { id: 1, name: "Sarah Johnson", date: "2024-02-05", status: "converted", reward: "$10.00" },
    { id: 2, name: "Mike Chen", date: "2024-01-20", status: "converted", reward: "$10.00" },
    { id: 3, name: "Emma Davis", date: "2024-01-15", status: "pending", reward: "$0.00" },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-amber-50/60 to-orange-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative">
          <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Rewards Program
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Referral Program</h1>
          <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Share your referral link and earn rewards for successful signups.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total Earnings</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">$20.00</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Referrals</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">3</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Converted</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2</p></CardContent></Card>
      </section>

      <Card>
        <CardContent className="p-5 space-y-3">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Your Referral Link</p>
          <div className="flex gap-2">
            <div className="flex-1 truncate rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 font-mono text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">{referralLink}</div>
            <Button variant="outline" size="icon" className="rounded-lg" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-emerald-600 dark:text-emerald-400">Copied to clipboard!</p>}
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Earn $10 for each successful referral conversion.</p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        {referrals.map((referral) => (
          <Card key={referral.id}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/20">
                    <Users className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{referral.name}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Referred on {new Date(referral.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{referral.reward}</p>
                  <Badge variant="outline" className={referral.status === "converted" ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-600 dark:text-zinc-300"}>
                    {referral.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-amber-800 dark:text-amber-300 inline-flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Want faster rewards? Share your link in your automation communities.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
