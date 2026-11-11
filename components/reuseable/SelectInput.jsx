"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  className,
  style,
  disabled,
}) => {
  const handleValueChange = (newValue) => {
    if (onChange) {
      onChange({ target: { name, value: newValue } });
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block font-semibold text-sm text-accent">
          {label}
        </label>
      )}

      <Select
        value={value != null ? String(value) : ""}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "h-11 gap-2 rounded-xl border border-border-gray bg-[#f7f9fd] px-3.5 text-sm font-medium text-primary-accent shadow-none",
            "focus:ring-0 focus:ring-offset-0 focus-visible:ring-4 focus-visible:ring-brand-blue/10",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-colors hover:bg-white",
            style,
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className="z-9999 min-w-32 rounded-xl p-1 border border-border-gray bg-white shadow-lg"
          position="popper"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={String(option.value)}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm text-primary-accent focus:bg-brand-blue/10 focus:text-primary-accent"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
