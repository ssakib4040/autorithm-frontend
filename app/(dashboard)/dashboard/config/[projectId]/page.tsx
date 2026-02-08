"use client";

import { use, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  CubeIcon,
  Square3Stack3DIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

type BlockType =
  | "text"
  | "number"
  | "boolean"
  | "list"
  | "keyvalue"
  | "section";

type BlockValue =
  | string
  | number
  | boolean
  | string[]
  | { key: string; value: string }[]
  | null;

interface Block {
  id: string;
  type: BlockType;
  title: string;
  value: BlockValue;
  children?: Block[];
}

export default function ProjectControlsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>("text");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  const addBlock = () => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type: selectedBlockType,
      title: "Untitled",
      value: getDefaultValue(selectedBlockType),
      children: selectedBlockType === "section" ? [] : undefined,
    };
    setBlocks([...blocks, newBlock]);
    setShowAddModal(false);
    if (selectedBlockType === "section") {
      setExpandedSections(new Set([...expandedSections, newBlock.id]));
    }
  };

  const addBlockToSection = (sectionId: string) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type: "text",
      title: "Untitled",
      value: "",
    };
    setBlocks(
      blocks.map((block) => {
        if (block.id === sectionId && block.children) {
          return { ...block, children: [...block.children, newBlock] };
        }
        return block;
      }),
    );
  };

  const removeBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
  };

  const removeBlockFromSection = (sectionId: string, blockId: string) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === sectionId && block.children) {
          return {
            ...block,
            children: block.children.filter((c) => c.id !== blockId),
          };
        }
        return block;
      }),
    );
  };

  const duplicateBlock = (block: Block) => {
    const duplicated: Block = {
      ...block,
      id: crypto.randomUUID(),
      title: `${block.title} (Copy)`,
      children: block.children ? [...block.children] : undefined,
    };
    setBlocks([...blocks, duplicated]);
  };

  const updateBlockTitle = (blockId: string, title: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, title } : block,
      ),
    );
  };

  const updateBlockValue = (blockId: string, value: BlockValue) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, value } : block,
      ),
    );
  };

  const updateChildBlockTitle = (
    sectionId: string,
    blockId: string,
    title: string,
  ) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === sectionId && block.children) {
          return {
            ...block,
            children: block.children.map((child) =>
              child.id === blockId ? { ...child, title } : child,
            ),
          };
        }
        return block;
      }),
    );
  };

  const updateChildBlockValue = (
    sectionId: string,
    blockId: string,
    value: BlockValue,
  ) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === sectionId && block.children) {
          return {
            ...block,
            children: block.children.map((child) =>
              child.id === blockId ? { ...child, value } : child,
            ),
          };
        }
        return block;
      }),
    );
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getDefaultValue = (type: BlockType) => {
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
      case "section":
        return null;
      default:
        return "";
    }
  };

  const renderValueEditor = (
    block: Block,
    updateFn: (id: string, value: BlockValue) => void,
  ) => {
    switch (block.type) {
      case "text":
        return (
          <input
            type="text"
            value={block.value as string}
            onChange={(e) => updateFn(block.id, e.target.value)}
            className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="Enter text"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={block.value as number}
            onChange={(e) => updateFn(block.id, Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="Enter number"
          />
        );
      case "boolean":
        return (
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateFn(block.id, !(block.value as boolean))}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all shadow-lg ${
                block.value ? "bg-blue-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
                  block.value ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-zinc-400">
              {block.value ? "Enabled" : "Disabled"}
            </span>
          </div>
        );
      case "list":
        return (
          <div className="space-y-2">
            {(block.value as string[]).map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="shrink-0 w-6 h-6 rounded-full bg-zinc-800/50 border border-zinc-700 flex items-center justify-center text-xs text-zinc-500 font-medium">
                  {idx + 1}
                </div>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newList = [...(block.value as string[])];
                    newList[idx] = e.target.value;
                    updateFn(block.id, newList);
                  }}
                  className="flex-1 px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Value"
                />
                <button
                  onClick={() => {
                    const newList = (block.value as string[]).filter(
                      (_item: string, i: number) => i !== idx,
                    );
                    updateFn(block.id, newList);
                  }}
                  className="p-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                updateFn(block.id, [...(block.value as string[]), ""])
              }
              className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5"
            >
              <PlusIcon className="h-4 w-4" />
              Add item
            </button>
          </div>
        );
      case "keyvalue":
        return (
          <div className="space-y-2">
            {(block.value as { key: string; value: string }[]).map(
              (pair: { key: string; value: string }, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pair.key}
                    onChange={(e) => {
                      const newPairs = [
                        ...(block.value as { key: string; value: string }[]),
                      ];
                      newPairs[idx].key = e.target.value;
                      updateFn(block.id, newPairs);
                    }}
                    className="flex-1 px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Key"
                  />
                  <span className="text-zinc-600 font-bold">:</span>
                  <input
                    type="text"
                    value={pair.value}
                    onChange={(e) => {
                      const newPairs = [
                        ...(block.value as { key: string; value: string }[]),
                      ];
                      newPairs[idx].value = e.target.value;
                      updateFn(block.id, newPairs);
                    }}
                    className="flex-1 px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Value"
                  />
                  <button
                    onClick={() => {
                      const newPairs = (
                        block.value as { key: string; value: string }[]
                      ).filter(
                        (_pair: { key: string; value: string }, i: number) =>
                          i !== idx,
                      );
                      updateFn(block.id, newPairs);
                    }}
                    className="p-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ),
            )}
            <button
              onClick={() =>
                updateFn(block.id, [
                  ...(block.value as { key: string; value: string }[]),
                  { key: "", value: "" },
                ])
              }
              className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5"
            >
              <PlusIcon className="h-4 w-4" />
              Add pair
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const totalBlocks = blocks.reduce((count, block) => {
    if (block.type === "section" && block.children) {
      return count + 1 + block.children.length;
    }
    return count + 1;
  }, 0);

  const sectionCount = blocks.filter((b) => b.type === "section").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Project Configuration
          </h1>
          <p className="text-zinc-400 text-sm">
            Build custom configuration structures with blocks and sections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:border-zinc-600 hover:text-white transition-all shadow-lg"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:border-zinc-600 hover:text-white transition-all shadow-lg">
            <ArrowUpTrayIcon className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Project ID Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
        <span className="text-sm font-medium text-zinc-300">Project ID:</span>
        <span className="text-sm font-mono text-blue-300 font-semibold">
          {projectId}
        </span>
      </div>

      {/* Stats Cards */}
      {blocks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <CubeIcon className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-medium mb-1">
              Total Blocks
            </p>
            <p className="text-3xl font-bold text-white">{totalBlocks}</p>
            <p className="text-xs text-zinc-500 mt-2">
              All configuration items
            </p>
          </div>

          <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <Square3Stack3DIcon className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-medium mb-1">Sections</p>
            <p className="text-3xl font-bold text-white">{sectionCount}</p>
            <p className="text-xs text-zinc-500 mt-2">Grouped configurations</p>
          </div>

          <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-medium mb-1">Status</p>
            <p className="text-xl font-bold text-green-400">Active</p>
            <p className="text-xs text-zinc-500 mt-2">Configuration ready</p>
          </div>

          <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <ClockIcon className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-zinc-400 text-sm font-medium mb-1">
              Last Modified
            </p>
            <p className="text-xl font-bold text-white">Just now</p>
            <p className="text-xs text-zinc-500 mt-2">Auto-saved</p>
          </div>
        </div>
      )}

      {/* Content Area */}
      {blocks.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <div className="relative mx-auto mb-8">
              <div className="h-24 w-24 rounded-3xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-zinc-700/50 flex items-center justify-center mx-auto backdrop-blur-xl">
                <Bars3Icon className="h-12 w-12 text-zinc-600" />
              </div>
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-500/20 border border-blue-500/40 animate-ping"></div>
              <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-500 border border-blue-400"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Start Building
            </h2>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              Create your custom configuration structure with blocks and
              sections. Add text fields, numbers, toggles, lists, and more.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/40"
            >
              <PlusIcon className="h-5 w-5" />
              Add Your First Block
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-2xl text-zinc-500 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-blue-500/10"
          >
            <PlusIcon className="h-5 w-5" />
            Add Block
          </button>

          {blocks.map((block) =>
            block.type === "section" ? (
              <div
                key={block.id}
                className="bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl hover:border-zinc-700/50 transition-all"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50 bg-zinc-900/60">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleSection(block.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
                    >
                      {expandedSections.has(block.id) ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Square3Stack3DIcon className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type="text"
                      value={block.title}
                      onChange={(e) =>
                        updateBlockTitle(block.id, e.target.value)
                      }
                      className="flex-1 text-lg font-bold text-white bg-transparent border-none focus:outline-none"
                      placeholder="Section name"
                    />
                    <span className="text-xs text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-lg font-mono border border-zinc-700/50">
                      section
                    </span>
                    {block.children && block.children.length > 0 && (
                      <span className="text-xs text-zinc-500 bg-zinc-800/30 px-2.5 py-1 rounded-lg font-medium">
                        {block.children.length} items
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateBlock(block)}
                      className="p-2.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all"
                      title="Duplicate section"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-2.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                      title="Delete section"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {expandedSections.has(block.id) && (
                  <div className="p-6 space-y-3">
                    {block.children && block.children.length === 0 ? (
                      <div className="text-center py-12 bg-zinc-950/30 rounded-xl border border-zinc-800/30">
                        <div className="h-16 w-16 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4">
                          <CubeIcon className="h-8 w-8 text-zinc-600" />
                        </div>
                        <p className="text-sm text-zinc-500 mb-4 font-medium">
                          This section is empty
                        </p>
                        <button
                          onClick={() => addBlockToSection(block.id)}
                          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-all"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add first block
                        </button>
                      </div>
                    ) : (
                      <>
                        {block.children?.map((child) => (
                          <div
                            key={child.id}
                            className="group flex items-start gap-4 p-5 bg-zinc-950/50 border border-zinc-800/40 rounded-xl hover:border-zinc-700/60 hover:bg-zinc-950/70 transition-all shadow-lg"
                          >
                            <button className="mt-3 text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-zinc-800/50 transition-all">
                              <Bars3Icon className="h-5 w-5" />
                            </button>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <input
                                  type="text"
                                  value={child.title}
                                  onChange={(e) =>
                                    updateChildBlockTitle(
                                      block.id,
                                      child.id,
                                      e.target.value,
                                    )
                                  }
                                  className="flex-1 px-4 py-2.5 bg-zinc-900/50 border border-zinc-800/50 rounded-lg text-white text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                  placeholder="Field name"
                                />
                                <span className="text-xs text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-lg font-mono border border-zinc-700/50 shrink-0">
                                  {child.type}
                                </span>
                              </div>

                              {renderValueEditor(
                                child,
                                (id: string, value: BlockValue) =>
                                  updateChildBlockValue(block.id, id, value),
                              )}
                            </div>

                            <button
                              onClick={() =>
                                removeBlockFromSection(block.id, child.id)
                              }
                              className="p-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-red-500/20"
                              title="Remove block"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addBlockToSection(block.id)}
                          className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 text-sm font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <PlusIcon className="h-4 w-4" />
                          Add block to section
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div
                key={block.id}
                className="group flex items-start gap-4 p-5 bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl hover:border-zinc-700/50 transition-all shadow-xl hover:shadow-2xl"
              >
                <button className="mt-3 text-zinc-600 hover:text-zinc-400 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-zinc-800/50 transition-all">
                  <Bars3Icon className="h-5 w-5" />
                </button>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={block.title}
                      onChange={(e) =>
                        updateBlockTitle(block.id, e.target.value)
                      }
                      className="flex-1 px-4 py-2.5 bg-zinc-950/50 border border-zinc-800/50 rounded-lg text-white text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      placeholder="Field name"
                    />
                    <span className="text-xs text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-lg font-mono border border-zinc-700/50 shrink-0">
                      {block.type}
                    </span>
                  </div>

                  {renderValueEditor(block, updateBlockValue)}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => duplicateBlock(block)}
                    className="p-2.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all"
                    title="Duplicate block"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="p-2.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                    title="Delete block"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      )}

      {/* Add Block Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
              <div>
                <h3 className="text-xl font-bold text-white">Add New Block</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Choose a block type to add to your configuration
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-2.5 max-h-[60vh] overflow-y-auto">
              {[
                {
                  type: "text" as BlockType,
                  label: "Text Input",
                  desc: "Single line text field",
                  icon: "ABC",
                  color: "blue",
                },
                {
                  type: "number" as BlockType,
                  label: "Number Input",
                  desc: "Numeric value field",
                  icon: "123",
                  color: "green",
                },
                {
                  type: "boolean" as BlockType,
                  label: "Boolean Toggle",
                  desc: "True/false switch",
                  icon: "✓",
                  color: "purple",
                },
                {
                  type: "list" as BlockType,
                  label: "List Items",
                  desc: "Array of multiple values",
                  icon: "[]",
                  color: "amber",
                },
                {
                  type: "keyvalue" as BlockType,
                  label: "Key-Value Pairs",
                  desc: "Object with key-value pairs",
                  icon: "{}",
                  color: "pink",
                },
                {
                  type: "section" as BlockType,
                  label: "Section Container",
                  desc: "Group blocks together",
                  icon: "§",
                  color: "cyan",
                },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedBlockType(item.type)}
                  className={`w-full p-4 rounded-xl text-left transition-all group ${
                    selectedBlockType === item.type
                      ? `bg-${item.color}-600/20 border-2 border-${item.color}-500 shadow-lg shadow-${item.color}-500/20`
                      : "bg-zinc-800/30 border-2 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`shrink-0 h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        selectedBlockType === item.type
                          ? `bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-500/30`
                          : `bg-zinc-700/30 text-zinc-500 border border-zinc-700/50 group-hover:bg-zinc-700/50`
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-semibold mb-1 ${
                          selectedBlockType === item.type
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-zinc-500">{item.desc}</div>
                    </div>
                    {selectedBlockType === item.type && (
                      <CheckCircleIcon
                        className={`h-6 w-6 text-${item.color}-400 shrink-0`}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={addBlock}
                className="flex-1 px-5 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25"
              >
                Add Block
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-3.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Import Configuration
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Import your project configuration from JSON
                </p>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-3">
                  JSON Configuration
                </label>
                <textarea
                  className="w-full h-80 px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-300 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
                  placeholder={`{\n  "blocks": [\n    {\n      "type": "text",\n      "title": "App Name",\n      "value": "My App"\n    }\n  ]\n}`}
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Paste your configuration in valid JSON format
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-300 mb-3">
                  Import Mode
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 border-2 border-blue-500 cursor-pointer hover:bg-zinc-800 transition-all">
                    <input
                      type="radio"
                      name="import-mode"
                      defaultChecked
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Replace
                      </div>
                      <div className="text-xs text-zinc-500">
                        Replace all existing blocks
                      </div>
                    </div>
                  </label>
                  <label className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 border-2 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-all">
                    <input
                      type="radio"
                      name="import-mode"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Merge
                      </div>
                      <div className="text-xs text-zinc-500">
                        Add to existing blocks
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-5 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/25"
                >
                  Import Configuration
                </button>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-5 py-3.5 rounded-xl bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
