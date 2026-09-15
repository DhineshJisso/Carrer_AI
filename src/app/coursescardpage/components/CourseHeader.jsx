import {
    BrainCircuit,
    Sparkles,
} from "lucide-react";

export default function CourseHeader({
    career = "Your Career",
    courseCount = 0,
}) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-500/[0.09] via-transparent to-cyan-400/[0.05] p-6 sm:p-8 lg:p-10">

            <div className="relative z-10 max-w-3xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs font-medium text-violet-300">

                    <BrainCircuit className="h-3.5 w-3.5" />

                    AI CURATED COURSES

                </div>

                <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">

                    Learn the skills you

                    <span className="gradient-text">
                        {" "}actually need.
                    </span>

                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">

                    Based on your assessment and skill-gap
                    analysis, we selected courses that will
                    help you move closer to your career goal.

                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">

                        <Sparkles className="h-4 w-4 text-violet-400" />

                        <div>

                            <p className="text-[9px] text-slate-600">
                                Career Goal
                            </p>

                            <p className="text-xs font-semibold text-slate-300">
                                {career}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">

                        <span className="text-sm font-bold text-cyan-400">
                            {courseCount}
                        </span>

                        <div>

                            <p className="text-[9px] text-slate-600">
                                Courses
                            </p>

                            <p className="text-xs font-semibold text-slate-300">
                                Recommended
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}