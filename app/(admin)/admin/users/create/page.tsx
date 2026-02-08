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
  CheckCircleIcon,
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function CreateUserPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("User");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/users"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4 transition-colors group"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Users
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Create New User</h1>
            <p className="text-zinc-400 mt-1">
              Add a new user account to the system
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-zinc-500">
                <UserCircleIcon className="h-16 w-16" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">
                Profile Photo
              </h3>
              <p className="text-sm text-zinc-400 mb-4">
                Upload a profile picture for the user account
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  <PhotoIcon className="h-4 w-4" />
                  Upload Photo
                </button>
                <button
                  type="button"
                  className="text-zinc-400 hover:text-white px-4 py-2 text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <UserCircleIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Personal Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="John"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="Doe"
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
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="john.doe@example.com"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                This will be used for login and notifications
              </p>
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
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="+1 (555) 000-0000"
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
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="Acme Inc."
              />
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <LockClosedIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Account Security
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-1.5">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Confirm Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
            <div className="flex items-start gap-2">
              <InformationCircleIcon className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400">
                <p className="font-medium text-zinc-300 mb-1">
                  Password Requirements:
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>At least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Role & Permissions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Role & Permissions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                User Role <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="User">User</option>
                <option value="Editor">Editor</option>
                <option value="Admin">Admin</option>
              </select>
              <p className="text-xs text-zinc-500 mt-1.5">
                Determines access level and permissions
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Account Status <span className="text-red-400">*</span>
              </label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer">
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

        {/* Additional Options */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircleIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Additional Options
            </h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  Send welcome email
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Send an email to the user with their account details and login
                  instructions
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  Require password change on first login
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  User will be prompted to change their password when they first
                  log in
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  Enable two-factor authentication
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Require an additional verification code when logging in
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400">
            <span className="text-red-400">*</span> Required fields
          </p>
          <div className="flex gap-3">
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
              Create User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
