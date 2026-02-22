"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  PhotoIcon,
  ClockIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  KeyIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

// Mock user data
const userData = {
  id: 1,
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  phone: "+1 (555) 123-4567",
  company: "Tech Corp",
  role: "Admin",
  status: "Active",
  joined: "2024-01-15",
  lastActive: "2 hours ago",
  purchases: 12,
  revenue: 4850,
  avgOrderValue: 404,
};

const activityLog = [
  {
    action: 'Purchased "Premium Package"',
    date: "2 hours ago",
    type: "purchase",
  },
  { action: "Updated profile information", date: "1 day ago", type: "profile" },
  { action: "Password changed", date: "3 days ago", type: "security" },
  { action: "Logged in from new device", date: "5 days ago", type: "login" },
  { action: 'Purchased "Starter Plan"', date: "1 week ago", type: "purchase" },
];

export default function EditUserPage() {
  const [selectedRole, setSelectedRole] = useState(userData.role);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "activity"
  >("profile");

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/users"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4 transition-colors group"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Users
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xl">
              {getInitials(userData.firstName, userData.lastName)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-zinc-400 mt-1">
                Member since {userData.joined}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-sm font-medium transition-colors">
              <EnvelopeIcon className="h-4 w-4 inline mr-2" />
              Send Email
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">
                Total Purchases
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                {userData.purchases}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10">
              <ShoppingBagIcon className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-white mt-1">
                ${userData.revenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10">
              <CurrencyDollarIcon className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">
                Avg Order Value
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                ${userData.avgOrderValue}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10">
              <ChartBarIcon className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">Last Active</p>
              <p className="text-base font-bold text-white mt-1">
                {userData.lastActive}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10">
              <ClockIcon className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="border-b border-zinc-800">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "profile"
                  ? "border-blue-500 text-white bg-zinc-800/50"
                  : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30"
              }`}
            >
              <UserCircleIcon className="h-4 w-4 inline mr-2" />
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "security"
                  ? "border-blue-500 text-white bg-zinc-800/50"
                  : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30"
              }`}
            >
              <LockClosedIcon className="h-4 w-4 inline mr-2" />
              Security & Access
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "activity"
                  ? "border-blue-500 text-white bg-zinc-800/50"
                  : "border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30"
              }`}
            >
              <ClockIcon className="h-4 w-4 inline mr-2" />
              Activity Log
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form className="space-y-6">
              {/* Profile Photo */}
              <div className="pb-6 border-b border-zinc-800">
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-2xl">
                      {getInitials(userData.firstName, userData.lastName)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-2">
                      Profile Photo
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      Update the user&apos;s profile picture
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                      >
                        <PhotoIcon className="h-4 w-4" />
                        Change Photo
                      </button>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 px-4 py-2 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-base font-semibold text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.firstName}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.lastName}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      <span className="flex items-center gap-2">
                        <EnvelopeIcon className="h-4 w-4 text-zinc-400" />
                        Email Address <span className="text-red-400">*</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      defaultValue={userData.email}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      <span className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4 text-zinc-400" />
                        Phone Number
                      </span>
                    </label>
                    <input
                      type="tel"
                      defaultValue={userData.phone}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      <span className="flex items-center gap-2">
                        <BuildingOfficeIcon className="h-4 w-4 text-zinc-400" />
                        Company
                      </span>
                    </label>
                    <input
                      type="text"
                      defaultValue={userData.company}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <Link
                  href="/admin/users"
                  className="px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-medium"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Role & Status */}
              <div>
                <h3 className="text-base font-semibold text-white mb-4">
                  Role & Permissions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      User Role <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="User">User</option>
                      <option value="Editor">Editor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Account Status <span className="text-red-400">*</span>
                    </label>
                    <select
                      defaultValue={userData.status}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Role Description */}
                <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedRole === "Admin"
                          ? "bg-purple-500/10"
                          : selectedRole === "Editor"
                            ? "bg-blue-500/10"
                            : "bg-zinc-800"
                      }`}
                    >
                      <ShieldCheckIcon
                        className={`h-5 w-5 ${
                          selectedRole === "Admin"
                            ? "text-purple-400"
                            : selectedRole === "Editor"
                              ? "text-blue-400"
                              : "text-zinc-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm mb-1">
                        {selectedRole === "Admin" && "Administrator"}
                        {selectedRole === "Editor" && "Editor"}
                        {selectedRole === "User" && "Standard User"}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {selectedRole === "Admin" &&
                          "Full access to all features including user management, settings, and system configuration."}
                        {selectedRole === "Editor" &&
                          "Can create, edit, and manage content. Limited access to user management and settings."}
                        {selectedRole === "User" &&
                          "Basic access to view and interact with content. Cannot modify system settings."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Reset */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-4">
                  Password Management
                </h3>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <KeyIcon className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          Reset Password
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Send password reset email to user
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordReset(!showPasswordReset)}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Send Reset Link
                    </button>
                  </div>
                  {showPasswordReset && (
                    <div className="pt-4 border-t border-zinc-800">
                      <p className="text-sm text-emerald-400">
                        ✓ Password reset email sent successfully!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Options */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-4">
                  Security Options
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-zinc-950 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">
                        Two-Factor Authentication
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Require verification code when logging in
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-zinc-950 transition-colors">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">
                        Email Notifications
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Send notifications about account activity
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-zinc-950 transition-colors">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">
                        Login Alerts
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Alert user when logging in from new devices
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-zinc-800 flex justify-end gap-3">
                <Link
                  href="/admin/users"
                  className="px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-medium"
                >
                  Cancel
                </Link>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/20"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === "activity" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {activityLog.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          activity.type === "purchase"
                            ? "bg-emerald-500/10"
                            : activity.type === "security"
                              ? "bg-amber-500/10"
                              : activity.type === "login"
                                ? "bg-blue-500/10"
                                : "bg-purple-500/10"
                        }`}
                      >
                        {activity.type === "purchase" && (
                          <ShoppingBagIcon className="h-5 w-5 text-emerald-400" />
                        )}
                        {activity.type === "security" && (
                          <LockClosedIcon className="h-5 w-5 text-amber-400" />
                        )}
                        {activity.type === "login" && (
                          <GlobeAltIcon className="h-5 w-5 text-blue-400" />
                        )}
                        {activity.type === "profile" && (
                          <UserCircleIcon className="h-5 w-5 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* View More */}
              <div className="text-center pt-4">
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Load More Activity
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-zinc-900 border-2 border-red-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 shrink-0">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-1">
              Danger Zone
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Irreversible actions that will permanently affect this user
              account
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                <TrashIcon className="h-4 w-4 inline mr-2" />
                Delete Account
              </button>
              <button className="px-4 py-2 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-600/30 text-amber-400 rounded-lg text-sm font-medium transition-colors">
                Suspend Account
              </button>
              <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
                Revoke All Sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
