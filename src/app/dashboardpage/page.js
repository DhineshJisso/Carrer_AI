// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import Link from "next/link";

// import {
//   AlertCircle,
//   ArrowRight,
//   Award,
//   BookOpen,
//   CheckCircle2,
//   ClipboardCheck,
//   Loader2,
//   Map,
//   Sparkles,
//   Target,
//   TrendingUp,
// } from "lucide-react";

// import api from "../interceptor/Axios";

// import DashboardHeader from "../dashboardpage/components/DashBoardHeader";
// import CareerMatchCard from "./components/CarrerMatchCard";
// import SkillProgress from "./components/SkillProgress";
// import StatsCard from "./components/StatsCard";


// export default function DashboardPage() {
//   const [dashboard, setDashboard] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     fetchDashboard();
//   }, []);


//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/dashboard"
//       );

//       console.log(
//         "DASHBOARD RESPONSE:",
//         response.data
//       );

//       if (!response.data?.success) {
//         throw new Error(
//           response.data?.message ||
//           "Failed to load dashboard"
//         );
//       }

//       setDashboard(
//         response.data.data
//       );

//     } catch (error) {
//       console.error(
//         "DASHBOARD ERROR:",
//         error.response?.data ||
//         error.message
//       );

//       setError(
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to load dashboard"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };


//   if (loading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">

//         <div className="text-center">

//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
//             <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
//           </div>

//           <p className="mt-5 text-sm font-medium">
//             Building your dashboard...
//           </p>

//           <p className="mt-1 text-xs text-slate-500">
//             Loading your personalized career insights
//           </p>

//         </div>

//       </main>
//     );
//   }


//   if (error) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">

//         <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">

//           <AlertCircle className="mx-auto h-9 w-9 text-red-400" />

//           <h2 className="mt-4 text-xl font-bold">
//             Unable to load dashboard
//           </h2>

//           <p className="mt-3 text-sm leading-6 text-slate-500">
//             {error}
//           </p>

//           <button
//             type="button"
//             onClick={fetchDashboard}
//             className="mt-6 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
//           >
//             Try Again
//           </button>

//         </div>

//       </main>
//     );
//   }


//   const {
//     user,
//     assessment,
//     career,
//     skillGap,
//     courses,
//     roadmap,
//   } = dashboard || {};


//   const skills =
//     assessment?.skills || [];

//   const interests =
//     assessment?.interests || [];

//   const overallSkillProgress =
//     skillGap?.skillMatchPercentage ||
//     skillGap?.progress ||
//     0;


//   return (
//     <main className="min-h-screen bg-[#080b14] text-white">

//       {/* HEADER */}
//       <DashboardHeader
//         user={user}
//       />


//       <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

//         {/* HERO */}

//         <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 p-6 sm:p-8">

//           <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

//           <div className="relative">

//             <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

//               <div>

//                 <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">

//                   <Sparkles className="h-3.5 w-3.5" />

//                   Personalized Dashboard

//                 </div>

//                 <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">

//                   Welcome back,
//                   <span className="text-violet-400">
//                     {" "}
//                     {user?.name || "User"} 👋
//                   </span>

//                 </h1>

//                 <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">

//                   Track your career journey, discover your
//                   strongest skills, and continue building toward
//                   your personalized career goal.

//                 </p>

//               </div>


//               <div className="rounded-2xl border border-white/5 bg-black/10 px-5 py-4">

//                 <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
//                   Current goal
//                 </p>

//                 <p className="mt-2 text-sm font-semibold text-violet-300">
//                   {career?.name ||
//                     "Complete assessment"}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {user?.email || ""}
//                 </p>

//               </div>

//             </div>

//           </div>

//         </section>


//         {/* STATS */}

//         <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

//           <StatsCard
//             title="Career Match"
//             value={
//               career
//                 ? `${career.matchPercentage || 0}%`
//                 : "—"
//             }
//             description={
//               career
//                 ? career.name
//                 : "No recommendation yet"
//             }
//             icon={Target}
//           />

