"use client";

import {
    CheckCircle2,
    Clock3,
    Flame,
    Trophy,
} from "lucide-react";

export default function ProgressOverview({
    career,
    progress = [],
}) {
    // FIX: Ensure safeProgress is ALWAYS an array even if progress is null, an object, or undefined
    const safeProgress = Array.isArray(progress)
        ? progress
        : progress?.progress || progress?.data || [];

    const totalCourses = safeProgress.length;

    const completedCourses =
        safeProgress.filter(
            (item) =>
                item.overallProgress >= 60
        ).length;

    const overallProgress =
        totalCourses > 0
            ? Math.round(
                safeProgress.reduce(
                    (sum, item) =>
                        sum +
                        (item.overallProgress || 0),
                    0
                ) / totalCourses
            )
            : 0;

    const learningHours =
        safeProgress.reduce(
            (sum, item) =>
                sum +
                (item.learningHours || 0),
            0
        );

    const skills = [
        ...new Set(
            safeProgress.flatMap(
                (item) =>
                    item.skills?.map(
                        (skill) =>
                            skill.name
                    ) || []
            )
        ),
    ];

    return (
        <div className="glass rounded-3xl p-6 sm:p-8">

            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">

                <div>

                    <p className="text-xs uppercase tracking-[0.16em] text-slate-600">
                        Overall Career Readiness
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">
                        {overallProgress}%
                    </h2>

                    {career && (
                        <p className="mt-2 text-sm text-violet-300">
                            {career}
                        </p>
                    )}

                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/[0.04]">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                            style={{
                                width: `${overallProgress}%`,
                            }}
                        />

                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-600">
                        Your progress is calculated from your completed course assessments.
                    </p>

                </div>

                <div className="grid grid-cols-2 gap-3">

                    <MiniStat
                        label="Courses"
                        value={totalCourses}
                    />

                    <MiniStat
                        label="Completed"
                        value={completedCourses}
                    />

                    <MiniStat
                        label="Learning"
                        value={`${learningHours} hrs`}
                    />

                    <MiniStat
                        label="Skills"
                        value={skills.length}
                    />

                </div>

            </div>

        </div>
    );
}

function MiniStat({
    label,
    value,
}) {
    return (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">

            <p className="text-[10px] text-slate-600">
                {label}
            </p>

            <p className="mt-2 text-lg font-semibold text-slate-300">
                {value}
            </p>

        </div>
    );
}