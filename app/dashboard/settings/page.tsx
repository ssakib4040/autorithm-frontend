import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
  return (
    <div className="text-center py-20">
      <AdjustmentsHorizontalIcon className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
      <p className="text-zinc-400">
        Configure account preferences and integrations
      </p>
    </div>
  );
}
