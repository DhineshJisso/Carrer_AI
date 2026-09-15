"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

import api from "../../interceptor/Axios";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Password validation
    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(
        "REGISTER RESPONSE:",
        response.data
      );

      if (response.data.success) {
        setSuccess(
          response.data.message ||
          "Account created successfully!"
        );

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // If backend sends token after registration
        if (response.data.token) {
          localStorage.setItem(
            "token",
            response.data.token
          );

          if (response.data.user) {
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.user)
            );
          }

          setTimeout(() => {
            window.location.href = "/dashboardpage";
          }, 1000);
        } else {
          // Registration success → Login
          setTimeout(() => {
            window.location.href = "/loginpage";
          }, 1000);
        }
      } else {
        setError(
          response.data.message ||
          "Registration failed."
        );
      }
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b14] text-white">

      {/* Background */}
      <div className="career-glow left-[-200px] top-[10%]" />
      <div className="career-glow-cyan bottom-[-220px] right-[-180px]" />
      <div className="career-grid absolute inset-0 opacity-30" />

      <div className="relative flex min-h-screen">

        {/* LEFT SIDE */}
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
                  Career
                  <span className="text-violet-400">
                    AI
                  </span>
                </p>

                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
                  Career Intelligence
                </p>
              </div>
            </Link>

            {/* Heading */}
            <div className="mt-14">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-medium text-cyan-300">
                <BrainCircuit className="h-3.5 w-3.5" />

                BUILD YOUR CAREER PROFILE
              </div>

              <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.04em]">
                Start your journey.
                <br />

                <span className="gradient-text">
                  Discover your potential.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">
                Create your CareerAI profile and unlock
                personalized career recommendations,
                skill analysis, and a roadmap designed
                around your goals.
              </p>

            </div>

            {/* Benefits */}
            <div className="mt-10 space-y-3">

              <Benefit text="Personalized career recommendations" />

              <Benefit text="AI-powered skill gap analysis" />

              <Benefit text="Step-by-step learning roadmap" />

              <Benefit text="Track your career progress" />

            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}
        <section className="relative flex w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex justify-center lg:hidden">

              <Link
                href="/"
                className="flex items-center gap-3"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>

                <p className="text-lg font-bold">
                  Career
                  <span className="text-violet-400">
                    AI
                  </span>
                </p>

              </Link>

            </div>

            {/* Register Card */}
            <div className="glass gradient-border rounded-3xl p-6 shadow-2xl shadow-black/30 sm:p-8">

              {/* Header */}
              <div className="mb-7">

                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                  <User className="h-5 w-5 text-cyan-400" />
                </div>

                <h2 className="text-2xl font-bold">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Start building your personalized career
                  profile.
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

              {/* Success */}
              {success && (
                <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
                  <p className="text-xs leading-5 text-emerald-400">
                    {success}
                  </p>
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Full Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Full name
                  </label>

                  <div className="relative">

                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Your full name"
                      required
                      disabled={loading}
                      autoComplete="name"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                  </div>

                </div>

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
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                  </div>

                </div>

                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Password
                  </label>

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
                      placeholder="Create a password"
                      required
                      minLength={6}
                      disabled={loading}
                      autoComplete="new-password"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}
                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-medium text-slate-300"
                  >
                    Confirm password
                  </label>

                  <div className="relative">

                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                      disabled={loading}
                      autoComplete="new-password"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      disabled={loading}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>

                  </div>

                </div>

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 pt-1">

                  <input
                    type="checkbox"
                    required
                    disabled={loading}
                    className="mt-0.5 h-4 w-4 accent-violet-500"
                  />

                  <span className="text-xs leading-5 text-slate-500">
                    I agree to the Terms of Service and
                    Privacy Policy.
                  </span>

                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="button-glow group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}

                </button>

              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">

                <p className="text-sm text-slate-500">
                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-semibold text-violet-400 transition hover:text-violet-300"
                  >
                    Sign in
                  </Link>
                </p>

              </div>

            </div>

            {/* Back */}
            <div className="mt-5 text-center">

              <Link
                href="/"
                className="text-xs text-slate-600 transition hover:text-slate-400"
              >
                ← Back to CareerAI
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}

/* Benefit Component */

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10">
        <Check className="h-3.5 w-3.5 text-emerald-400" />
      </div>

      <span className="text-sm text-slate-400">
        {text}
      </span>

    </div>
  );
}