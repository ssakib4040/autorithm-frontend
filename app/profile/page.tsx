"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  LogOut,
  Save,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Message = {
  type: "success" | "error";
  text: string;
};

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  const purchasedCount = useMemo(
    () => session?.user?.purchasedProducts?.length || 0,
    [session?.user?.purchasedProducts],
  );

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getUserInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        window.location.reload();
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to update profile",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Password changed successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to change password",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <ProfileSettingsSkeleton />;
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="bg-linear-to-b from-zinc-50 via-white to-zinc-100 py-12 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-blue-50/60 to-violet-50/60 p-6 sm:p-8 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
          <div className="absolute -right-16 -top-12 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20 border border-zinc-200 dark:border-zinc-800">
              <AvatarFallback className="bg-blue-600 text-white text-xl font-semibold">
                {getUserInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {user.name}
                </h1>
                {user.isAdmin && (
                  <Badge className="border-purple-200 bg-purple-100 text-purple-700 dark:border-purple-900 dark:bg-purple-950/30 dark:text-purple-300">
                    <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                    Admin
                  </Badge>
                )}
              </div>

              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{user.email}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                  {purchasedCount} Purchases
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Workspace Active
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue="profile" className="space-y-5">
          <TabsList className="grid w-full grid-cols-2 gap-1 rounded-xl p-1 md:grid-cols-4">
            <TabsTrigger value="profile" className="rounded-lg">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg">
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="purchases" className="rounded-lg">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your public profile details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-11 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="h-11 rounded-xl bg-zinc-50 dark:bg-zinc-900"
                    />
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Email cannot be changed from profile settings.
                    </p>
                  </div>

                  {message && <MessageAlert message={message} />}

                  <Button type="submit" disabled={isLoading} className="rounded-xl">
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Keep your account secure with a strong password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="h-11 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="h-11 rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="h-11 rounded-xl"
                      required
                    />
                  </div>

                  {message && <MessageAlert message={message} />}

                  <Button type="submit" disabled={isLoading} className="rounded-xl">
                    <Lock className="mr-2 h-4 w-4" />
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>Your Purchases</CardTitle>
                <CardDescription>
                  Access purchased templates and downloads.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {purchasedCount > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      You currently own {purchasedCount} product(s).
                    </p>
                    <Button asChild variant="outline" className="rounded-xl">
                      <Link href="/dashboard/purchases">Open Purchases</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <ShoppingBag className="mx-auto h-10 w-10 text-zinc-400" />
                    <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      No purchases yet
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      Start exploring automation products.
                    </p>
                    <Button asChild className="mt-5 rounded-xl">
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Review account metadata and access settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Account ID</p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{user.id}</p>
                </div>

                <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Email Notifications</p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Receive purchase and account updates.</p>
                  </div>
                  <Badge variant="outline">Enabled</Badge>
                </div>

                {user.isAdmin && (
                  <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4 dark:border-purple-800 dark:bg-purple-900/10 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 inline-flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Admin Access
                      </p>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">You have administrator privileges.</p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="rounded-lg">
                      <Link href="/admin">Admin Panel</Link>
                    </Button>
                  </div>
                )}

                <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                  <p className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Danger Zone</p>
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="rounded-xl"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MessageAlert({ message }: { message: Message }) {
  return (
    <Alert variant={message.type === "error" ? "destructive" : "default"}>
      {message.type === "success" ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertDescription>{message.text}</AlertDescription>
    </Alert>
  );
}

function ProfileSettingsSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white py-12 dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        <Card className="animate-pulse">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-2 w-full">
                <div className="h-8 w-56 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-pulse">
          <CardContent className="space-y-4 p-6">
            <div className="h-10 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
