"use client";

import { type ChangeEvent, use, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Check,
  Download,
  GripVertical,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

type BlockType =
  | "text"
  | "number"
  | "boolean"
  | "list"
  | "keyvalue"
  | "singleSelect"
  | "multiSelect"
  | "section";

type KeyValueItem = { key: string; value: string };

type BlockValue =
  | string
  | number
  | boolean
  | string[]
  | KeyValueItem[]
  | null;

interface Block {
  id: string;
  title: string;
  type: BlockType;
  value: BlockValue;
  options?: string[];
  children?: Block[];
}

type DropPosition = "before" | "after";

const blockTypeOptions: { value: BlockType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "list", label: "List" },
  { value: "keyvalue", label: "Key/Value" },
  { value: "singleSelect", label: "Single Select" },
  { value: "multiSelect", label: "Multi Select" },
  { value: "section", label: "Section" },
];

function createDefaultValue(type: BlockType): BlockValue {
  switch (type) {
    case "text":
      return "";
    case "number":
      return 0;
    case "boolean":
      return false;
    case "list":
      return [""];
    case "keyvalue":
      return [{ key: "", value: "" }];
    case "singleSelect":
      return "";
    case "multiSelect":
      return [];
    case "section":
      return null;
    default:
      return "";
  }
}

function createBlock(type: BlockType): Block {
  return {
    id: crypto.randomUUID(),
    title: "Untitled Block",
    type,
    value: createDefaultValue(type),
    options:
      type === "singleSelect" || type === "multiSelect"
        ? ["Option 1", "Option 2"]
        : undefined,
    children: type === "section" ? [] : undefined,
  };
}

function isBlockType(value: unknown): value is BlockType {
  return (
    value === "text" ||
    value === "number" ||
    value === "boolean" ||
    value === "list" ||
    value === "keyvalue" ||
    value === "singleSelect" ||
    value === "multiSelect" ||
    value === "section"
  );
}

function isValidBlock(candidate: unknown): candidate is Block {
  if (!candidate || typeof candidate !== "object") return false;
  const block = candidate as Partial<Block>;
  if (typeof block.id !== "string") return false;
  if (typeof block.title !== "string") return false;
  if (!isBlockType(block.type)) return false;

  if (
    (block.type === "singleSelect" || block.type === "multiSelect") &&
    block.options &&
    !Array.isArray(block.options)
  ) {
    return false;
  }

  if (block.options && block.options.some((opt) => typeof opt !== "string")) {
    return false;
  }

  if (block.children) {
    if (!Array.isArray(block.children)) return false;
    if (!block.children.every((child) => isValidBlock(child))) return false;
  }

  return true;
}

function isValidBlocks(candidate: unknown): candidate is Block[] {
  return Array.isArray(candidate) && candidate.every((block) => isValidBlock(block));
}

function reorderBlocks(
  blocks: Block[],
  sourceId: string,
  targetId: string,
  position: DropPosition,
) {
  const sourceIndex = blocks.findIndex((b) => b.id === sourceId);
  const targetIndex = blocks.findIndex((b) => b.id === targetId);
  if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) {
    return blocks;
  }

  const next = [...blocks];
  const [moved] = next.splice(sourceIndex, 1);

  const adjustedTargetIndex =
    sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
  const insertIndex =
    position === "before" ? adjustedTargetIndex : adjustedTargetIndex + 1;
  next.splice(insertIndex, 0, moved);
  return next;
}

