"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Eye,
  Lock,
  Save,
  ShieldCheck,
  Sparkles,
  UserCircle,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-cyan-50/50 to-violet-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-14 -top-10 h-44 w-44 rounded-full bg-violet-400/15 blur-3xl" />

        <div className="relative">
          <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Account Control
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Settings
          </h1>
          <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Manage profile details, security controls, and communication preferences.
          </p>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCircle className="h-5 w-5 text-blue-500" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Full Name
              </label>
              <Input className="mt-2 h-11 rounded-xl" placeholder="John Doe" defaultValue="John Doe" />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Email Address
              </label>
              <Input
                className="mt-2 h-11 rounded-xl"
                placeholder="john@example.com"
                defaultValue="john@example.com"
                disabled
              />
            </div>
          </div>

          <Button className="rounded-xl">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Password</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Last changed 3 months ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Two-Factor Authentication</p>
                <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Not enabled</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">Enable</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5 text-violet-500" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Email Notifications</p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Receive updates about purchases and account activity.
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Marketing Emails</p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Receive product launches and promotional offers.
              </p>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