//           <StatsCard
//             title="Skill Match"
//             value={`${overallSkillProgress}%`}
//             description={
//               skillGap?.matchedSkills?.length
//                 ? `${skillGap.matchedSkills.length} matched skills`
//                 : "Complete skill analysis"
//             }
//             icon={TrendingUp}
//           />

//           <StatsCard
//             title="Recommended Courses"
//             value={courses?.total || 0}
//             description="Personalized for your skill gaps"
//             icon={BookOpen}
//           />

//           <StatsCard
//             title="Roadmap Progress"
//             value={`${roadmap?.progress || 0}%`}
//             description={
//               `${roadmap?.completedSteps || 0} of ` +
//               `${roadmap?.totalSteps || 0} steps completed`
//             }
//             icon={Map}
//           />

//         </section>


//         {/* CAREER + SKILLS */}

//         <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">

//           <CareerMatchCard
//             career={career}
//             skillGap={skillGap}
//           />


//           <div className="glass rounded-3xl p-6">

//             <div className="flex items-start justify-between">

//               <div>

//                 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
//                   Skills Analysis
//                 </p>

//                 <h2 className="mt-2 text-xl font-bold">
//                   Your progress
//                 </h2>

//               </div>

//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
//                 <Award className="h-5 w-5 text-cyan-400" />
//               </div>

//             </div>


//             <div className="mt-7 space-y-5">

//               {skills.length > 0 ? (
//                 skills.slice(0, 5).map(
//                   (skill, index) => {

//                     // First skill gap matched skills-ku
//                     // visual progress assign pannrom
//                     const isMatched =
//                       skillGap?.matchedSkills?.some(
//                         (matchedSkill) =>
//                           matchedSkill.toLowerCase() ===
//                           skill.toLowerCase()
//                       );

//                     const percentage =
//                       isMatched
//                         ? Math.max(
//                           70,
//                           overallSkillProgress
//                         )
//                         : Math.max(
//                           35,
//                           overallSkillProgress - 20
//                         );

//                     return (
//                       <SkillProgress
//                         key={`${skill}-${index}`}
//                         name={skill}
//                         percentage={percentage}
//                       />
//                     );
//                   }
//                 )
//               ) : (

//                 <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">

//                   <p className="text-sm font-medium">
//                     No skills found
//                   </p>

//                   <p className="mt-2 text-xs leading-5 text-slate-500">
//                     Complete your assessment to see your
//                     personalized skill progress.
//                   </p>

//                 </div>

//               )}

//             </div>


//             <div className="mt-6 border-t border-white/5 pt-5">

//               <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
//                 Experience level
//               </p>

//               <p className="mt-2 text-sm font-semibold text-violet-300">
//                 {assessment?.experienceLevel ||
//                   "Not specified"}
//               </p>

//             </div>

//           </div>

//         </section>


//         {/* ROADMAP + PROFILE */}

//         <section className="mt-8 grid gap-6 lg:grid-cols-2">

//           {/* ROADMAP */}

//           <div className="glass rounded-3xl p-6">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
//                   Career Roadmap
//                 </p>

//                 <h2 className="mt-2 text-xl font-bold">
//                   {roadmap?.career ||
//                     "Your learning roadmap"}
//                 </h2>

//               </div>

//               <span className="text-2xl font-bold text-emerald-400">
//                 {roadmap?.progress || 0}%
//               </span>

//             </div>


//             <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">

//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-1000"
//                 style={{
//                   width: `${roadmap?.progress || 0}%`,
//                 }}
//               />

//             </div>


//             <div className="mt-5 flex items-center justify-between text-xs">

//               <span className="text-slate-500">
//                 {roadmap?.completedSteps || 0} completed
//               </span>

//               <span className="text-slate-600">
//                 {roadmap?.totalSteps || 0} total steps
//               </span>

//             </div>


//             <Link
//               href="/roadmappage"
//               className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-emerald-300"
//             >
//               View roadmap
//               <ArrowRight className="h-4 w-4" />
//             </Link>

//           </div>


//           {/* USER PROFILE */}

//           <div className="glass rounded-3xl p-6">

//             <div className="flex items-center justify-between">

//               <div>

//                 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
//                   Your Profile
//                 </p>

