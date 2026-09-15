"use client";

import { useState } from "react";

import {
    BookOpen,
    Check,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Code2,
    Loader2,
    Play,
    Rocket,
} from "lucide-react";


export default function RoadmapTimeline({
    roadmap = [],
    onUpdateStatus,
}) {

    const [openStep, setOpenStep] =
        useState(null);

    const [updatingStep, setUpdatingStep] =
        useState(null);


    const toggleStep = (step) => {

        setOpenStep((current) =>
            current === step
                ? null
                : step
        );

    };


    // No locked roadmap
    // Every step can be viewed
    const getDisplayStatus = (item) => {

        if (item.status === "Completed") {
            return "completed";
        }

        if (item.status === "In Progress") {
            return "active";
        }

        return "pending";
    };


    const handleComplete = async (item) => {

        if (!onUpdateStatus) return;

        try {

            setUpdatingStep(item.step);

            await onUpdateStatus(
                item.step,
                "Completed"
            );

        } finally {

            setUpdatingStep(null);

        }

    };


    const handleStart = async (item) => {

        if (!onUpdateStatus) return;

        try {

            setUpdatingStep(item.step);

            await onUpdateStatus(
                item.step,
                "In Progress"
            );

        } finally {

            setUpdatingStep(null);

        }

    };


    if (!roadmap.length) {
        return (

            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-10 text-center">

                <p className="text-sm text-slate-500">
                    Your roadmap will appear here.
                </p>

            </div>

        );
    }


    return (

        <div className="relative">

            <div className="absolute left-[23px] top-8 hidden h-[calc(100%-40px)] w-px bg-gradient-to-b from-emerald-400/50 via-violet-400/30 to-cyan-400/20 sm:block" />


            <div className="space-y-5">

                {roadmap.map((item) => {

                    const displayStatus =
                        getDisplayStatus(item);

                    const isOpen =
                        openStep === item.step;

                    const isUpdating =
                        updatingStep === item.step;


                    return (

                        <div
                            key={item._id || item.step}
                            className="relative flex gap-4 sm:gap-6"
                        >

                            {/* TIMELINE ICON */}

                            <div className="relative z-10 shrink-0">

                                {displayStatus ===
                                    "completed" ? (

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">

                                        <Check className="h-5 w-5 text-emerald-400" />

                                    </div>

                                ) : displayStatus ===
                                    "active" ? (

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 shadow-[0_0_25px_rgba(139,92,246,0.12)]">

                                        <Play className="ml-0.5 h-5 w-5 text-violet-400" />

                                    </div>

                                ) : (

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04]">

                                        <Clock3 className="h-4 w-4 text-cyan-400" />

                                    </div>

                                )}

                            </div>


                            {/* CARD */}

                            <div
                                className={`min-w-0 flex-1 rounded-3xl border p-5 transition sm:p-6 ${
                                    displayStatus === "completed"
                                        ? "border-emerald-400/15 bg-emerald-400/[0.025]"
                                        : displayStatus === "active"
                                            ? "border-violet-400/25 bg-violet-400/[0.05]"
                                            : "border-white/5 bg-white/[0.02]"
                                }`}
                            >

                                {/* HEADER */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleStep(item.step)
                                    }
                                    className="flex w-full items-start justify-between gap-4 text-left"
                                >

                                    <div className="min-w-0">

                                        <div className="flex flex-wrap items-center gap-2">

                                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">

                                                Step {item.step}

                                            </span>


                                            {displayStatus ===
                                                "completed" && (

                                                <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold text-emerald-400">

                                                    Completed

                                                </span>

                                            )}


                                            {displayStatus ===
                                                "active" && (

                                                <span className="rounded-full bg-violet-400/10 px-2 py-1 text-[9px] font-semibold text-violet-300">

                                                    In Progress

                                                </span>

                                            )}


                                            {displayStatus ===
                                                "pending" && (

                                                <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[9px] font-semibold text-cyan-300">

                                                    Ready to Start

                                                </span>

                                            )}

                                        </div>


                                        <h3 className="mt-2 text-base font-semibold sm:text-lg">

                                            {item.title}

                                        </h3>


                                        <p className="mt-2 text-xs leading-6 text-slate-500">

                                            {item.description}

                                        </p>

                                    </div>


                                    <div className="flex shrink-0 items-center gap-2">

                                        <div className="hidden items-center gap-2 sm:flex">

                                            <Clock3 className="h-3.5 w-3.5 text-slate-700" />

                                            <span className="text-[10px] text-slate-600">

                                                {item.duration}

                                            </span>

                                        </div>

                                        <ChevronDown
                                            className={`h-4 w-4 text-slate-500 transition ${
                                                isOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />

                                    </div>

                                </button>


                                {/* EXPANDED CONTENT */}

                                {isOpen && (

                                    <div className="mt-6 border-t border-white/5 pt-5">

                                        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">


                                            {/* SKILLS */}

                                            <div>

                                                <div className="flex items-center gap-2">

                                                    <BookOpen className="h-4 w-4 text-cyan-400" />

                                                    <h4 className="text-xs font-semibold">

                                                        Learning Skills

                                                    </h4>

                                                </div>


                                                <div className="mt-4 space-y-2">

                                                    {item.skills?.map(
                                                        (skill) => (

                                                            <div
                                                                key={skill}
                                                                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
                                                            >

                                                                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />

                                                                <span className="text-xs text-slate-400">

                                                                    {skill}

                                                                </span>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>


                                            {/* PROJECTS */}

                                            <div>

                                                <div className="flex items-center gap-2">

                                                    <Rocket className="h-4 w-4 text-violet-400" />

                                                    <h4 className="text-xs font-semibold">

                                                        Practical Projects

                                                    </h4>

                                                </div>


                                                <div className="mt-4 space-y-3">

                                                    {item.projects?.map(
                                                        (project) => (

                                                            <div
                                                                key={project}
                                                                className="rounded-2xl border border-violet-400/10 bg-violet-400/[0.04] p-5"
                                                            >

                                                                <Code2 className="h-5 w-5 text-violet-400" />

                                                                <p className="mt-3 text-sm font-semibold">

                                                                    {project}

                                                                </p>

                                                                <p className="mt-2 text-[10px] leading-5 text-slate-600">

                                                                    Apply your learning by building this practical project.

                                                                </p>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        </div>


                                        {/* ACTION BUTTON */}

                                        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-5">


                                            {/* PENDING STEP */}

                                            {displayStatus ===
                                                "pending" && (

                                                <button
                                                    type="button"
                                                    disabled={isUpdating}
                                                    onClick={() =>
                                                        handleStart(item)
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                                                >

                                                    {isUpdating ? (

                                                        <Loader2 className="h-4 w-4 animate-spin" />

                                                    ) : (

                                                        <Play className="h-4 w-4" />

                                                    )}

                                                    Start This Step

                                                </button>

                                            )}


                                            {/* ACTIVE STEP */}

                                            {displayStatus ===
                                                "active" && (

                                                <button
                                                    type="button"
                                                    disabled={isUpdating}
                                                    onClick={() =>
                                                        handleComplete(item)
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black transition hover:-translate-y-0.5 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                                                >

                                                    {isUpdating ? (

                                                        <Loader2 className="h-4 w-4 animate-spin" />

                                                    ) : (

                                                        <CheckCircle2 className="h-4 w-4" />

                                                    )}

                                                    Mark as Completed

                                                </button>

                                            )}


                                            {/* COMPLETED STEP */}

                                            {displayStatus ===
                                                "completed" && (

                                                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-2.5 text-xs font-semibold text-emerald-300">

                                                    <CheckCircle2 className="h-4 w-4" />

                                                    Stage Completed

                                                </div>

                                            )}

                                        </div>

                                    </div>

                                )}


                                {/* MOBILE DURATION */}

                                <div className="mt-4 flex items-center gap-2 sm:hidden">

                                    <Clock3 className="h-3.5 w-3.5 text-slate-700" />

                                    <span className="text-[10px] text-slate-600">

                                        {item.duration}

                                    </span>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}