import { RectangleStackIcon } from "@heroicons/react/24/outline";

export default function PresetsPage() {
  return (
    <div className="text-center py-20">
      <RectangleStackIcon className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Workflow Presets</h2>
      <p className="text-zinc-400">
        Save and load configuration presets for different use cases
      </p>
    </div>
  );
}
