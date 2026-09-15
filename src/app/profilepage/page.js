"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Award,
    BrainCircuit,
    Loader2,
    Settings,
    ShieldCheck,
    Sparkles,
    Target,
    AlertCircle,
} from "lucide-react";

import ProfileHeader from "./components/ProfileHeader";
import ProfileDetails from "./components/ProfileDetails";
import ProfileSkills from "./components/ProfileSkills";

import api from "../interceptor/Axios";

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/profile/me");

            console.log("PROFILE API RESPONSE:", response.data);

            const data =
                response.data?.profile ||
                response.data?.data ||
                response.data;

            setProfile(data);
        } catch (err) {
            console.error("PROFILE ERROR:", err);

            setError(
                err?.response?.data?.message ||
                "Unable to load your profile."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#080b14] text-white">

            {/* Navbar */}
            <header className="border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <Link
                        href="/progresspage"
                        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Progress
                    </Link>

                    <Link href="/" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
                            <Sparkles className="h-4 w-4" />
                        </div>

                        <span className="font-bold">
                            Career<span className="text-violet-400">AI</span>
                        </span>
                    </div>
                    </Link>

                    <Link
                        href="/settings"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-slate-500 transition hover:text-white"
                    >
                        <Settings className="h-4 w-4" />
                    </Link>

                </div>
            </header>

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                {/* Loading */}
                {loading && (
                    <LoadingState />
                )}

                {/* Error */}
                {!loading && error && (
                    <ErrorState
                        message={error}
                        onRetry={fetchProfile}
                    />
                )}

                {/* Profile */}
                {!loading && !error && profile && (
                    <>
                        <ProfileHeader profile={profile} />

                        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">

                            {/* LEFT */}
                            <div className="space-y-6">

                                <ProfileDetails
                                    profile={profile}
                                />

                                <ProfileSkills
                                    skills={profile.skills || []}
                                />

                            </div>

                            {/* RIGHT */}
                            <div className="space-y-6">

                                {/* Career Goal */}
                                <CareerGoal
                                    careerGoal={profile.careerGoal}
                                    careerReadiness={
                                        profile.careerReadiness
                                    }
                                />

                                {/* Assessment */}
                                <AssessmentCard
                                    score={profile.assessmentScore}
                                    questions={profile.questions}
                                    completed={
                                        profile.assessmentCompleted
                                    }
                                    updatedAt={profile.updatedAt}
                                />

                                {/* Account */}
                                <AccountCard
                                    email={profile.email}
                                    verified={profile.verified}
                                />

                            </div>

                        </div>
                    </>
                )}

                {/* Empty */}
                {!loading && !error && !profile && (
                    <EmptyState />
                )}

            </div>
        </main>
    );
}


/* =========================================================
   CAREER GOAL
========================================================= */

function CareerGoal({
    careerGoal,
    careerReadiness = 0,
}) {
    const readiness = Math.min(
        Math.max(Number(careerReadiness) || 0, 0),
        100
    );

    return (
        <section className="glass rounded-3xl p-6">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                    <Target className="h-5 w-5 text-violet-400" />
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                        Career Goal
                    </p>

                    <h2 className="mt-1 text-base font-semibold">
                        {careerGoal || "Not selected"}
                    </h2>
                </div>

            </div>

            <div className="mt-5 rounded-2xl border border-violet-400/10 bg-violet-400/[0.04] p-4">

                <div className="flex items-center justify-between">

                    <span className="text-xs text-slate-500">
                        Career readiness
                    </span>

                    <span className="text-sm font-bold text-violet-400">
                        {readiness}%
                    </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.04]">

                    <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
                        style={{
                            width: `${readiness}%`,
                        }}
                    />

                </div>

            </div>

            <Link
                href="/skillgappage"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
                <BrainCircuit className="h-3.5 w-3.5" />
                View Skill Analysis
            </Link>

        </section>
    );
}