//                 <h2 className="mt-2 text-xl font-bold">
//                   Account overview
//                 </h2>

//               </div>

//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
//                 <ClipboardCheck className="h-5 w-5 text-violet-400" />
//               </div>

//             </div>


//             <div className="mt-6 space-y-4">

//               <div className="flex items-center justify-between border-b border-white/5 pb-3">

//                 <span className="text-xs text-slate-500">
//                   Name
//                 </span>

//                 <span className="text-sm font-medium">
//                   {user?.name || "User"}
//                 </span>

//               </div>


//               <div className="flex items-center justify-between gap-5 border-b border-white/5 pb-3">

//                 <span className="shrink-0 text-xs text-slate-500">
//                   Email
//                 </span>

//                 <span className="truncate text-right text-sm font-medium">
//                   {user?.email || "Not available"}
//                 </span>

//               </div>


//               <div className="flex items-center justify-between border-b border-white/5 pb-3">

//                 <span className="text-xs text-slate-500">
//                   Assessment
//                 </span>

//                 <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">

//                   <CheckCircle2 className="h-3.5 w-3.5" />

//                   {assessment?.completed
//                     ? "Completed"
//                     : "Not completed"}

//                 </span>

//               </div>


//               <div className="flex items-center justify-between">

//                 <span className="text-xs text-slate-500">
//                   Interests
//                 </span>

//                 <span className="max-w-[55%] truncate text-right text-sm font-medium">
//                   {interests.length > 0
//                     ? interests.slice(0, 2).join(", ")
//                     : "Not specified"}
//                 </span>

//               </div>

//             </div>

//           </div>

//         </section>

//       </div>

