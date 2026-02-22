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
  ClockIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

type UserRow = {
  [x: string]: string | number | Date | boolean | undefined;
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  role: string;
  status: string;
  joined: string;
  createdAt: number;
};

// type StatsCard = {
//   label: string;
//   value: string;
//   change: string;
//   trending: "up" | "down";
//   icon: typeof UserGroupIcon;
//   color: string;
// };

export default function UsersPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 1,
  });
  const [meta, setMeta] = useState({
    total_users: 0,
    total_active: 0,
    total_suspended: 0,
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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

  const stats = useMemo(
    () => [
      {
        label: "Total Users",
        value: meta.total_users.toLocaleString(),
        change: "",
        trending: "up" as const,
        icon: UserGroupIcon,
        color: "blue",
      },
      {
        label: "Active Users",
        value: meta.total_active.toLocaleString(),
        change: "",
        trending: "up" as const,
        icon: CheckCircleIcon,
        color: "emerald",
      },
      {
        label: "Suspended",
        value: meta.total_suspended.toLocaleString(),
        change: "",
        trending: "up" as const,
        icon: ClockIcon,
        color: "red",
      },
    ],
    [meta],
  );

  useEffect(() => {
    if (!accessToken) return;

    const fetchUsers = async () => {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "25",
        });

        if (search) params.append("search", search);
        if (roleFilter) params.append("role", roleFilter);
        if (statusFilter) params.append("status", statusFilter);

        const response = await fetch(`/api/admin/users?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const usersWithId = (data.users || []).map((user: any) => ({
          ...user,
          id: user.userId || user._id,
        }));
        setUsers(usersWithId);
        setPagination(
          data.pagination || { page: 1, limit: 25, total: 0, totalPages: 1 },
        );
        setMeta(
          data.meta || { total_users: 0, total_active: 0, total_suspended: 0 },
        );
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    fetchUsers();
  }, [accessToken, page, search, roleFilter, statusFilter]);

  console.log("Users:", users);

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
        <div className="flex flex-col sm:flex-row gap-3">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-zinc-700 cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="appearance-none bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-zinc-700 cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-sm text-zinc-400">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex flex-wrap gap-2">
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
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden md:table-cell">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden lg:table-cell">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider hidden md:table-cell">
                  Joined
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
                        <div className="text-zinc-400 text-xs mt-0.5">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.isAdmin
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          : user.role === "Editor"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-zinc-700 text-zinc-300 border border-zinc-600"
                      }`}
                    >
                      {user.isAdmin && <ShieldCheckIcon className="h-3 w-3" />}
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : user.status === "suspended"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : ""
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "active"
                            ? "bg-emerald-400"
                            : user.status === "suspended"
                              ? "bg-red-400"
                              : "bg-amber-400"
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm hidden md:table-cell">
                    {new Date(user?.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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
                              showActions === user.email ? null : user.email,
                            )
                          }
                          className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                        >
                          <EllipsisVerticalIcon className="h-4 w-4" />
                        </button>
                        {showActions === user.email && (
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
              Showing{" "}
              <span className="font-medium text-white">
                {pagination.total === 0
                  ? 0
                  : (pagination.page - 1) * pagination.limit + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium text-white">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white">{pagination.total}</span>{" "}
              users
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        page === pageNum
                          ? "bg-blue-600 text-white font-medium"
                          : "border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                },
              )}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
