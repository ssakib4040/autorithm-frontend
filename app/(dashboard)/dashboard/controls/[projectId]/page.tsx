"use client";

import { use, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Plus, Save, Sparkles, Trash2 } from "lucide-react";

type BlockType = "text" | "number" | "boolean";

interface Block {
  id: string;
  title: string;
  type: BlockType;
  value: string | number | boolean;
}

export default function ProjectControlsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [blockType, setBlockType] = useState<BlockType>("text");
  const [blocks, setBlocks] = useState<Block[]>([
    { id: crypto.randomUUID(), title: "API Endpoint", type: "text", value: "https://api.example.com" },
    { id: crypto.randomUUID(), title: "Retry Count", type: "number", value: 3 },
    { id: crypto.randomUUID(), title: "Enable Logging", type: "boolean", value: true },
  ]);

  const addBlock = () => {
    const block: Block = {
      id: crypto.randomUUID(),
      title: "Untitled Block",
      type: blockType,
      value: blockType === "text" ? "" : blockType === "number" ? 0 : false,
    };
    setBlocks((prev) => [...prev, block]);
  };

  const updateBlock = (id: string, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-cyan-50/50 to-violet-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Project Config
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Controls: {projectId}</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Edit configuration blocks for this project environment.</p>
          </div>
          <Button className="rounded-xl">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </section>

      <Card>
        <CardContent className="p-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">Add Block Type</p>
            <select
              value={blockType}
              onChange={(e) => setBlockType(e.target.value as BlockType)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
          </div>
          <Button onClick={addBlock} className="rounded-lg sm:mt-5">
            <Plus className="mr-2 h-4 w-4" />
            Add Block
          </Button>
          <div className="sm:ml-auto inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            {blocks.length} blocks in configuration
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        {blocks.map((block) => (
          <Card key={block.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <Input
                  value={block.title}
                  onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                  className="h-10 rounded-lg"
                />
                <Badge variant="outline" className="capitalize">{block.type}</Badge>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => removeBlock(block.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {block.type === "text" && (
                <Input
                  value={String(block.value)}
                  onChange={(e) => updateBlock(block.id, { value: e.target.value })}
                  placeholder="Value"
                  className="h-10 rounded-lg"
                />
              )}

              {block.type === "number" && (
                <Input
                  type="number"
                  value={Number(block.value)}
                  onChange={(e) => updateBlock(block.id, { value: Number(e.target.value) })}
                  className="h-10 rounded-lg"
                />
              )}

              {block.type === "boolean" && (
                <label className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={Boolean(block.value)}
                    onChange={(e) => updateBlock(block.id, { value: e.target.checked })}
                  />
                  Enabled
                </label>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
