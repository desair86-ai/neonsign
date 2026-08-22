
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const sortOptions = [
  { value: "default", label: "Default sorting" },
  { value: "popularity", label: "Sort by popularity" },
  { value: "rating", label: "Sort by average rating" },
  { value: "date", label: "Sort by latest" },
  { value: "price-asc", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentSort = searchParams.get("sort") || "default";
  const currentOption = sortOptions.find((o) => o.value === currentSort) || sortOptions[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (value: string) => {
    setIsOpen(false);
    
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const newQuery = params.toString();
    const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;
    
    // Push the new URL, Next.js App Router will re-fetch Server Components automatically
    router.push(newUrl);
  };

  return (
    <div className="relative w-[260px] z-20" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white text-black px-4 py-3 flex items-center justify-between border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent font-medium"
      >
        <span className="truncate">{currentOption.label}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg overflow-hidden flex flex-col">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`text-left px-4 py-2.5 text-[15px] transition-colors ${
                currentSort === option.value
                  ? "bg-[#4f46e5] text-white font-medium"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

