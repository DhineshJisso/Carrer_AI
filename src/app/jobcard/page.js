"use client";

import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import { getMatchingJobs } from "../interceptor/Axios";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const responseData = await getMatchingJobs();

        console.log("JOBS PAGE RESPONSE:", responseData);

        if (responseData.success) {
          setJobs(responseData.data || []);
          setTotalJobs(responseData.totalJobs || 0);
        } else {
          setError(
            responseData.message || "Failed to fetch jobs"
          );
        }
      } catch (err) {
        console.error(
          "FETCH JOBS ERROR:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />

          <p className="mt-4 text-sm text-slate-400">
            Finding the best jobs for you...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-5 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-bold">
            Unable to load jobs
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080b14] px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          Career Opportunities
        </p>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          Jobs matched for you
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Explore opportunities based on your skills.
          As you acquire more skills, your match
          percentage increases automatically!
        </p>

        <div className="mt-6 inline-flex items-center rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-2">
          <span className="text-sm font-semibold text-violet-300">
            {totalJobs} opportunities found
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
            <h2 className="text-xl font-semibold">
              No job opportunities found
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Add skills to your assessment to unlock
              relevant job recommendations.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}