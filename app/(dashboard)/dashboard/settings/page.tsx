"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Settings
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your account preferences and security
        </p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-900 dark:text-white">
              Full Name
            </label>
            <Input
              className="mt-2"
              placeholder="John Doe"
              defaultValue="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-900 dark:text-white">
              Email Address
            </label>
            <Input
              className="mt-2"
              placeholder="john@example.com"
              defaultValue="john@example.com"
              disabled
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Password
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Last changed 3 months ago
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Two-Factor Authentication
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Not enabled
                </p>
              </div>
            </div>
            <Badge variant="outline">Enable</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Email Notifications
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Receive updates about your purchases and account
              </p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Marketing Emails
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                New products and special offers
              </p>
            </div>
            <input type="checkbox" className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
