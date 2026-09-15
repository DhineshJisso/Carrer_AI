"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

import api from "../../interceptor/Axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: cleanEmail,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;

        if (!token) {
          setError("Login successful, but authentication token was not received.");
          return;
        }

        localStorage.setItem("token", token);

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        window.location.href = "/dashboardpage";
      } else {
        setError(response.data.message || "Login failed.");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#080b14] text-white">

      {/* Background */}
      <div className="career-glow left-[-220px] top-[10%]" />
      <div className="career-glow-cyan bottom-[-220px] right-[-180px]" />
      <div className="career-grid absolute inset-0 opacity-30" />

      {/* Left Branding Section */}
      <section className="relative hidden w-1/2 items-center justify-center px-12 lg:flex">

        <div className="relative max-w-lg">

          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <p className="text-xl font-bold">
                Career<span className="text-violet-400">
                  AI
                </span>
              </p>

              <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
                Career Intelligence
              </p>
            </div>
          </Link>

          {/* Main Text */}
          <div className="mt-14">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-4 py-2 text-xs font-medium text-violet-300">
              <BrainCircuit className="h-3.5 w-3.5" />
              AI-POWERED CAREER GUIDANCE
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.04em]">
              Welcome back.
              <br />

              <span className="gradient-text">
                Your future awaits.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">
              Continue your personalized career journey,
              explore your recommendations, and keep building
              the skills that move you closer to your goals.
            </p>

          </div>

          {/* Feature Cards */}
          <div className="mt-10 grid max-w-md grid-cols-2 gap-3">

            <div className="glass rounded-2xl p-4">
              <p className="text-2xl font-bold text-white">
                92%
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Career Match
              </p>
            </div>

            <div className="glass rounded-2xl p-4">
              <p className="text-2xl font-bold text-white">
                AI
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Personalized Insights
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Right Login Section */}
      <section className="relative flex w-full items-center justify-center px-5 py-12 sm:px-8 lg:w-1/2">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="mb-10 flex justify-center lg:hidden">

            <Link
              href="/"
              className="flex items-center gap-3"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400">
                <Sparkles className="h-5 w-5 text-white" />
              </div>

              <p className="text-lg font-bold">
                Career<span className="text-violet-400">
                  AI
                </span>
              </p>

            </Link>

          </div>

          {/* Login Card */}
          <div className="glass gradient-border rounded-3xl p-6 shadow-2xl shadow-black/30 sm:p-8">

            {/* Header */}
            <div className="mb-8">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <LockKeyhole className="h-5 w-5 text-violet-400" />
              </div>

              <h2 className="text-2xl font-bold">
                Sign in to CareerAI
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Access your personalized career dashboard.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
                <p className="text-xs leading-5 text-red-400">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="text-xs font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    disabled={loading}
                    className="text-xs font-medium text-violet-400 transition hover:text-violet-300 disabled:opacity-50"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    autoComplete="current-password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-300 disabled:opacity-50"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}

                  </button>

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="button-glow group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}

              </button>

            </form>

            {/* Register */}
            <div className="mt-7 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?{" "}

                <Link
                  href="/registerpage"
                  className="font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Create account
                </Link>
              </p>

            </div>

          </div>

          {/* Back Home */}
          <div className="mt-6 text-center">

            <Link
              href="/"
              className="text-xs text-slate-600 transition hover:text-slate-400"
            >
              ← Back to CareerAI
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}