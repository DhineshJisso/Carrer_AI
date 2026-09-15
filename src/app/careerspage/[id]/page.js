"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BrainCircuit,
    CheckCircle2,
    Code2,
    GraduationCap,
    Target,
} from "lucide-react";

import api from "../../interceptor/Axios";

const createSlug = (value = "") =>
    encodeURIComponent(
        String(value)
            .toLowerCase()
            .trim()
            .replace(/\s*\/\s*/g, "-")
            .replace(/\s+/g, "-")
    );

export default function CareerDetailsPage({ params }) {
    const [career, setCareer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const id = decodeURIComponent(params.id);

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/career/recommendations"
                );

                const recommendations =
                    response.data?.data?.recommendations || [];

                const foundCareer = recommendations.find(
                    (item) => createSlug(item.career) === id
                );

                if (!foundCareer) {
                    setError("Career recommendation not found.");
                    return;
                }

                setCareer(foundCareer);

            } catch (error) {
                console.error(
                    "CAREER DETAILS ERROR:",
                    error.response?.data || error.message
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load career details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCareer();
    }, [id]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">
                <div className="text-center">
                    <BrainCircuit className="mx-auto h-10 w-10 animate-pulse text-violet-400" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading career details...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !career) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">
                <div className="text-center">

                    <h1 className="text-xl font-bold">
                        {error || "Career not found"}
                    </h1>

                    <Link
                        href="/careerspage"
                        className="mt-5 inline-flex rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold"
                    >
                        Back to Careers
                    </Link>

                </div>
            </main>
        );
    }

    const requiredSkills = Array.isArray(career.requiredSkills)
        ? career.requiredSkills
        : [];

    const missingSkills = Array.isArray(career.missingSkills)
        ? career.missingSkills
        : [];

    return (
        <main className="min-h-screen bg-[#080b14] text-white">

            <header className="border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center px-5 sm:px-8">

                    <Link
                        href="/careerspage"
                        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Careers
                    </Link>

                </div>
            </header>

            <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">

                <section className="glass gradient-border rounded-3xl p-6 sm:p-8 lg:p-10">

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold text-violet-300">
                                <BrainCircuit className="h-3.5 w-3.5" />
                                AI RECOMMENDATION
                            </div>

                            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-slate-600">
                                {career.category || "Career"}
                            </p>

                            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                                {career.career}
                            </h1>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                                {career.description ||
                                    career.reason ||
                                    "This career matches your profile."}
                            </p>
                        </div>

                        <div className="shrink-0 rounded-3xl border border-violet-400/10 bg-violet-400/5 p-6 text-center">

                            <p className="text-xs text-slate-500">
                                Your Match
                            </p>

                            <p className="mt-2 text-5xl font-bold text-violet-400">
                                {Number(career.matchPercentage) || 0}%
                            </p>

                            <p className="mt-2 text-xs text-emerald-400">
                                AI compatibility score
                            </p>

                        </div>

                    </div>
                </section>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">

                    <section className="glass rounded-3xl p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                                <Code2 className="h-5 w-5 text-cyan-400" />
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    Required Skills
                                </h2>

                                <p className="text-xs text-slate-600">
                                    Skills required for this career
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 space-y-3">

                            {requiredSkills.length > 0 ? (
                                requiredSkills.map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                                        <span className="text-sm text-slate-300">
                                            {skill}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No required skills available.
                                </p>
                            )}

                        </div>
                    </section>

                    <section className="glass rounded-3xl p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                                <Target className="h-5 w-5 text-violet-400" />
                            </div>

                            <div>
                                <h2 className="font-semibold">
                                    Skills to Improve
                                </h2>

                                <p className="text-xs text-slate-600">
                                    Your potential skill gaps
                                </p>
                            </div>

                        </div>

                        <div className="mt-6 space-y-3">

                            {missingSkills.length > 0 ? (
                                missingSkills.map((skill, index) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-400">
                                            {index + 1}
                                        </div>

                                        <span className="text-sm text-slate-300">
                                            Learn {skill}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-emerald-400">
                                    Great! You already have all the listed core skills.
                                </p>
                            )}

                        </div>
                    </section>

                </div>

                <section className="mt-6 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/5 bg-gradient-to-r from-violet-500/[0.08] to-cyan-400/[0.05] p-6 sm:flex-row">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                            <GraduationCap className="h-5 w-5 text-violet-400" />
                        </div>

                        <div>
                            <h3 className="font-semibold">
                                Ready to build this career?
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                Identify your skill gaps and continue your learning journey.
                            </p>
                        </div>

                    </div>

                    <Link
                        href="/skillgappage"
                        className="button-glow inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                    >
                        Analyze Skill Gap
                        <ArrowRight className="h-4 w-4" />
                    </Link>

                </section>

            </div>
        </main>
    );
}