"use client";

import {
    ArrowRight,
    Clock3,
    ExternalLink,
    Star,
    BookOpen,
} from "lucide-react";

export default function CourseCard({
    course,
    career = "",
}) {
    if (!course) {
        return null;
    }

    const gradient =
        course.gradient ||
        "bg-gradient-to-br from-violet-500/20 via-cyan-500/10 to-transparent";

    const skill =
        course.skill ||
        course.skills?.[0] ||
        course.category ||
        "Professional Skills";

    const platform =
        course.platform ||
        "Learning Platform";

    const description =
        course.description ||
        `Learn ${skill} through this ${course.level || "Beginner"} level course.`;

    const handleStartCourse = () => {
        const params = new URLSearchParams();

        params.set(
            "career",
            career || "Your Career"
        );

        params.set(
            "course",
            course.title || "Course"
        );

        params.set(
            "skill",
            skill
        );

        params.set(
            "platform",
            platform
        );

        window.location.href =
            `/course-assessment?${params.toString()}`;
    };

    return (
        <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-violet-400/15 hover:bg-white/[0.035]">

            {/* TOP */}
            <div
                className={`relative h-32 ${gradient}`}
            >
                <div className="absolute inset-0 bg-[#080b14]/30" />

                {/* ICON */}
                <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#080b14]/70 text-violet-300 backdrop-blur-xl">
                    <BookOpen className="h-6 w-6" />
                </div>

                {/* AI */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-violet-300/20 bg-violet-500/20 px-3 py-1.5 text-[9px] font-semibold text-violet-200">
                    <Star className="h-3 w-3 fill-current" />
                    AI Recommended
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">

                {/* LEVEL + PLATFORM */}
                <div className="flex items-center gap-2">

                    <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[9px] font-medium text-slate-400">
                        {course.level || "Beginner"}
                    </span>

                    <span className="text-[9px] text-slate-600">
                        {platform}
                    </span>

                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-base font-semibold transition group-hover:text-violet-300">
                    {course.title || "Recommended Course"}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-slate-500">
                    {description}
                </p>

                {/* SKILLS */}
                <div className="mt-4 flex flex-wrap gap-1.5">

                    {Array.isArray(course.skills) &&
                        course.skills.length > 0 ? (
                        course.skills
                            .slice(0, 4)
                            .map((item) => (
                                <span
                                    key={item}
                                    className="rounded-lg border border-violet-400/10 bg-violet-500/5 px-2 py-1 text-[9px] text-violet-300"
                                >
                                    {item}
                                </span>
                            ))
                    ) : (
                        <span className="rounded-lg border border-violet-400/10 bg-violet-500/5 px-2 py-1 text-[9px] text-violet-300">
                            {skill}
                        </span>
                    )}

                </div>

                {/* INFO */}
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

                    <div className="flex items-center gap-1 text-[10px] text-slate-600">

                        <Clock3 className="h-3 w-3" />

                        {course.duration || "Flexible"}

                    </div>

                    {course.rating && (
                        <div className="flex items-center gap-1">

                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />

                            <span className="text-[10px] font-semibold text-slate-400">
                                {course.rating}
                            </span>

                        </div>
                    )}

                </div>

                {/* START COURSE */}
                <button
                    type="button"
                    onClick={handleStartCourse}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 py-3 text-xs font-semibold text-white transition hover:bg-violet-400"
                >
                    <ExternalLink className="h-3.5 w-3.5" />

                    Start Course

                    <ArrowRight className="h-3.5 w-3.5" />
                </button>

            </div>
        </div>
    );
}