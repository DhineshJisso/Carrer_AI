"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    BrainCircuit,
    ChevronRight,
    Sparkles,
    Target,
    User,
} from "lucide-react";

import CareerCard from "./components/CareerCard";
import CareerFilter from "./components/CareerFilter";
import api from "../interceptor/Axios";

export default function CareersPage() {
    const [careers, setCareers] = useState([]);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/career/recommendations"
                );

                console.log(
                    "CAREER RECOMMENDATIONS:",
                    response.data
                );

                const recommendations =
                    response.data?.data?.recommendations || [];

                const formattedCareers = recommendations.map(
                    (item) => ({
                        id: createSlug(item.career),

                        title: item.career || "Career",

                        category:
                            item.category ||
                            getCareerCategory(item.career || ""),

                        match: Number(item.matchPercentage) || 0,

                        level: getMatchLevel(
                            Number(item.matchPercentage) || 0
                        ),

                        skills: Array.isArray(item.requiredSkills)
                            ? item.requiredSkills
                            : [],

                        missingSkills: Array.isArray(item.missingSkills)
                            ? item.missingSkills
                            : [],

                        description:
                            item.description ||
                            item.reason ||
                            "This career matches your skills and interests.",
                    })
                );

                setCareers(formattedCareers);

            } catch (error) {
                console.error(
                    "CAREER FETCH ERROR:",
                    error.response?.data || error.message
                );

                if (error.response?.status === 404) {
                    setError(
                        "No career recommendations found. Please complete the assessment first."
                    );
                } else {
                    setError(
                        error.response?.data?.message ||
                        "Failed to load career recommendations."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();

        // Fetch User profile details from LocalStorage (Same as SkillGapPage)
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("User Parse Error:", error);
            }
        }
    }, []);

    const filteredCareers = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return careers.filter((career) => {
            const matchesSearch =
                !searchValue ||
                career.title.toLowerCase().includes(searchValue) ||
                career.category.toLowerCase().includes(searchValue) ||
                career.skills.some((skill) =>
                    String(skill)
                        .toLowerCase()
                        .includes(searchValue)
                );

            const matchesFilter =
                activeFilter === "All" ||
                career.category === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [careers, search, activeFilter]);

    const topCareer = careers[0];

    // Dynamic User details fallback logic
    const userName =
        user?.name ||
        user?.userName ||
        "Career Explorer";

    const userEmail =
        user?.email ||
        "";

    const userInitial =
        userName
            ?.charAt(0)
            ?.toUpperCase() ||
        "U";

    return (
        <main className="min-h-screen bg-[#080b14] text-white">

            {/* HEADER WITH DYNAMIC USER DETAILS */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">

                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <Link
                        href="/dashboardpage"
                        className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>

                    <Link href="/" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
                                <Sparkles className="h-4 w-4" />
                            </div>

                            <span className="font-bold">
                                Career
                                <span className="text-violet-400">
                                    AI
                                </span>
                            </span>
                        </div>
                    </Link>

                    {/* DYNAMIC AVATAR & PROFILE HOVER */}
                    <Link href="/profilepage" className="cursor-pointer">
                    <div className="group relative">

                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300 transition hover:scale-105">
                            {userInitial}
                        </div>

                        <div className="pointer-events-none absolute right-0 top-12 w-56 translate-y-2 rounded-2xl border border-white/10 bg-[#111827] p-4 opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                                    <User className="h-4 w-4 text-violet-400" />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-xs font-semibold">
                                        {userName}
                                    </p>

                                    <p className="truncate text-[10px] text-slate-500">
                                        {userEmail || "CareerAI User"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>
                    </Link>

                </div>

            </header>

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-500/[0.08] via-transparent to-cyan-400/[0.05] p-6 sm:p-8">

                    <div className="relative z-10 max-w-3xl">

                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs font-medium text-violet-300">
                            <BrainCircuit className="h-3.5 w-3.5" />
                            AI CAREER RECOMMENDATIONS
                        </div>

                        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                            Careers that match
                            <span className="gradient-text block mt-1"> your potential.</span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                            Based on your skills, interests, education, and career goals,
                            CareerAI has identified the career paths that best match your profile.
                        </p>

                        {topCareer && (
                            <div className="mt-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                                    <Target className="h-5 w-5 text-violet-400" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Top match: {topCareer.title}
                                    </p>

                                    <p className="text-xs text-slate-600">
                                        {topCareer.match}% compatibility with your profile
                                    </p>
                                </div>

                            </div>
                        )}

                    </div>
                </section>

                {!loading && !error && (
                    <CareerFilter
                        search={search}
                        setSearch={setSearch}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />
                )}

                {loading && (
                    <div className="py-20 text-center">
                        <BrainCircuit className="mx-auto h-10 w-10 animate-pulse text-violet-400" />

                        <p className="mt-4 text-sm text-slate-500">
                            Loading your AI career recommendations...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">

                        <p className="text-sm text-red-400">
                            {error}
                        </p>

                        <Link
                            href="/assessmentpage"
                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white"
                        >
                            Take Assessment
                            <ChevronRight className="h-4 w-4" />
                        </Link>

                    </div>
                )}

                {!loading && !error && (
                    <section className="mt-6">

                        <div className="mb-5 flex items-end justify-between">

                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                                    Recommended careers
                                </p>

                                <h2 className="mt-2 text-xl font-semibold">
                                    Your career matches
                                </h2>
                            </div>

                            <span className="text-xs text-slate-600">
                                {filteredCareers.length} paths found
                            </span>

                        </div>

                        {filteredCareers.length > 0 ? (
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                                {filteredCareers.map((career) => (
                                    <CareerCard
                                        key={career.id}
                                        career={career}
                                    />
                                ))}

                            </div>
                        ) : (
                            <div className="rounded-3xl border border-white/5 bg-white/[0.02] py-16 text-center">

                                <BrainCircuit className="mx-auto h-10 w-10 text-slate-600" />

                                <h3 className="mt-4 font-semibold">
                                    No careers found
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Try changing your search or filter.
                                </p>

                            </div>
                        )}

                    </section>
                )}

                {!loading && !error && (
                    <section className="mt-8 rounded-3xl border border-white/5 bg-white/[0.02] p-6 text-center sm:p-8">

                        <Sparkles className="mx-auto h-6 w-6 text-violet-400" />

                        <h2 className="mt-4 text-xl font-semibold">
                            Want a more personalized recommendation?
                        </h2>

                        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
                            Update your assessment profile to improve the accuracy of
                            your AI-powered career recommendations.
                        </p>

                        <Link
                            href="/assessmentpage"
                            className="button-glow mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                        >
                            Retake Assessment
                            <ChevronRight className="h-4 w-4" />
                        </Link>

                    </section>
                )}

            </div>
        </main>
    );
}

function createSlug(value = "") {
    return encodeURIComponent(
        String(value)
            .toLowerCase()
            .trim()
            .replace(/\s*\/\s*/g, "-")
            .replace(/\s+/g, "-")
    );
}

function getMatchLevel(match) {
    if (match >= 80) return "High Match";
    if (match >= 65) return "Good Match";
    if (match >= 50) return "Potential Match";

    return "Explore";
}

function getCareerCategory(career = "") {
    const careerName = String(career).toLowerCase();

    if (
        careerName.includes("data") ||
        careerName.includes("ai") ||
        careerName.includes("artificial intelligence") ||
        careerName.includes("machine learning")
    ) {
        return "Data & AI";
    }

    if (
        careerName.includes("security") ||
        careerName.includes("cyber")
    ) {
        return "Security";
    }

    if (
        careerName.includes("manager") ||
        careerName.includes("management")
    ) {
        return "Management";
    }

    return "Software Development";
}