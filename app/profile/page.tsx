"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import {
  User,
  Lock,
  Save,
  Settings,
  LogOut,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form states
  const [name, setName] = useState(session?.user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const getUserInitials = (name: string) => {
    return name
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
        // Trigger session reload
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
    router.push("/auth/login");
    return null;
  }

  const user = session.user;

  return (
    <>
      <div className=" bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                      {user.name}
                    </h1>
                    {user.isAdmin && (
                      <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                    {user.email}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
                    <Badge variant="outline">
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      {user.purchasedProducts?.length || 0} Products
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="purchases">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Purchases
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
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
                        className="bg-zinc-50 dark:bg-zinc-900"
                      />
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Email cannot be changed. Contact support if needed.
                      </p>
                    </div>

                    {message && (
                      <Alert
                        variant={
                          message.type === "error" ? "destructive" : "default"
                        }
                      >
                        {message.type === "success" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>{message.text}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
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
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>

                    {message && (
                      <Alert
                        variant={
                          message.type === "error" ? "destructive" : "default"
                        }
                      >
                        {message.type === "success" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>{message.text}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" disabled={isLoading}>
                      <Lock className="w-4 h-4 mr-2" />
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Purchases Tab */}
            <TabsContent value="purchases">
              <Card>
                <CardHeader>
                  <CardTitle>Your Purchases</CardTitle>
                  <CardDescription>
                    View and manage your purchased products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.purchasedProducts &&
                  user.purchasedProducts.length > 0 ? (
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        You have purchased {user.purchasedProducts.length}{" "}
                        product(s).
                      </p>
                      <Button asChild variant="outline">
                        <Link href="/dashboard/overview">
                          View in Dashboard
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingBag className="mx-auto h-12 w-12 text-zinc-400" />
                      <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                        No purchases yet
                      </h3>
                      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Start exploring our automation products!
                      </p>
                      <Button asChild className="mt-6">
                        <Link href="/products">Browse Products</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-zinc-900 dark:text-white">
                          Account ID
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                          {user.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <div>
                        <h3 className="font-medium text-zinc-900 dark:text-white">
                          Email Notifications
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                          Receive updates about your purchases and account
                        </p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>

                    {user.isAdmin && (
                      <div className="flex items-center justify-between p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/10">
                        <div>
                          <h3 className="font-medium text-zinc-900 dark:text-white flex items-center">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Admin Access
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            You have administrator privileges
                          </p>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href="/admin">Admin Panel</Link>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-medium text-zinc-900 dark:text-white mb-4">
                      Danger Zone
                    </h3>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full sm:w-auto"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

function ProfileSettingsSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Skeleton */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 animate-pulse">
              {/* Avatar Skeleton */}
              <div className="h-24 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              
              <div className="flex-1 text-center sm:text-left w-full">
                {/* Name Skeleton */}
                <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48 mx-auto sm:mx-0 mb-3" />
                
                {/* Email Skeleton */}
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-64 mx-auto sm:mx-0 mb-4" />
                
                {/* Badge Skeleton */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-32" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-6">
          {/* Tabs List Skeleton */}
          <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
            <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded-md" />
          </div>

          {/* Card Content Skeleton */}
          <Card>
            <CardHeader className="animate-pulse">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48 mb-2" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full max-w-md" />
            </CardHeader>
            <CardContent className="space-y-6 animate-pulse">
              {/* Form Fields Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24 mb-2" />
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
              </div>
              
              <div className="space-y-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32 mb-2" />
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full" />
              </div>

              {/* Button Skeleton */}
              <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
