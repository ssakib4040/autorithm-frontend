"use client";

import { useState } from "react";
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
} from "@heroicons/react/24/outline";

type BlockType = "text" | "number" | "boolean" | "list" | "keyvalue" | "section";

interface Block {
  id: string;
  type: BlockType;
  title: string;
  value: any;
  children?: Block[];
}

export default function ProjectControlsPage({ params }: { params: { projectId: string } }) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>("text");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const addBlock = () => {
    const newBlock: Block = {
      id: Date.now().toString(),
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
      id: Date.now().toString(),
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
      })
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
      })
    );
  };

  const duplicateBlock = (block: Block) => {
    const duplicated: Block = {
      ...block,
      id: Date.now().toString(),
      title: `${block.title} (Copy)`,
      children: block.children ? [...block.children] : undefined,
    };
    setBlocks([...blocks, duplicated]);
  };

  const updateBlockTitle = (blockId: string, title: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, title } : block
      )
    );
  };

  const updateBlockValue = (blockId: string, value: any) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId ? { ...block, value } : block
      )
    );
  };

  const updateChildBlockTitle = (
    sectionId: string,
    blockId: string,
    title: string
  ) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === sectionId && block.children) {
          return {
            ...block,
            children: block.children.map((child) =>
              child.id === blockId ? { ...child, title } : child
            ),
          };
        }
        return block;
      })
    );
  };

  const updateChildBlockValue = (
    sectionId: string,
    blockId: string,
    value: any
  ) => {
    setBlocks(
      blocks.map((block) => {
        if (block.id === sectionId && block.children) {
          return {
            ...block,
            children: block.children.map((child) =>
              child.id === blockId ? { ...child, value } : child
            ),
          };
        }
        return block;
      })
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

  const renderValueEditor = (block: Block, updateFn: any) => {
    switch (block.type) {
      case "text":
        return (
          <input
            type="text"
            value={block.value}
            onChange={(e) => updateFn(block.id, e.target.value)}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter text"
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={block.value}
            onChange={(e) => updateFn(block.id, Number(e.target.value))}
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            placeholder="Enter number"
          />
        );
      case "boolean":
        return (
          <button
            onClick={() => updateFn(block.id, !block.value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              block.value ? "bg-blue-600" : "bg-zinc-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                block.value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        );
      case "list":
        return (
          <div className="space-y-2">
            {block.value.map((item: string, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newList = [...block.value];
                    newList[idx] = e.target.value;
                    updateFn(block.id, newList);
                  }}
                  className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Value"
                />
                <button
                  onClick={() => {
                    const newList = block.value.filter(
                      (_: any, i: number) => i !== idx
                    );
                    updateFn(block.id, newList);
                  }}
                  className="p-2 text-zinc-500 hover:text-red-400"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateFn(block.id, [...block.value, ""])}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + Add item
            </button>
          </div>
        );
      case "keyvalue":
        return (
          <div className="space-y-2">
            {block.value.map((pair: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pair.key}
                  onChange={(e) => {
                    const newPairs = [...block.value];
                    newPairs[idx].key = e.target.value;
                    updateFn(block.id, newPairs);
                  }}
                  className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Key"
                />
                <input
                  type="text"
                  value={pair.value}
                  onChange={(e) => {
                    const newPairs = [...block.value];
                    newPairs[idx].value = e.target.value;
                    updateFn(block.id, newPairs);
                  }}
                  className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Value"
                />
                <button
                  onClick={() => {
                    const newPairs = block.value.filter(
                      (_: any, i: number) => i !== idx
                    );
                    updateFn(block.id, newPairs);
                  }}
                  className="p-2 text-zinc-500 hover:text-red-400"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                updateFn(block.id, [
                  ...block.value,
                  { key: "", value: "" },
                ])
              }
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + Add pair
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800/50 pb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-white">Project Controls</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-all"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-all">
              <ArrowUpTrayIcon className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
        <p className="text-zinc-400 text-sm mb-3">
          Build your own configuration structure for this project.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
          <span className="text-xs font-mono text-blue-300">{params.projectId}</span>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <div className="h-20 w-20 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center mx-auto mb-6">
              <Bars3Icon className="h-10 w-10 text-zinc-600" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Blank Canvas
            </h2>
            <p className="text-zinc-500 text-sm mb-6">
              Start building your configuration structure by adding blocks
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/20"
            >
              <PlusIcon className="h-5 w-5" />
              Add Block
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 font-medium"
          >
            <PlusIcon className="h-5 w-5" />
            Add Block
          </button>

          {blocks.map((block) =>
            block.type === "section" ? (
              <div
                key={block.id}
                className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 bg-zinc-900/50">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleSection(block.id)}
                      className="text-zinc-400 hover:text-white"
                    >
                      {expandedSections.has(block.id) ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                    <input
                      type="text"
                      value={block.title}
                      onChange={(e) =>
                        updateBlockTitle(block.id, e.target.value)
                      }
                      className="flex-1 text-lg font-semibold text-white bg-transparent border-none focus:outline-none"
                    />
                    <span className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-lg font-mono">
                      section
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => duplicateBlock(block)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    >
                      <DocumentDuplicateIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => removeBlock(block.id)}
                      className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {expandedSections.has(block.id) && (
                  <div className="p-6 space-y-3">
                    {block.children && block.children.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-sm text-zinc-500 mb-3">
                          No blocks in this section
                        </p>
                        <button
                          onClick={() => addBlockToSection(block.id)}
                          className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                        >
                          Add block
                        </button>
                      </div>
                    ) : (
                      <>
                        {block.children?.map((child) => (
                          <div
                            key={child.id}
                            className="group flex items-start gap-4 p-4 bg-zinc-900/50 border border-zinc-800/30 rounded-xl hover:border-zinc-700/50 transition-all"
                          >
                            <button className="mt-3 text-zinc-600 hover:text-zinc-400 cursor-grab">
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
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-3 py-2 bg-zinc-950/50 border border-zinc-800/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
                                />
                                <span className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-lg font-mono">
                                  {child.type}
                                </span>
                              </div>

                              {renderValueEditor(child, (id: string, value: any) =>
                                updateChildBlockValue(block.id, id, value)
                              )}
                            </div>

                            <button
                              onClick={() =>
                                removeBlockFromSection(block.id, child.id)
                              }
                              className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => addBlockToSection(block.id)}
                          className="w-full py-2 border border-dashed border-zinc-800 rounded-lg text-zinc-500 hover:border-blue-500/50 hover:text-blue-400 text-sm font-medium transition-all"
                        >
                          + Add block
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div
                key={block.id}
                className="group flex items-start gap-4 p-4 bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-xl hover:border-zinc-700/50 transition-all shadow-lg"
              >
                <button className="mt-3 text-zinc-600 hover:text-zinc-400 cursor-grab">
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
                      className="flex-1 px-3 py-2 bg-zinc-950/50 border border-zinc-800/50 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500/50"
                    />
                    <span className="text-xs text-zinc-500 bg-zinc-800/50 px-3 py-1.5 rounded-lg font-mono">
                      {block.type}
                    </span>
                  </div>

                  {renderValueEditor(block, updateBlockValue)}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => duplicateBlock(block)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800/50"
                  >
                    <DocumentDuplicateIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h3 className="text-lg font-semibold text-white">
                Choose Block Type
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {[
                { type: "text" as BlockType, label: "Text", desc: "Single line text input" },
                { type: "number" as BlockType, label: "Number", desc: "Numeric value" },
                { type: "boolean" as BlockType, label: "Boolean", desc: "True/false toggle" },
                { type: "list" as BlockType, label: "List", desc: "Multiple values" },
                { type: "keyvalue" as BlockType, label: "Key-Value Map", desc: "Key-value pairs" },
                { type: "section" as BlockType, label: "Section / Group", desc: "Container for other blocks" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSelectedBlockType(item.type)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedBlockType === item.type
                      ? "bg-blue-600/20 border-2 border-blue-500"
                      : "bg-zinc-800/30 border-2 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="font-medium text-white">{item.label}</div>
                  <div className="text-xs text-zinc-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={addBlock}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500"
              >
                Add Block
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
              <h3 className="text-lg font-semibold text-white">
                Import Project Configuration
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  JSON Configuration
                </label>
                <textarea
                  className="w-full h-64 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 font-mono text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Paste JSON configuration..."
                />
              </div>

              <div className="flex gap-3">
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 cursor-pointer hover:bg-zinc-800">
                  <input type="radio" name="import-mode" defaultChecked className="text-blue-600" />
                  <span className="text-sm text-zinc-300">Replace</span>
                </label>
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700 cursor-pointer hover:bg-zinc-800">
                  <input type="radio" name="import-mode" className="text-blue-600" />
                  <span className="text-sm text-zinc-300">Merge</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500"
                >
                  Import
                </button>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700"
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
