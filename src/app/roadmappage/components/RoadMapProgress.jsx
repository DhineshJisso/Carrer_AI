"use client";

import {
    CheckCircle2,
    Circle,
    TrendingUp,
} from "lucide-react";


export default function RoadmapProgress({
    roadmap = [],
    stats = {},
}) {

    const totalSteps =
        stats.totalSteps ||
        roadmap.length;


    const completedSteps =
        stats.completedSteps ??
        roadmap.filter(
            (item) =>
                item.status === "Completed"
        ).length;


    const progress =
        stats.progress ??
        (
            totalSteps > 0
                ? Math.round(
                    (completedSteps / totalSteps) * 100
                )
                : 0
        );


    const currentStep =
        roadmap.find(
            (item) =>
                item.status === "In Progress"
        );


    const foundationCompleted =
        completedSteps >= 1;


    const coreSkillsCompleted =
        completedSteps >= Math.ceil(
            totalSteps / 2
        );


    const jobReady =
        progress === 100;


    return (

        <div className="glass rounded-3xl border border-white/5 p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 shadow-[0_0_25px_rgba(52,211,153,0.08)]">

                        <TrendingUp className="h-5 w-5 text-emerald-400" />

                    </div>


                    <div>

                        <p className="text-xs uppercase tracking-[0.16em] text-slate-600">

                            Overall Progress

                        </p>


                        <h2 className="mt-1 text-lg font-semibold">

                            {progress === 100
                                ? "Amazing! You are job ready."
                                : currentStep
                                    ? `Currently working on ${currentStep.title}.`
                                    : "Your learning journey is ready."
                            }

                        </h2>

                    </div>

                </div>


                <div className="text-left sm:text-right">

                    <p className="text-3xl font-bold text-emerald-400">

                        {progress}%

                    </p>


                    <p className="text-[10px] text-slate-600">

                        {completedSteps} of {totalSteps} stages completed

                    </p>

                </div>

            </div>


            {/* PROGRESS BAR */}

            <div className="mt-7 h-3 overflow-hidden rounded-full bg-white/[0.04]">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400 transition-all duration-700"
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>


            {/* MILESTONES */}

            <div className="mt-7 grid grid-cols-3 gap-3">

                <Milestone
                    title="Foundation"
                    completed={foundationCompleted}
                    active={
                        !foundationCompleted &&
                        totalSteps > 0
                    }
                />


                <Milestone
                    title="Core Skills"
                    completed={coreSkillsCompleted}
                    active={
                        foundationCompleted &&
                        !coreSkillsCompleted
                    }
                />


                <Milestone
                    title="Job Ready"
                    completed={jobReady}
                    active={
                        coreSkillsCompleted &&
                        !jobReady
                    }
                />

            </div>

        </div>

    );

}


function Milestone({
    title,
    completed,
    active,
}) {

    return (

        <div
            className={`rounded-xl border p-3 text-center transition ${
                completed
                    ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                    : active
                        ? "border-violet-400/25 bg-violet-400/[0.05]"
                        : "border-white/5 bg-white/[0.02]"
            }`}
        >

            <div className="flex justify-center">

                {completed ? (

                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                ) : (

                    <Circle
                        className={`h-4 w-4 ${
                            active
                                ? "text-violet-400"
                                : "text-slate-700"
                        }`}
                    />

                )}

            </div>


            <p
                className={`mt-2 text-[10px] ${
                    completed
                        ? "text-emerald-300"
                        : active
                            ? "text-violet-300"
                            : "text-slate-600"
                }`}
            >

                {title}

            </p>

        </div>

    );

}