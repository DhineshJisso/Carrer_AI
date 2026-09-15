import { Briefcase, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function JobCard({ job }) {
    return (
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-white transition hover:border-violet-500/30 hover:bg-white/[0.04]">
            <div>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                            {job.company}
                        </span>
                        <h3 className="mt-1 text-lg font-bold">{job.title}</h3>
                    </div>

                    <div className="shrink-0 rounded-full border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300">
                        {job.matchPercentage}% Match
                    </div>
                </div>

                {/* Location & Experience */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.experienceLevel}
                    </span>
                </div>

                {/* Skills Section */}
                <div className="mt-4 space-y-3 border-t border-white/5 pt-4 text-xs">
                    {/* Matched Skills */}
                    {job.acquiredSkills?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="mr-1 text-slate-500">Matched:</span>
                            {job.acquiredSkills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400"
                                >
                                    <CheckCircle2 className="h-3 w-3" />
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Missing Skills */}
                    {job.missingSkills?.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="mr-1 text-slate-500">Missing:</span>
                            {job.missingSkills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-[10px] text-amber-400"
                                >
                                    <AlertCircle className="h-3 w-3" />
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Apply Button */}
            {job.applyUrl && (
                <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center rounded-xl bg-violet-500 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-400"
                >
                    Apply Opportunity
                </a>
            )}
        </div>
    );
}