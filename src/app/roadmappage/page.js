"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    BrainCircuit,
    CheckCircle2,
    Clock3,
    Loader2,
    Rocket,
    Sparkles,
    Target,
    User,
} from "lucide-react";

import api from "../interceptor/Axios";

import RoadmapProgress from "./components/RoadMapProgress";
import RoadmapTimeline from "./components/RoadMapTimeline";

export default function RoadmapPage() {
    const [roadmapData, setRoadmapData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [needAssessment, setNeedAssessment] = useState(false);
    const [user, setUser] = useState(null);

    // ==========================================
    // MAIN LOAD FUNCTION
    // ==========================================

    const loadRoadmapPage = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            setNeedAssessment(false);

            // ======================================
            // STEP 1: CHECK EXISTING ROADMAP
            // ======================================

            try {
                const roadmapResponse = await api.get("/roadmap");

                console.log("EXISTING ROADMAP:", roadmapResponse.data);

                // Existing roadmap found
                if (
                    roadmapResponse.data?.success &&
                    roadmapResponse.data?.data
                ) {
                    setRoadmapData(roadmapResponse.data.data);
                    return;
                }

                // If API returned success but no data
                throw new Error(
                    roadmapResponse.data?.message ||
                    "Invalid roadmap response"
                );
            } catch (roadmapError) {
                const status = roadmapError.response?.status;
                const responseData = roadmapError.response?.data;

                console.log("ROADMAP CHECK STATUS:", status);
                console.log("ROADMAP CHECK RESPONSE:", responseData);

                // ==================================
                // 409 = CAREER CHANGED
                // ==================================
                if (status === 409) {
                    console.log("Career changed. Preparing new roadmap...");
                }
                // ==================================
                // 404 = ROADMAP DOES NOT EXIST
                // ==================================
                else if (status === 404) {
                    console.log("No roadmap found. Generating new roadmap...");
                } else {
                    throw roadmapError;
                }
            }

            // ======================================
            // STEP 2: GET CURRENT CAREER
            // ======================================

            const dashboardResponse = await api.get("/dashboard");

            console.log("DASHBOARD RESPONSE:", dashboardResponse.data);

            const dashboardData =
                dashboardResponse.data?.data ||
                dashboardResponse.data;

            const careerName =
                dashboardData?.career?.name ||
                dashboardData?.careerName ||
                dashboardData?.currentGoal ||
                dashboardData?.careerGoal ||
                dashboardData?.user?.currentGoal ||
                dashboardData?.user?.careerGoal;

            console.log("CURRENT CAREER:", careerName);

            // ======================================
            // NO CAREER = ASSESSMENT REQUIRED
            // ======================================

            if (!careerName) {
                setNeedAssessment(true);
                return;
            }

            // ======================================
            // STEP 3: GENERATE NEW ROADMAP
            // ======================================

            console.log("GENERATING ROADMAP FOR:", careerName);

            const generateResponse = await api.post("/roadmap", {
                career: careerName,
            });

            console.log("GENERATED ROADMAP:", generateResponse.data);

            if (
                generateResponse.data?.success &&
                generateResponse.data?.data
            ) {
                setRoadmapData(generateResponse.data.data);
            } else {
                throw new Error(
                    generateResponse.data?.message ||
                    "Roadmap generation failed"
                );
            }
        } catch (error) {
            console.error(
                "ROADMAP PAGE ERROR:",
                error.response?.data || error.message
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to load roadmap"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // ==========================================
    // LOAD ROADMAP + USER
    // ==========================================

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("User parse error:", err);
            }
        }

        loadRoadmapPage();
    }, [loadRoadmapPage]);

    // ==========================================
    // UPDATE ROADMAP STEP
    // ==========================================

    const updateStepStatus = async (step, status) => {
        try {
            if (!roadmapData?._id) {
                console.error("Roadmap ID not found");
                return;
            }

            const response = await api.patch(
                `/roadmap/${roadmapData._id}/step/${step}`,
                {
                    status,
                }
            );

            console.log("UPDATED ROADMAP:", response.data);

            if (!response.data?.success) {
                throw new Error(
                    response.data?.message || "Failed to update roadmap"
                );
            }

            if (response.data?.data) {
                setRoadmapData(response.data.data);
            }
        } catch (error) {
            console.error(
                "UPDATE ROADMAP ERROR:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to update roadmap"
            );
        }
    };

    // ==========================================
    // DYNAMIC USER VALUES
    // ==========================================

    const userName =
        user?.name ||
        user?.userName ||
        "Career Explorer";

    const userEmail = user?.email || "";
    const userInitial = userName?.charAt(0)?.toUpperCase() || "U";

    // ==========================================
    // LOADING STATE
    // ==========================================

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
                        <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold">
                        Preparing your roadmap
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Building your personalized learning journey...
                    </p>
                </div>
            </main>
        );
    }

    // ==========================================
    // ASSESSMENT REQUIRED STATE
    // ==========================================

    if (needAssessment) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">
                <div className="w-full max-w-md rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] p-8 text-center">
                    <BrainCircuit className="mx-auto h-12 w-12 text-violet-400" />
                    <h2 className="mt-5 text-xl font-bold">
                        Assessment Required
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        Complete your career assessment first so we can create
                        a personalized roadmap based on your recommended career.
                    </p>
                    <Link
                        href="/assessmentpage"
                        className="mt-6 inline-block w-full rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
                    >
                        Start Assessment Now
                    </Link>
                </div>
            </main>
        );
    }

    // ==========================================
    // ERROR STATE
    // ==========================================

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">
                <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-red-500/[0.04] p-8 text-center">
                    <AlertCircle className="mx-auto h-10 w-10 text-red-400" />
                    <h2 className="mt-5 text-xl font-bold">
                        Unable to load roadmap
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        {error}
                    </p>
                    <button
                        onClick={loadRoadmapPage}
                        className="mt-6 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
                    >
                        Try Again
                    </button>
                </div>
            </main>
        );
    }

    // ==========================================
    // ROADMAP DATA CALCULATIONS
    // ==========================================

    const roadmap = roadmapData?.roadmap || [];
    const stats = roadmapData?.stats || {};

    const totalProjects = roadmap.reduce(
        (total, item) =>
            total + (item.projects?.length || 0),
        0
    );

    const totalDuration = roadmap.reduce(
        (total, item) => {
            const weeks = Number(
                item.duration?.match(/\d+/)?.[0] || 0
            );
            return total + weeks;
        },
        0
    );

    // ==========================================
    // MAIN PAGE RENDER
    // ==========================================

    return (
        <main className="min-h-screen bg-[#080b14] text-white">
            {/* HEADER */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link
                        href="/skillgappage"
                        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Skill Gap</span>
                    </Link>

                    <Link href="/" className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <span className="font-bold">
                                Career <span className="text-violet-400">AI</span>
                            </span>
                        </div>
                    </Link>

                    <div className="group relative">
                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300 transition hover:scale-105">
                            {userInitial}
                        </div>

                        <div className="pointer-events-none absolute right-0 top-12 z-50 w-56 translate-y-2 rounded-2xl border border-white/10 bg-[#111827] p-4 opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
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
                </div>
            </header>

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
                {/* HERO */}
                <section className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-violet-500/[0.12] via-[#0b0f19] to-cyan-400/[0.06] p-7 sm:p-10">
                    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div className="relative z-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-violet-300">
                            <BrainCircuit className="h-3.5 w-3.5" />
                            AI PERSONALIZED ROADMAP
                        </div>

                        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
                            Your path to becoming a{" "}
                            <span className="block bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                                {roadmapData?.career || "Your Dream Career"}
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
                            Your roadmap is automatically generated based on your
                            current career goal and helps you track every stage of your
                            learning journey.
                        </p>
                    </div>
                </section>

                {/* STATS */}
                <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <RoadmapStat
                        icon={<Target className="h-5 w-5 text-violet-400" />}
                        label="Target Career"
                        value={roadmapData?.career || "—"}
                    />
                    <RoadmapStat
                        icon={<Clock3 className="h-5 w-5 text-cyan-400" />}
                        label="Estimated Duration"
                        value={`${totalDuration} Weeks`}
                    />
                    <RoadmapStat
                        icon={<Rocket className="h-5 w-5 text-amber-400" />}
                        label="Projects"
                        value={`${totalProjects} Projects`}
                    />
                    <RoadmapStat
                        icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                        label="Current Progress"
                        value={`${stats.progress ?? 0}%`}
                    />
                </section>

                {/* PROGRESS */}
                <section className="mt-6">
                    <RoadmapProgress stats={stats} roadmap={roadmap} />
                </section>

                {/* TIMELINE */}
                <section className="mt-10">
                    <div className="mb-7">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                            Learning Journey
                        </p>
                        <h2 className="mt-2 text-2xl font-semibold">
                            Your personalized roadmap
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Complete each stage and track your progress toward your
                            target career.
                        </p>
                    </div>

                    <RoadmapTimeline
                        roadmap={roadmap}
                        onUpdateStatus={updateStepStatus}
                    />
                </section>

                {/* CTA */}
                <section className="mt-10 flex flex-col gap-5 rounded-[2rem] border border-white/5 bg-gradient-to-r from-violet-500/[0.1] to-cyan-400/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10">
                            <Rocket className="h-5 w-5 text-violet-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">
                                Keep building your future.
                            </h2>
                            <p className="mt-1 max-w-xl text-xs leading-6 text-slate-500">
                                Every completed stage brings you closer to your target
                                career.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/progresspage"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-400"
                    >
                        Track Progress
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </section>
            </div>
        </main>
    );
}

function RoadmapStat({ icon, label, value }) {
    return (
        <div className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.03]">
                {icon}
            </div>
            <p className="mt-4 text-xs text-slate-600">{label}</p>
            <p className="mt-1 truncate text-lg font-bold">{value}</p>
        </div>
    );
}