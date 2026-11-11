"use client";

import SelectInput from "@/components/reuseable/SelectInput";
import { statusOptions } from "@/constant";
import { TextInput } from "flowbite-react";
import { Search, X, Filter } from "lucide-react";

export const adminRoleOptions = [
  { value: "All", label: "All Roles" },
  { value: "Super Admin", label: "Super Admin" },
  { value: "Operations", label: "Operations" },
  { value: "Support", label: "Support" },
];

export default function AdminFilters({
  searchTerm,
  onSearchTermChange,
  statusFilter,
  onStatusFilterChange,
  roleFilter,
  onRoleFilterChange,
  onReset,
}) {
  const hasFilters = searchTerm !== "" || statusFilter !== "All" || roleFilter !== "All";

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      onSearchTermChange(value);
    } else if (name === "status") {
      onStatusFilterChange(value);
    } else if (name === "role") {
      onRoleFilterChange(value);
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
        <div className="w-full sm:w-1/2">
          <TextInput
            name="search"
            icon={Search}
            placeholder="Search admins by name or email…"
            value={searchTerm}
            onChange={handleChange}
            className="[&>input]:border-border-gray [&>input]:rounded-xl [&>input]:bg-[#f7f9fd] w-full"
          />
        </div>

        <div className="w-full sm:w-1/4">
          <SelectInput
            name="role"
            value={roleFilter}
            onChange={handleChange}
            options={adminRoleOptions}
            placeholder="Role"
            style="w-full h-[42px]! px-3 py-2 text-sm text-zinc-900 bg-zinc-50 border border-zinc-300 rounded-lg "
          />
        </div>

        <div className="w-full sm:w-1/4">
          <SelectInput
            name="status"
            value={statusFilter}
            onChange={handleChange}
            options={statusOptions}
            placeholder="Status"
            style="w-full h-[42px]! px-3 py-2 text-sm text-zinc-900 bg-zinc-50 border border-zinc-300 rounded-lg "
          />
        </div>
      </div>
    </div>
  );
}
