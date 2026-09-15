import {
    CheckCircle2,
    Code2,
} from "lucide-react";

export default function ProfileSkills({
    skills = [],
}) {
    return (
        <section className="glass rounded-3xl p-6 sm:p-7">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                    <Code2 className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                    <h2 className="text-base font-semibold">
                        Technical Skills
                    </h2>

                    <p className="mt-1 text-[10px] text-slate-600">
                        Skills detected from your assessment
                    </p>
                </div>

            </div>

            {skills.length > 0 ? (

                <div className="mt-6 space-y-5">

                    {skills.map((skill, index) => {

                        const skillName =
                            typeof skill === "object"
                                ? skill.name
                                : skill;

                        const level =
                            typeof skill === "object"
                                ? Number(
                                    skill.level ??
                                    skill.percentage ??
                                    0
                                )
                                : 0;

                        const safeLevel = Math.min(
                            Math.max(level, 0),
                            100
                        );

                        return (
                            <div
                                key={
                                    skillName ||
                                    `skill-${index}`
                                }
                            >

                                <div className="mb-2 flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <span className="text-slate-600">
                                            <Code2 className="h-4 w-4" />
                                        </span>

                                        <span className="text-xs font-medium text-slate-300">
                                            {skillName || "Unknown Skill"}
                                        </span>

                                        {safeLevel >= 70 && (
                                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                        )}

                                    </div>

                                    <span className="text-[10px] text-slate-500">
                                        {safeLevel}%
                                    </span>

                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/[0.04]">

                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                                        style={{
                                            width: `${safeLevel}%`,
                                        }}
                                    />

                                </div>

                            </div>
                        );
                    })}

                </div>

            ) : (

                <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-6 text-center">

                    <Code2 className="mx-auto h-6 w-6 text-slate-600" />

                    <p className="mt-3 text-xs text-slate-500">
                        No skills found yet
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                        Complete your assessment to see your skills here.
                    </p>

                </div>

            )}

        </section>
    );
}