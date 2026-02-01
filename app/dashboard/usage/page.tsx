import { ChartBarIcon } from "@heroicons/react/24/outline";

export default function UsagePage() {
  return (
    <div className="text-center py-20">
      <ChartBarIcon className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Usage</h2>
      <p className="text-zinc-400">
        Monitor workflow performance and resource consumption
      </p>
    </div>
  );
}
