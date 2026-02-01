import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function DocsPage() {
  return (
    <div className="text-center py-20">
      <DocumentTextIcon className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Docs</h2>
      <p className="text-zinc-400">
        Learn how to configure and optimize your workflows
      </p>
    </div>
  );
}
