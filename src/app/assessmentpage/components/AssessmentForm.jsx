"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Target,
} from "lucide-react";

import SkillSelector from "./SkillSelector";
import InterestSelector from "./InterestSelector";
import api from "../../interceptor/Axios";

const steps = [
  "Profile",
  "Education",
  "Skills",
  "Interests",
  "Goals",
];

export default function AssessmentForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    education: "",
    field: "",
    experienceLevel: "Beginner",
    preferredWorkStyle: "Flexible",
    skills: [],
    interests: [],
    careerGoals: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const nextStep = () => {
    setError("");

    if (currentStep === 0) {
      if (!formData.name.trim()) {
        setError("Please enter your full name.");
        return;
      }
    }

    if (currentStep === 1) {
      if (!formData.education || !formData.field.trim()) {
        setError("Please complete your education details.");
        return;
      }
    }

    if (currentStep === 2) {
      if (formData.skills.length === 0) {
        setError("Please select at least one skill.");
        return;
      }
    }

    if (currentStep === 3) {
      if (formData.interests.length === 0) {
        setError("Please select at least one interest.");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setError("");

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.careerGoals) {
      setError("Please select your career goal.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),

        education: {
          degree: formData.education,
          field: formData.field.trim(),
        },

        skills: formData.skills,

        interests: formData.interests,

        experienceLevel: formData.experienceLevel,

        preferredWorkStyle: formData.preferredWorkStyle,

        careerGoals: formData.careerGoals,
      };

      console.log("ASSESSMENT PAYLOAD:", payload);

      // STEP 1: Save assessment
      const assessmentResponse = await api.post(
        "/assessment",
        payload
      );

      console.log(
        "ASSESSMENT RESPONSE:",
        assessmentResponse.data
      );

      if (!assessmentResponse.data?.success) {
        throw new Error(
          assessmentResponse.data?.message ||
          "Failed to save assessment."
        );
      }

      setSuccess(
        "Assessment saved successfully! Generating career recommendations..."
      );

      // STEP 2: Generate recommendations ONLY AFTER assessment save
      const careerResponse = await api.post(
        "/career/recommend"
      );

      console.log(
        "CAREER RECOMMEND RESPONSE:",
        careerResponse.data
      );

      if (!careerResponse.data?.success) {
        throw new Error(
          careerResponse.data?.message ||
          "Failed to generate career recommendations."
        );
      }

      setSuccess(
        "Career recommendations generated successfully!"
      );

      // STEP 3: Go to careers page
      setTimeout(() => {
        window.location.href = "/careerspage";
      }, 1000);

    } catch (error) {
      console.error(
        "ASSESSMENT ERROR:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to save assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b14] text-white">

      <div className="career-glow left-[-200px] top-[10%]" />
      <div className="career-glow-cyan bottom-[-200px] right-[-180px]" />
      <div className="career-grid absolute inset-0 opacity-25" />

      <header className="relative border-b border-white/5 bg-[#0b0f19]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            href="/dashboardpage"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400">
              <Sparkles className="h-4 w-4" />
            </div>

            <span className="font-bold">
              Career<span className="text-violet-400">AI</span>
            </span>
          </div>

          <div className="text-xs text-slate-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:py-14">

        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
            <BrainCircuit className="h-6 w-6 text-violet-400" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Discover your
            <span className="gradient-text"> career direction.</span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            Tell us about yourself. Our AI will use your profile,
            skills, interests, and goals to identify suitable career paths.
          </p>

        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex items-center justify-between">

            {steps.map((step, index) => (
              <div key={step} className="flex items-center">

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${index <= currentStep
                      ? "bg-violet-500 text-white"
                      : "border border-white/10 bg-white/[0.03] text-slate-600"
                    }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`ml-2 hidden text-xs sm:block ${index <= currentStep
                      ? "text-slate-300"
                      : "text-slate-600"
                    }`}
                >
                  {step}
                </span>

                {index < steps.length - 1 && (
                  <div
                    className={`mx-2 h-px w-6 sm:mx-4 sm:w-12 ${index < currentStep
                        ? "bg-violet-500"
                        : "bg-white/10"
                      }`}
                  />
                )}

              </div>
            ))}

          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass mx-auto mt-10 max-w-3xl rounded-3xl p-6 shadow-2xl shadow-black/30 sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
              <p className="text-sm text-emerald-400">{success}</p>
            </div>
          )}

          {currentStep === 0 && (
            <div>
              <StepHeader
                icon={<Target className="h-5 w-5" />}
                title="Tell us about yourself"
                description="Let's start with some basic information."
              />

              <div className="mt-8 space-y-5">
                <InputField
                  label="Full name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(value) => updateData("name", value)}
                />

                <SelectField
                  label="Experience level"
                  value={formData.experienceLevel}
                  onChange={(value) =>
                    updateData("experienceLevel", value)
                  }
                  options={[
                    "Beginner",
                    "Intermediate",
                    "Advanced",
                  ]}
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <StepHeader
                icon={<GraduationCap className="h-5 w-5" />}
                title="Your education"
                description="Tell us about your educational background."
              />

              <div className="mt-8 space-y-5">
                <SelectField
                  label="Highest education"
                  value={formData.education}
                  onChange={(value) => updateData("education", value)}
                  options={[
                    "Higher Secondary",
                    "Diploma",
                    "Bachelor's Degree",
                    "Master's Degree",
                    "Other",
                  ]}
                />

                <InputField
                  label="Field of study"
                  placeholder="e.g. Computer Science"
                  value={formData.field}
                  onChange={(value) => updateData("field", value)}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <StepHeader
                icon={<BrainCircuit className="h-5 w-5" />}
                title="Your skills"
                description="Select the skills you currently have."
              />

              <div className="mt-8">
                <SkillSelector
                  selectedSkills={formData.skills}
                  setSelectedSkills={(skills) =>
                    updateData("skills", skills)
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <StepHeader
                icon={<Sparkles className="h-5 w-5" />}
                title="Your interests"
                description="Choose the areas you enjoy or want to explore."
              />

              <div className="mt-8">
                <InterestSelector
                  selectedInterests={formData.interests}
                  setSelectedInterests={(interests) =>
                    updateData("interests", interests)
                  }
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <StepHeader
                icon={<Target className="h-5 w-5" />}
                title="Your career goal"
                description="What are you looking for in your next career?"
              />

              <div className="mt-8 space-y-3">

                {[
                  "Get my first job",
                  "Switch to a new career",
                  "Improve my current career",
                  "Explore suitable career options",
                  "Build skills for the future",
                ].map((goal) => (
                  <button
                    type="button"
                    key={goal}
                    onClick={() => updateData("careerGoals", goal)}
                    className={`w-full rounded-xl border p-4 text-left text-sm transition ${formData.careerGoals === goal
                        ? "border-violet-400/40 bg-violet-400/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
                      }`}
                  >
                    {goal}
                  </button>
                ))}

              </div>

              <div className="mt-6">
                <SelectField
                  label="Preferred work style"
                  value={formData.preferredWorkStyle}
                  onChange={(value) =>
                    updateData("preferredWorkStyle", value)
                  }
                  options={[
                    "Flexible",
                    "Remote",
                    "Hybrid",
                    "On-site",
                  ]}
                />
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">

            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0 || loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="button-glow inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="button-glow inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Analyze My Career"}

                {!loading && (
                  <Sparkles className="h-4 w-4" />
                )}
              </button>
            )}

          </div>
        </form>
      </div>
    </main>
  );
}

function StepHeader({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-300">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-400/10"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-300">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-white/10 bg-[#0f1420] px-4 text-sm text-white outline-none transition focus:border-violet-400/50"
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}