/* =========================================================
   ASSESSMENT
========================================================= */

function AssessmentCard({
    score,
    questions,
    completed,
    updatedAt,
}) {
    return (
        <section className="glass rounded-3xl p-6">

            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                    <Award className="h-5 w-5 text-cyan-400" />
                </div>

                <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                        Assessment
                    </p>

                    <h2 className="mt-1 text-base font-semibold">
                        Latest Assessment
                    </h2>
                </div>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

                <MiniStat
                    label="Score"
                    value={
                        score !== undefined && score !== null
                            ? `${score}%`
                            : "N/A"
                    }
                />

                <MiniStat
                    label="Questions"
                    value={questions ?? "N/A"}
                />

                <MiniStat
                    label="Completed"
                    value={completed ? "Yes" : "No"}
                />

                <MiniStat
                    label="Updated"
                    value={
                        updatedAt
                            ? formatDate(updatedAt)
                            : "N/A"
                    }
                />

            </div>

            <Link
                href="/assessmentpage"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-xs font-semibold text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
                Retake Assessment
            </Link>

        </section>
    );
}


/* =========================================================
   ACCOUNT
========================================================= */

function AccountCard({
    email,
    verified,
}) {
    return (
        <section className="glass rounded-3xl p-6">

            <div className="flex items-center gap-3">

                <ShieldCheck className="h-5 w-5 text-emerald-400" />

                <div>
                    <h2 className="text-sm font-semibold">
                        Account & Privacy
                    </h2>

                    <p className="mt-1 text-[10px] text-slate-600">
                        Manage your account information
                    </p>
                </div>

            </div>

            <div className="mt-5 space-y-2">

                <AccountItem
                    title="Email"
                    value={email || "Not available"}
                />

                <AccountItem
                    title="Account Status"
                    value={verified ? "Verified" : "Unverified"}
                />

            </div>

        </section>
    );
}


/* =========================================================
   SMALL COMPONENTS
========================================================= */

function MiniStat({
    label,
    value,
}) {
    return (
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">

            <p className="text-[9px] uppercase tracking-wider text-slate-600">
                {label}
            </p>

            <p className="mt-1 text-xs font-semibold text-slate-300">
                {value}
            </p>

        </div>
    );
}


function AccountItem({
    title,
    value,
}) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3">

            <span className="text-[10px] text-slate-500">
                {title}
            </span>

            <span className="text-[10px] font-medium text-slate-300">
                {value}
            </span>

        </div>
    );
}


/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">

            <div className="flex flex-col items-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-400/5">
                    <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-300">
                    Loading your profile...
                </p>

                <p className="mt-1 text-xs text-slate-600">
                    Fetching your career information
                </p>

            </div>

        </div>
    );
}


/* =========================================================
   ERROR
========================================================= */

function ErrorState({
    message,
    onRetry,
}) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">

            <div className="max-w-sm rounded-3xl border border-red-400/10 bg-red-400/[0.03] p-8 text-center">

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10">
                    <AlertCircle className="h-6 w-6 text-red-400" />
                </div>

                <h2 className="mt-4 text-sm font-semibold">
                    Unable to load profile
                </h2>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                    {message}
                </p>

                <button
                    onClick={onRetry}
                    className="mt-5 rounded-xl bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                    Try Again
                </button>

            </div>

        </div>
    );
}


/* =========================================================
   EMPTY
========================================================= */

function EmptyState() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">

            <div className="text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10">
                    <Sparkles className="h-6 w-6 text-violet-400" />
                </div>

                <h2 className="mt-4 text-sm font-semibold">
                    No profile data found
                </h2>

                <p className="mt-2 text-xs text-slate-600">
                    Complete your profile to see your information here.
                </p>

            </div>

        </div>
    );
}


/* =========================================================
   DATE
========================================================= */

function formatDate(date) {
    try {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "N/A";
    }
}