export default function ProjectControlsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);

  const [newBlockType, setNewBlockType] = useState<BlockType>("text");
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const dragHandleArmedIdRef = useRef<string | null>(null);
  const [dragOverTargetId, setDragOverTargetId] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition>("before");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: crypto.randomUUID(),
      title: "API Endpoint",
      type: "text",
      value: "https://api.example.com/v1",
    },
    {
      id: crypto.randomUUID(),
      title: "Retry Count",
      type: "number",
      value: 3,
    },
    {
      id: crypto.randomUUID(),
      title: "Environment",
      type: "singleSelect",
      value: "production",
      options: ["development", "staging", "production"],
    },
    {
      id: crypto.randomUUID(),
      title: "Enabled Modules",
      type: "multiSelect",
      value: ["billing"],
      options: ["billing", "notifications", "audit-logs"],
    },
    {
      id: crypto.randomUUID(),
      title: "Security Settings",
      type: "section",
      value: null,
      children: [
        {
          id: crypto.randomUUID(),
          title: "Enable Rate Limiting",
          type: "boolean",
          value: true,
        },
      ],
    },
  ]);

  const totalBlocks = useMemo(() => {
    return blocks.reduce((count, block) => count + 1 + (block.children?.length || 0), 0);
  }, [blocks]);

  const addTopLevelBlock = () => {
    setBlocks((prev) => [...prev, createBlock(newBlockType)]);
  };

  const updateBlock = (id: string, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((block) => (block.id === id ? { ...block, ...patch } : block)));
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  const addChildBlock = (sectionId: string, type: BlockType = "text") => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== sectionId || block.type !== "section") return block;
        return {
          ...block,
          children: [...(block.children || []), createBlock(type)],
        };
      }),
    );
  };

  const updateChildBlock = (sectionId: string, childId: string, patch: Partial<Block>) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== sectionId || !block.children) return block;
        return {
          ...block,
          children: block.children.map((child) =>
            child.id === childId ? { ...child, ...patch } : child,
          ),
        };
      }),
    );
  };

  const removeChildBlock = (sectionId: string, childId: string) => {
    setBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== sectionId || !block.children) return block;
        return {
          ...block,
          children: block.children.filter((child) => child.id !== childId),
        };
      }),
    );
  };

  const renderOptionsEditor = (
    options: string[] | undefined,
    onChange: (next: string[]) => void,
  ) => {
    const list = options || [];
    return (
      <div className="space-y-2">
        {list.map((opt, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Input
              value={opt}
              onChange={(e) => {
                const next = [...list];
                next[idx] = e.target.value;
                onChange(next);
              }}
              className="h-9 rounded-lg"
              placeholder="Option label"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg"
              onClick={() => onChange(list.filter((_, i) => i !== idx))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg"
          onClick={() => onChange([...list, `Option ${list.length + 1}`])}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Option
        </Button>
      </div>
    );
  };

  const renderValueEditor = (
    block: Block,
    onPatch: (patch: Partial<Block>) => void,
  ) => {
    switch (block.type) {
      case "text":
        return (
          <Input
            value={String(block.value)}
            onChange={(e) => onPatch({ value: e.target.value })}
            className="h-10 rounded-lg"
            placeholder="Enter text"
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={Number(block.value)}
            onChange={(e) => onPatch({ value: Number(e.target.value) })}
            className="h-10 rounded-lg"
          />
        );
      case "boolean":
        return (
          <label className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={Boolean(block.value)}
              onChange={(e) => onPatch({ value: e.target.checked })}
            />
            Enabled
          </label>
        );
      case "list": {
        const items = (block.value as string[]) || [];
        return (
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={item}
                  onChange={(e) => {
                    const next = [...items];
                    next[idx] = e.target.value;
                    onPatch({ value: next });
                  }}
                  className="h-9 rounded-lg"
                  placeholder="List value"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => onPatch({ value: items.filter((_, i) => i !== idx) })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => onPatch({ value: [...items, ""] })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        );
      }
      case "keyvalue": {
        const pairs = (block.value as KeyValueItem[]) || [];
        return (
          <div className="space-y-2">
            {pairs.map((pair, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={pair.key}
                  onChange={(e) => {
                    const next = [...pairs];
                    next[idx] = { ...next[idx], key: e.target.value };
                    onPatch({ value: next });
                  }}
                  className="h-9 rounded-lg"
                  placeholder="Key"
                />
                <Input
                  value={pair.value}
                  onChange={(e) => {
                    const next = [...pairs];
                    next[idx] = { ...next[idx], value: e.target.value };
                    onPatch({ value: next });
                  }}
                  className="h-9 rounded-lg"
                  placeholder="Value"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => onPatch({ value: pairs.filter((_, i) => i !== idx) })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => onPatch({ value: [...pairs, { key: "", value: "" }] })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Pair
            </Button>
          </div>
        );
      }
      case "singleSelect": {
        const options = block.options || [];
        return (
          <div className="space-y-3">
            {renderOptionsEditor(options, (next) => onPatch({ options: next }))}
            <select
              value={String(block.value)}
              onChange={(e) => onPatch({ value: e.target.value })}
              className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <option value="">Select an option</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      }
      case "multiSelect": {
        const options = block.options || [];
        const selected = new Set((block.value as string[]) || []);
        return (
          <div className="space-y-3">
            {renderOptionsEditor(options, (next) => onPatch({ options: next }))}
            <div className="space-y-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              {options.map((opt) => {
                const active = selected.has(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const next = new Set(selected);
                      if (next.has(opt)) next.delete(opt);
                      else next.add(opt);
                      onPatch({ value: [...next] });
                    }}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <span>{opt}</span>
                    {active && <Check className="h-4 w-4 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      }
      case "section":
        return null;
      default:
        return null;
    }
  };

  const exportConfig = () => {
    const payload = {
      version: 1,
      projectId,
      exportedAt: new Date().toISOString(),
      blocks,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `controls-${projectId}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const triggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const parsed = JSON.parse(content) as unknown;
      const importedBlocks =
        parsed && typeof parsed === "object" && "blocks" in parsed
          ? (parsed as { blocks: unknown }).blocks
          : parsed;

      if (!isValidBlocks(importedBlocks)) {
        alert("Invalid import file format.");
        return;
      }

      setBlocks(importedBlocks);
    } catch {
      alert("Failed to import configuration file.");
    } finally {
      event.target.value = "";
    }
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
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Controls: {projectId}
            </h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Rich block editor with drag-and-drop reordering and advanced value types.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImport}
            />
            <Button variant="outline" className="rounded-xl" onClick={triggerImport}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={exportConfig}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="rounded-xl">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </section>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Add Block Type
            </p>
            <select
              value={newBlockType}
              onChange={(e) => setNewBlockType(e.target.value as BlockType)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {blockTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={addTopLevelBlock} className="rounded-lg sm:mt-5">
            <Plus className="mr-2 h-4 w-4" />
            Add Block
          </Button>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 sm:ml-auto">
            {totalBlocks} total blocks (including section children)
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        {blocks.map((block) => (
          <div key={block.id} className="relative">
            {dragOverTargetId === block.id && dropPosition === "before" && (
              <div className="pointer-events-none absolute -top-1.5 left-2 right-2 z-20 h-1 rounded-full bg-blue-500/90 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]" />
            )}

            <Card
              draggable
              className={
                draggedBlockId === block.id
                  ? "opacity-60 scale-[0.995] transition-transform"
                  : "transition-transform"
              }
              onDragStart={(e) => {
                if (dragHandleArmedIdRef.current !== block.id) {
                  e.preventDefault();
                  return;
                }
                dragHandleArmedIdRef.current = null;
                setDraggedBlockId(block.id);
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragEnd={() => {
                setDraggedBlockId(null);
                setDragOverTargetId(null);
                setDropPosition("before");
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (!draggedBlockId || draggedBlockId === block.id) return;

                const rect = e.currentTarget.getBoundingClientRect();
                const nextPosition: DropPosition =
                  e.clientY < rect.top + rect.height / 2 ? "before" : "after";
                setDragOverTargetId(block.id);
                setDropPosition(nextPosition);
                e.dataTransfer.dropEffect = "move";
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (!draggedBlockId || draggedBlockId === block.id) return;
                setBlocks((prev) =>
                  reorderBlocks(prev, draggedBlockId, block.id, dropPosition),
                );
                setDraggedBlockId(null);
                setDragOverTargetId(null);
                setDropPosition("before");
              }}
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <div
                    className="cursor-grab text-zinc-400"
                    title="Drag to reorder"
                    data-drag-handle="true"
                    onMouseDown={() => {
                      dragHandleArmedIdRef.current = block.id;
                    }}
                    onMouseUp={() => {
                      dragHandleArmedIdRef.current = null;
                    }}
                  >
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <Input
                    value={block.title}
                    onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                    className="h-10 rounded-lg"
                  />
                  <Badge variant="outline" className="capitalize">
                    {block.type}
                  </Badge>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-lg"
                    onClick={() => removeBlock(block.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {block.type !== "section" &&
                  renderValueEditor(block, (patch) => updateBlock(block.id, patch))}

                {block.type === "section" && (
                  <div className="space-y-2 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Section Blocks
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        onClick={() => addChildBlock(block.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Child
                      </Button>
                    </div>

                    {(block.children || []).length === 0 ? (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        No child blocks yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {(block.children || []).map((child) => (
                          <div
                            key={child.id}
                            className="space-y-2 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
                          >
                            <div className="flex items-center gap-2">
                              <Input
                                value={child.title}
                                onChange={(e) =>
                                  updateChildBlock(block.id, child.id, {
                                    title: e.target.value,
                                  })
                                }
                                className="h-9 rounded-lg"
                              />
                              <Badge variant="outline" className="capitalize">
                                {child.type}
                              </Badge>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg"
                                onClick={() => removeChildBlock(block.id, child.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {renderValueEditor(child, (patch) =>
                              updateChildBlock(block.id, child.id, patch),
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {dragOverTargetId === block.id && dropPosition === "after" && (
              <div className="pointer-events-none absolute -bottom-1.5 left-2 right-2 z-20 h-1 rounded-full bg-blue-500/90 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]" />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
