"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "All",
  "CRM",
  "Marketing",
  "SaaS Ops",
  "E-commerce",
  "Support",
  "Analytics",
  "Document Management",
  "Finance",
];

interface FiltersProps {
  selectedCategory: string;
  priceRange: string;
  selectedTool: string;
  page: number;
}

export default function Filters({
  selectedCategory,
  priceRange,
  selectedTool,
  page,
}: FiltersProps) {
  const router = useRouter();

  const buildQueryString = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams();
    const current = {
      tool: selectedTool,
      category: selectedCategory,
      priceRange,
      page: page.toString(),
    };
    const merged = { ...current, ...updates };

    Object.entries(merged).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "1") {
        newParams.set(key, value);
      }
    });

    const query = newParams.toString();
    return query ? `?${query}` : "";
  };

  return (
    <>
      <div className="flex-1">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Category
        </label>
        <Select
          value={selectedCategory}
          onValueChange={(value) =>
            router.push(
              `/products${buildQueryString({
                category: value,
                page: "1",
              })}`,
            )
          }
        >
          <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Price Range
        </label>
        <Select
          value={priceRange}
          onValueChange={(value) =>
            router.push(
              `/products${buildQueryString({
                priceRange: value,
                page: "1",
              })}`,
            )
          }
        >
          <SelectTrigger className="h-11 w-full rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
            <SelectItem value="All">All Prices</SelectItem>
            <SelectItem value="0-150">Under $150</SelectItem>
            <SelectItem value="150-200">$150 - $200</SelectItem>
            <SelectItem value="200+">$200+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
