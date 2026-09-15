"use client";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import Link from "next/link";

import {
    ArrowLeft,
    AlertCircle,
    Loader2,
    Sparkles,
    User,
} from "lucide-react";

import CourseHeader from "./components/CourseHeader";
import CourseFilters from "./components/CoursesFilter";
import CourseGrid from "./components/CourseGrid";

import api from "../interceptor/Axios";

export default function CoursesPage() {

    const [courses, setCourses] = useState([]);
    const [career, setCareer] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedLevel, setSelectedLevel] = useState("All Levels");

    const [user, setUser] = useState(null);


    // ==========================================
    // FETCH COURSES & USER PROFILE
    // ==========================================

    const fetchCourses = async () => {

        try {

            setLoading(true);
            setError("");

            console.log(
                "FETCHING MY COURSES..."
            );

            const response =
                await api.get(
                    "/courses/my-courses"
                );

            console.log(
                "COURSES RESPONSE:",
                response.data
            );

            if (!response.data?.success) {

                throw new Error(
                    response.data?.message ||
                    "Failed to fetch courses"
                );
            }

            const recommendations =
                Array.isArray(
                    response.data?.data
                )
                    ? response.data.data
                    : [];


            // ==================================
            // LATEST RECOMMENDATION
            // ==================================

            const latestRecommendation =
                recommendations.length > 0
                    ? recommendations[0]
                    : null;


            // ==================================
            // CAREER
            // ==================================

            const currentCareer =
                latestRecommendation?.career ||
                "Your Career";

            setCareer(currentCareer);


            // ==================================
            // COURSES
            // ==================================

            const recommendedCourses =
                Array.isArray(
                    latestRecommendation?.courses
                )
                    ? latestRecommendation.courses
                    : [];

            setCourses(
                recommendedCourses
            );

        } catch (error) {

            console.error(
                "COURSES ERROR:",
                error.response?.data ||
                error.message ||
                error
            );

            setError(
                error.response?.data?.message ||
                error.message ||
                "Failed to load recommended courses."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // INITIAL FETCH
    // ==========================================

    useEffect(() => {

        fetchCourses();

        // Fetch user object from localStorage
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("User parse error:", err);
            }
        }

    }, []);


    // ==========================================
    // FILTER
    // ==========================================

    const filteredCourses =
        useMemo(() => {

            const search =
                searchTerm
                    .toLowerCase()
                    .trim();

            return courses.filter(
                (course) => {

                    const title =
                        course.title
                            ?.toLowerCase() || "";

                    const skill =
                        course.skill
                            ?.toLowerCase() || "";

                    const platform =
                        course.platform
                            ?.toLowerCase() || "";

                    const matchesSearch =
                        !search ||
                        title.includes(search) ||
                        skill.includes(search) ||
                        platform.includes(search);


                    const matchesCategory =
                        selectedCategory ===
                        "All Categories" ||
                        course.platform ===
                        selectedCategory;


                    const matchesLevel =
                        selectedLevel ===
                        "All Levels" ||
                        course.level ===
                        selectedLevel;


                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesLevel
                    );
                }
            );

        }, [
            courses,
            searchTerm,
            selectedCategory,
            selectedLevel,
        ]);


    // ==========================================
    // DYNAMIC USER VALUES
    // ==========================================

    const userName =
        user?.name ||
        user?.userName ||
        "Career Explorer";

    const userEmail =
        user?.email ||
        "";

    const userInitial =
        userName
            ?.charAt(0)
            ?.toUpperCase() ||
        "U";


    // ==========================================
    // UI
    // ==========================================

    return (
        <main className="min-h-screen bg-[#080b14] text-white">

            {/* HEADER */}

            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">

                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

                    <Link
                        href="/roadmappage"
                        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Roadmap
                    </Link>

                    <Link href="/" className="cursor-pointer">
                        <div className="flex items-center gap-2">

                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">

                                <Sparkles className="h-4 w-4 text-white" />

                            </div>

                            <span className="font-bold tracking-tight">

                                Career

                                <span className="text-violet-400">
                                    AI
                                </span>

                            </span>

                        </div>
                    </Link>


                    {/* DYNAMIC PROFILE AVATAR & HOVER */}
                    <div className="group relative">

                        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-bold text-violet-300 transition hover:scale-105">
                            {userInitial}
                        </div>

                        <div className="pointer-events-none absolute right-0 top-12 w-56 translate-y-2 rounded-2xl border border-white/10 bg-[#111827] p-4 opacity-0 shadow-2xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10">
                                    <User className="h-4 w-4 text-violet-400" />
                                </div>

                                <div className="min-w-0">

                                    <p className="truncate text-xs font-semibold">
                                        {userName}
                                    </p>

                                    <p className="truncate text-[10px] text-slate-500">
                                        {userEmail || "CareerAI User"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </header>


            {/* CONTENT */}

            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

                {/* HEADER */}

                <CourseHeader
                    career={career}
                    courseCount={courses.length}
                />


                {/* LOADING */}

                {loading && (

                    <div className="flex min-h-[400px] flex-col items-center justify-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">

                            <Loader2 className="h-7 w-7 animate-spin text-violet-400" />

                        </div>

                        <p className="mt-5 text-sm text-slate-500">
                            Loading your personalized courses...
                        </p>

                    </div>

                )}


                {/* ERROR */}

                {!loading && error && (

                    <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">

                        <AlertCircle className="mx-auto h-7 w-7 text-red-400" />

                        <h3 className="mt-3 font-semibold text-red-300">
                            Unable to load courses
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={fetchCourses}
                            className="mt-5 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-400"
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* MAIN */}

                {!loading && !error && (

                    <>

                        {/* FILTERS */}

                        <div className="mt-8">

                            <CourseFilters
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                selectedLevel={selectedLevel}
                                setSelectedLevel={setSelectedLevel}
                            />

                        </div>


                        {/* COURSES */}

                        <section className="mt-8">

                            <div className="mb-5 flex items-end justify-between">

                                <div>

                                    <p className="text-xs uppercase tracking-[0.18em] text-slate-600">
                                        Recommended Learning
                                    </p>

                                    <h2 className="mt-2 text-xl font-semibold">

                                        {career
                                            ? `Courses for ${career}`
                                            : "Your Recommended Courses"}

                                    </h2>

                                </div>


                                <span className="text-xs text-slate-600">

                                    {filteredCourses.length}

                                    {" "}course
                                    {filteredCourses.length !== 1
                                        ? "s"
                                        : ""}{" "}
                                    found

                                </span>

                            </div>


                            {/* EMPTY */}

                            {filteredCourses.length === 0 ? (

                                <div className="rounded-3xl border border-white/5 bg-white/[0.02] py-20 text-center">

                                    <Sparkles className="mx-auto h-10 w-10 text-violet-400/60" />

                                    <h3 className="mt-5 text-lg font-semibold">
                                        No Courses Found
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">

                                        {courses.length === 0
                                            ? "No course recommendations are available yet."
                                            : "Try changing your search or filters."}

                                    </p>

                                </div>

                            ) : (

                                <CourseGrid
                                    courses={filteredCourses}
                                    career={career}
                                />

                            )}

                        </section>

                    </>

                )}

            </div>

        </main>
    );
}