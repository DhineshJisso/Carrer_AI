"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import api from "../../interceptor/Axios";

export default function CareerCard({ career }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // VIEW COURSE RECOMMENDATIONS
  // ==========================================

  const handleViewCourses = async () => {
    try {
      setLoading(true);
      setError("");

      // Validate career data
      if (!career?.title) {
        throw new Error("Career information is missing");
      }

      console.log("SELECTED CAREER:", career);

      // ==========================================
      // CALL COURSE RECOMMENDATION API
      // ==========================================

      const response = await api.post("/courses/recommend", {
        career: career.title,
      });

      console.log(
        "COURSE RECOMMEND RESPONSE:",
        response.data
      );

      // ==========================================
      // VALIDATE RESPONSE
      // ==========================================

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
          "Failed to generate course recommendations"
        );
      }

      // ==========================================
      // SAVE SELECTED CAREER
      // ==========================================

      sessionStorage.setItem(
        "selectedCareer",
        JSON.stringify(career)
      );

      // ==========================================
      // SAVE RECOMMENDED COURSES
      // ==========================================

      sessionStorage.setItem(
        "courseRecommendations",
        JSON.stringify(response.data.data)
      );

      // ==========================================
      // REDIRECT TO COURSES PAGE
      // ==========================================

      router.push("/coursescardpage");

    } catch (error) {
      console.error(
        "COURSE RECOMMENDATION ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to generate courses. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // MATCH SCORE
  // ==========================================

  const matchScore = Math.min(
    Math.max(Number(career?.match) || 0, 0),
    100
  );

  const matchColor =
    matchScore >= 80
      ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
      : matchScore >= 65
        ? "bg-cyan-400/10 text-cyan-400 border-cyan-400/20"
        : "bg-slate-400/10 text-slate-400 border-slate-400/20";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/30 hover:bg-white/[0.05]">

      {/* Background Glow */}

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/15" />

      {/* ======================================
          TOP SECTION
      ====================================== */}

      <div className="relative z-10 flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
          <BrainCircuit className="h-6 w-6 text-violet-400" />
        </div>

        <span
          className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${matchColor}`}
        >
          {career?.level || "Recommended"}
        </span>

      </div>


      {/* ======================================
          CAREER DETAILS
      ====================================== */}

      <div className="relative z-10 mt-6">

        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/70">
          {career?.category || "Career Path"}
        </p>

        <h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-violet-300">
          {career?.title || "Career Recommendation"}
        </h3>

        <p className="mt-3 min-h-[60px] text-xs leading-6 text-slate-400">
          {career?.description ||
            "Personalized career recommendation generated based on your profile and skills."}
        </p>

      </div>


      {/* ======================================
          MATCH SCORE
      ====================================== */}

      <div className="relative z-10 mt-6 rounded-2xl border border-white/5 bg-black/10 p-4">

        <div className="flex items-end justify-between">

          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              AI Compatibility
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Based on your assessment
            </p>
          </div>

          <span className="text-2xl font-bold text-violet-400">
            {matchScore}%
          </span>

        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">

          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 transition-all duration-1000 ease-out"
            style={{
              width: `${matchScore}%`,
            }}
          />

        </div>

      </div>


      {/* ======================================
          SKILLS
      ====================================== */}

      <div className="relative z-10 mt-6">

        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Recommended Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {career?.skills?.length > 0 ? (
            career.skills.slice(0, 5).map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-slate-400 transition-all duration-300 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-slate-500">
              Skills information unavailable
            </span>
          )}

        </div>

      </div>


      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="relative z-10 mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3">
          <p className="text-[11px] font-medium text-red-400">
            {error}
          </p>
        </div>
      )}


      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-5">

        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          AI ANALYZED
        </div>


        {/* ======================================
            VIEW COURSES BUTTON
        ====================================== */}

        <button
          type="button"
          onClick={handleViewCourses}
          disabled={loading}
          className="group/button flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-bold text-violet-300 transition-all duration-300 hover:border-violet-400/50 hover:bg-violet-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              Generating

              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              View Courses

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
            </>
          )}
        </button>

      </div>

    </div>
  );
}