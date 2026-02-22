"use client";

import { useRouter } from "next/navigation";
import {
  BarChart3,
  CircleDollarSign,
  FileText,
  HandHelping,
  Layers,
  Megaphone,
  Rocket,
  ShoppingCart,
  Tags,
  Users,
  Wallet,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const categoryOptions = [
  { value: "All", label: "All", icon: Layers },
  { value: "CRM", label: "CRM", icon: Users },
  { value: "Marketing", label: "Marketing", icon: Megaphone },
  { value: "SaaS Ops", label: "SaaS Ops", icon: Rocket },
  { value: "E-commerce", label: "E-commerce", icon: ShoppingCart },
  { value: "Support", label: "Support", icon: HandHelping },
  { value: "Analytics", label: "Analytics", icon: BarChart3 },
  {
    value: "Document Management",
    label: "Document Management",
    icon: FileText,
  },
  { value: "Finance", label: "Finance", icon: Wallet },
] as const;

const priceOptions = [
  { value: "All", label: "All Prices", icon: Tags },
  { value: "0-150", label: "Under $150", icon: CircleDollarSign },
  { value: "150-200", label: "$150 - $200", icon: CircleDollarSign },
  { value: "200+", label: "$200+", icon: CircleDollarSign },
] as const;

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
  const selectedCategoryOption =
    categoryOptions.find((option) => option.value === selectedCategory) ??
    categoryOptions[0];
  const selectedPriceOption =
    priceOptions.find((option) => option.value === priceRange) ??
    priceOptions[0];

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
            <div className="flex items-center gap-2 truncate">
              <selectedCategoryOption.icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="truncate">{selectedCategoryOption.label}</span>
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
            {categoryOptions.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                <div className="flex items-center gap-2">
                  <category.icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <span>{category.label}</span>
                </div>
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
            <div className="flex items-center gap-2 truncate">
              <selectedPriceOption.icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="truncate">{selectedPriceOption.label}</span>
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
            {priceOptions.map((price) => (
              <SelectItem key={price.value} value={price.value}>
                <div className="flex items-center gap-2">
                  <price.icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  <span>{price.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
