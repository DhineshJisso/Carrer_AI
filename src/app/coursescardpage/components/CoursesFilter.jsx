"use client";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

export default function CourseFilters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
}) {
    return (
        <div className="glass rounded-2xl p-4">

            <div className="flex flex-col gap-3 lg:flex-row">

                {/* SEARCH */}
                <div className="relative flex-1">

                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder="Search courses, skills or platforms..."
                        className="h-11 w-full rounded-xl border border-white/5 bg-white/[0.02] pl-11 pr-4 text-xs text-white outline-none placeholder:text-slate-700 focus:border-violet-400/20"
                    />

                </div>

                {/* PLATFORM */}
                <select
                    value={selectedCategory}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value)
                    }
                    className="h-11 rounded-xl border border-white/5 bg-[#0d111c] px-4 text-xs text-slate-400 outline-none"
                >
                    <option value="All Categories">
                        All Platforms
                    </option>

                    <option value="Udemy">
                        Udemy
                    </option>

                    <option value="Coursera">
                        Coursera
                    </option>

                    <option value="MongoDB University">
                        MongoDB University
                    </option>

                    <option value="freeCodeCamp">
                        freeCodeCamp
                    </option>
                </select>

                {/* LEVEL */}
                <select
                    value={selectedLevel}
                    onChange={(e) =>
                        setSelectedLevel(e.target.value)
                    }
                    className="h-11 rounded-xl border border-white/5 bg-[#0d111c] px-4 text-xs text-slate-400 outline-none"
                >
                    <option value="All Levels">
                        All Levels
                    </option>

                    <option value="Beginner">
                        Beginner
                    </option>

                    <option value="Intermediate">
                        Intermediate
                    </option>

                    <option value="Advanced">
                        Advanced
                    </option>
                </select>

                {/* RESET */}
                <button
                    type="button"
                    onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory(
                            "All Categories"
                        );
                        setSelectedLevel(
                            "All Levels"
                        );
                    }}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Reset
                </button>

            </div>
        </div>
    );
}