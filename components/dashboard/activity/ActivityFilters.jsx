"use client";

import SelectInput from "@/components/reuseable/SelectInput";
import { TextInput } from "flowbite-react";
import { Search, X, Filter } from "lucide-react";

export const actionTypeOptions = [
  { value: "All", label: "All Actions" },
  { value: "Create", label: "Create" },
  { value: "Update", label: "Update" },
  { value: "Delete", label: "Delete" },
  { value: "Login", label: "Login" },
  { value: "Export", label: "Export" },
];

export default function ActivityFilters({
  searchTerm,
  onSearchTermChange,
  actionFilter,
  onActionFilterChange,
  onReset,
}) {
  const hasFilters = searchTerm !== "" || actionFilter !== "All";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      onSearchTermChange(value);
    } else if (name === "action") {
      onActionFilterChange(value);
    }
  };

  return (
    <div className="surface p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-border-gray pb-3">
        <div className="flex items-center gap-2 font-semibold text-primary-accent text-sm sm:text-base">
          <Filter size={16} className="text-primary-accent" />
          <span>Search & Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X size={12} />
            Reset Filters
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row items-end gap-3">
        <div className="w-full sm:w-2/3">
          <TextInput
            name="search"
            icon={Search}
            placeholder="Search activity by admin name, action, or target…"
            value={searchTerm}
            onChange={handleChange}
            className="[&>input]:border-border-gray [&>input]:rounded-xl [&>input]:bg-[#f7f9fd] w-full"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <SelectInput
            name="action"
            value={actionFilter}
            onChange={handleChange}
            options={actionTypeOptions}
            placeholder="Action Type"
            style="w-full h-[42px]! px-3 py-2 text-sm text-zinc-900 bg-zinc-50 border border-zinc-300 rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}
