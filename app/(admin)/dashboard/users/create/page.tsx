import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreateUserPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/users" className="flex items-center text-zinc-400 hover:text-white mb-4 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Users
        </Link>
        <h1 className="text-2xl font-bold text-white">Create New User</h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
                    <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" placeholder="John" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" placeholder="Doe" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" placeholder="john@example.com" />
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
                <input type="password" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" placeholder="••••••••" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Role</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                        <option>User</option>
                        <option>Admin</option>
                        <option>Editor</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Suspended</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <Link href="/dashboard/users" className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    Cancel
                </Link>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                    Create User
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