//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  Map,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import api from "../interceptor/Axios";
import DashboardHeader from "../dashboardpage/components/DashBoardHeader";
import CareerMatchCard from "./components/CarrerMatchCard";
import SkillProgress from "./components/SkillProgress";
import StatsCard from "./components/StatsCard";
import JobCard from "../jobcard/components/JobCard"; // IMPORT THIS

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/dashboard");
      console.log("DASHBOARD RESPONSE:", response.data);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to load dashboard");
      }
      setDashboard(response.data.data);
    } catch (error) {
      console.error("DASHBOARD ERROR:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
            <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
          </div>
          <p className="mt-5 text-sm font-medium">Building your dashboard...</p>
          <p className="mt-1 text-xs text-slate-500">Loading your personalized career insights</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <AlertCircle className="mx-auto h-9 w-9 text-red-400" />
          <h2 className="mt-4 text-xl font-bold">Unable to load dashboard</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">{error}</p>
          <button
            type="button"
            onClick={fetchDashboard}
            className="mt-6 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  const { user, assessment, career, skillGap, courses, roadmap } = dashboard || {};
  const skills = assessment?.skills || [];
  const interests = assessment?.interests || [];
  const overallSkillProgress = skillGap?.skillMatchPercentage || skillGap?.progress || 0;
  const jobData = dashboard?.jobs || {};

  return (
    <main className="min-h-screen bg-[#080b14] text-white">
      <DashboardHeader user={user} />

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/5 p-6 sm:p-8">
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Personalized Dashboard
                </div>
                <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome back,
                  <span className="text-violet-400"> {user?.name || "User"} 👋</span>
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Track your career journey, discover your strongest skills, and continue building toward your personalized career goal.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-black/10 px-5 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">Current goal</p>
                <p className="mt-2 text-sm font-semibold text-violet-300">{career?.name || "Complete assessment"}</p>
                <p className="mt-1 text-xs text-slate-500">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Career Match"
            value={career ? `${career.matchPercentage || 0}%` : "—"}
            description={career ? career.name : "No recommendation yet"}
            icon={Target}
          />
          <StatsCard
            title="Skill Match"
            value={`${overallSkillProgress}%`}
            description={skillGap?.matchedSkills?.length ? `${skillGap.matchedSkills.length} matched skills` : "Complete skill analysis"}
            icon={TrendingUp}
          />
          <StatsCard
            title="Recommended Courses"
            value={courses?.total || 0}
            description="Personalized for your skill gaps"
            icon={BookOpen}
          />
          <StatsCard
            title="Roadmap Progress"
            value={`${roadmap?.progress || 0}%`}
            description={`${roadmap?.completedSteps || 0} of ${roadmap?.totalSteps || 0} steps completed`}
            icon={Map}
          />
        </section>

        {/* CAREER + SKILLS */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <CareerMatchCard career={career} skillGap={skillGap} />
          <div className="glass rounded-3xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">Skills Analysis</p>
                <h2 className="mt-2 text-xl font-bold">Your progress</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                <Award className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div className="mt-7 space-y-5">
              {skills.length > 0 ? (
                skills.slice(0, 5).map((skill, index) => {
                  const isMatched = skillGap?.matchedSkills?.some(
                    (matchedSkill) => matchedSkill.toLowerCase() === skill.toLowerCase()
                  );
                  const percentage = isMatched ? Math.max(70, overallSkillProgress) : Math.max(35, overallSkillProgress - 20);
                  return <SkillProgress key={`${skill}-${index}`} name={skill} percentage={percentage} />;
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
                  <p className="text-sm font-medium">No skills found</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">Complete your assessment to see your personalized skill progress.</p>
                </div>
              )}
            </div>
            <div className="mt-6 border-t border-white/5 pt-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">Experience level</p>
              <p className="mt-2 text-sm font-semibold text-violet-300">{assessment?.experienceLevel || "Not specified"}</p>
            </div>
          </div>
        </section>

        {/* ROADMAP + PROFILE */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">Career Roadmap</p>
                <h2 className="mt-2 text-xl font-bold">{roadmap?.career || "Your learning roadmap"}</h2>
              </div>
              <span className="text-2xl font-bold text-emerald-400">{roadmap?.progress || 0}%</span>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-1000"
                style={{ width: `${roadmap?.progress || 0}%` }}
              />
            </div>
            <div className="mt-5 flex items-center justify-between text-xs">
              <span className="text-slate-500">{roadmap?.completedSteps || 0} completed</span>
              <span className="text-slate-600">{roadmap?.totalSteps || 0} total steps</span>
            </div>
            <Link href="/roadmappage" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-emerald-300">
              View roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">Your Profile</p>
                <h2 className="mt-2 text-xl font-bold">Account overview</h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <ClipboardCheck className="h-5 w-5 text-violet-400" />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500">Name</span>
                <span className="text-sm font-medium">{user?.name || "User"}</span>
              </div>
              <div className="flex items-center justify-between gap-5 border-b border-white/5 pb-3">
                <span className="shrink-0 text-xs text-slate-500">Email</span>
                <span className="truncate text-right text-sm font-medium">{user?.email || "Not available"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500">Assessment</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {assessment?.completed ? "Completed" : "Not completed"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Interests</span>
                <span className="max-w-[55%] truncate text-right text-sm font-medium">
                  {interests.length > 0 ? interests.slice(0, 2).join(", ") : "Not specified"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* JOB OPPORTUNITIES SECTION - NEW */}
        {/* ========================================== */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                Job Opportunities
              </p>
              <h2 className="mt-2 text-xl font-bold">
                Matched Jobs for You
              </h2>
            </div>
            <Link
              href="/jobcard"
              className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition"
            >
              View All →
            </Link>
          </div>

          {/* Job Count Badge */}
          <div className="mt-3 inline-flex items-center rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-1.5">
            <span className="text-sm font-semibold text-violet-300">
              {jobData.relevantJobs || 0} opportunities found
            </span>
          </div>

          {/* Job Cards */}
          {jobData?.data?.length > 0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {jobData.data.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <h3 className="text-lg font-semibold text-white">
                No matching jobs found
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {skills.length === 0
                  ? "Complete your assessment with skills to see relevant job opportunities."
                  : "Add more skills to your profile to find better job matches."}
              </p>
              <Link
                href="/assessmentpage#skills"
                className="mt-5 inline-block rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold transition hover:bg-violet-400"
              >
                {skills.length === 0
                  ? "Start Assessment"
                  : "Update Skills"}
              </Link>
              <Link href="/roadmappage">
              </Link>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}