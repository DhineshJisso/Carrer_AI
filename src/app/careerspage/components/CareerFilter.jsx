"use client";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

const filters = [
    "All",
    "Software Development",
    "Data & AI",
    "Security",
    "Management",
];

export default function CareerFilter({
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
}) {
    return (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search careers..."
                    className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.02] pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-400/40"
                />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
                <SlidersHorizontal className="mr-1 h-4 w-4 shrink-0 text-slate-600" />

                {filters.map((filter) => (
                    <button
                        type="button"
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`whitespace-nowrap rounded-lg px-3 py-2 text-[11px] font-medium transition ${activeFilter === filter
                                ? "bg-violet-500 text-white"
                                : "bg-white/[0.03] text-slate-500 hover:text-white"
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

        </div>
    );
}