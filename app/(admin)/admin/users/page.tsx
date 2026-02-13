"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  lastActive: string;
  purchases: number;
  revenue: number;
};

type StatsCard = {
  label: string;
  value: string;
  change: string;
  trending: "up" | "down";
  icon: typeof UserGroupIcon;
  color: string;
};

export default function UsersPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState<StatsCard[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const toggleAllUsers = () => {
    setSelectedUsers((prev) =>
      prev.length === users.length ? [] : users.map((u) => u.id),
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarColor = (id?: string) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-emerald-500",
      "bg-amber-500",
      "bg-cyan-500",
    ];
    if (!id) {
      return colors[0];
    }
    let hash = 0;
    for (let i = 0; i < id.length; i += 1) {
      hash = (hash + id.charCodeAt(i)) % colors.length;
    }
    return colors[hash];
  };

  const derivedStats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "Active").length;
    const inactiveUsers = users.filter(
      (user) => user.status === "Inactive",
    ).length;
    const suspendedUsers = users.filter(
      (user) => user.status === "Suspended",
    ).length;

    return [
      {
        label: "Total Users",
        value: totalUsers.toLocaleString(),
        change: "",
        trending: "up",
        icon: UserGroupIcon,
        color: "blue",
      },
      {
        label: "Active Users",
        value: activeUsers.toLocaleString(),
        change: "",
        trending: "up",
        icon: CheckCircleIcon,
        color: "emerald",
      },
      {
        label: "Inactive",
        value: inactiveUsers.toLocaleString(),
        change: "",
        trending: "down",
        icon: XCircleIcon,
        color: "amber",
      },
      {
        label: "Suspended",
        value: suspendedUsers.toLocaleString(),
        change: "",
        trending: "up",
        icon: ClockIcon,
        color: "red",
      },
    ] as StatsCard[];
  }, [users]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    fetchUsers();
  }, [accessToken]);

  useEffect(() => {
    setStats(derivedStats);
  }, [derivedStats]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-zinc-400 mt-1">
            Manage and monitor all user accounts
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </button>
          <Link
            href="/admin/users/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
          >
            <PlusIcon className="h-4 w-4" />
            Add User
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-zinc-400 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-white mt-2">
                  {stat.value}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium mt-2 ${
                    stat.trending === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                  <span className="text-zinc-500">vs last month</span>
                </span>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <select className="appearance-none bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-zinc-700 cursor-pointer">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>User</option>
              </select>
            </div>
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <select className="appearance-none bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-zinc-700 cursor-pointer">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex gap-2">
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Change Role
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Activate
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={toggleAllUsers}
                    className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Purchases
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-800/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(user.id)} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
                      >
                        {getInitials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate">
                          {user.name}
                        </div>
                        <div className="text-zinc-400 text-xs flex items-center gap-1 mt-0.5">
                          <EnvelopeIcon className="h-3 w-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Admin"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : user.role === "Editor"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-zinc-700 text-zinc-300 border border-zinc-600"
                      }`}
                    >
                      {user.role === "Admin" && (
                        <ShieldCheckIcon className="h-3 w-3" />
                      )}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : user.status === "Suspended"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-400"
                            : user.status === "Suspended"
                              ? "bg-red-400"
                              : "bg-amber-400"
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {user.purchases}
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    ${(user.revenue ?? 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                        title="Edit user"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-red-400 transition-all"
                        title="Delete user"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowActions(
                              showActions === user.id ? null : user.id,
                            )
                          }
                          className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                        >
                          <EllipsisVerticalIcon className="h-4 w-4" />
                        </button>
                        {showActions === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-10 py-1">
                            <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                              View Profile
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                              Send Email
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                              Reset Password
                            </button>
                            <hr className="my-1 border-zinc-700" />
                            <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-zinc-700 transition-colors">
                              Suspend Account
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-400">
              Showing <span className="font-medium text-white">1</span> to{" "}
              <span className="font-medium text-white">6</span> of{" "}
              <span className="font-medium text-white">24</span> users
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm transition-colors">
                3
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm transition-colors">
                4
              </button>
              <button className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
