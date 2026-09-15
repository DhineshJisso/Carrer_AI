"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Loader2,
    Trophy,
} from "lucide-react";
import api from "../interceptor/Axios";

/*
|--------------------------------------------------------------------------
| QUESTION BANK
|--------------------------------------------------------------------------
*/
const questionBank = {
    JavaScript: [
        {
            question: "Which keyword is used to declare a constant in JavaScript?",
            options: ["var", "let", "const", "static"],
            answer: "const",
        },
        {
            question: "Which method converts a JSON string into a JavaScript object?",
            options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
            answer: "JSON.parse()",
        },
        {
            question: "Which symbol is used for strict equality?",
            options: ["==", "=", "===", "!="],
            answer: "===",
        },
        {
            question: "Which of these is an asynchronous JavaScript feature?",
            options: ["Promise", "Array", "String", "Number"],
            answer: "Promise",
        },
        {
            question: "Which method adds an element to the end of an array?",
            options: ["push()", "pop()", "shift()", "slice()"],
            answer: "push()",
        },
    ],
    React: [
        {
            question: "What is used to manage state in a React component?",
            options: ["useState", "useRoute", "useServer", "useHTML"],
            answer: "useState",
        },
        {
            question: "What is JSX?",
            options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
            answer: "JavaScript XML",
        },
        {
            question: "Which hook is commonly used for side effects?",
            options: ["useEffect", "useState", "useMemo", "useRef"],
            answer: "useEffect",
        },
        {
            question: "React components should normally return what?",
            options: ["JSX", "SQL", "CSS", "MongoDB"],
            answer: "JSX",
        },
        {
            question: "React is primarily used for what?",
            options: ["Building user interfaces", "Database management", "Operating systems", "Machine learning"],
            answer: "Building user interfaces",
        },
    ],
    Node: [
        {
            question: "Node.js allows JavaScript to run primarily in which environment?",
            options: ["Server", "Browser only", "Database", "CSS"],
            answer: "Server",
        },
        {
            question: "Which framework is commonly used with Node.js?",
            options: ["Express", "Laravel", "Django", "Spring"],
            answer: "Express",
        },
        {
            question: "Which command initializes a Node project?",
            options: ["npm init", "node start", "npm create-node", "node init"],
            answer: "npm init",
        },
        {
            question: "Which package manager is commonly used with Node.js?",
            options: ["npm", "pip", "composer", "gradle"],
            answer: "npm",
        },
        {
            question: "What does npm stand for?",
            options: ["Node Package Manager", "Node Programming Method", "New Project Manager", "Node Process Manager"],
            answer: "Node Package Manager",
        },
    ],
    MongoDB: [
        {
            question: "MongoDB is what type of database?",
            options: ["NoSQL", "Relational", "Graph only", "File system"],
            answer: "NoSQL",
        },
        {
            question: "MongoDB stores data primarily as?",
            options: ["Documents", "Rows", "Tables", "Sheets"],
            answer: "Documents",
        },
        {
            question: "Which format is commonly associated with MongoDB documents?",
            options: ["BSON", "HTML", "CSS", "CSV"],
            answer: "BSON",
        },
        {
            question: "Which ODM is commonly used with Node.js and MongoDB?",
            options: ["Mongoose", "Sequelize", "PrismaSQL", "Hibernate"],
            answer: "Mongoose",
        },
        {
            question: "Which operation creates a document?",
            options: ["insert", "delete", "drop", "remove"],
            answer: "insert",
        },
    ],
    SQL: [
        {
            question: "Which SQL statement is used to retrieve data from a database?",
            options: ["SELECT", "GET", "FETCH", "READ"],
            answer: "SELECT",
        },
        {
            question: "Which SQL clause is used to filter rows?",
            options: ["WHERE", "FILTER", "HAVING", "SEARCH"],
            answer: "WHERE",
        },
        {
            question: "Which function calculates the average of a numeric column?",
            options: ["AVG()", "MEAN()", "AVERAGE()", "MID()"],
            answer: "AVG()",
        },
        {
            question: "Which SQL clause is used to group rows for aggregate calculations?",
            options: ["GROUP BY", "ORDER BY", "COLLECT BY", "SORT BY"],
            answer: "GROUP BY",
        },
        {
            question: "Which SQL keyword sorts query results?",
            options: ["ORDER BY", "SORT", "GROUP BY", "ARRANGE"],
            answer: "ORDER BY",
        },
        {
            question: "Which function counts rows in SQL?",
            options: ["COUNT()", "TOTAL()", "NUMBER()", "ROWS()"],
            answer: "COUNT()",
        },
        {
            question: "Which clause is commonly used to filter grouped results?",
            options: ["HAVING", "WHERE", "GROUP", "FILTER"],
            answer: "HAVING",
        },
        {
            question: "Which SQL operation combines rows from related tables?",
            options: ["JOIN", "MERGE TABLE", "CONNECT", "LINK"],
            answer: "JOIN",
        },
    ],
    default: [
        {
            question: "What is the primary purpose of this course?",
            options: ["Develop professional skills", "Only entertainment", "Operating a printer", "Managing hardware"],
            answer: "Develop professional skills",
        },
        {
            question: "What should you do when learning a new skill?",
            options: ["Practice regularly", "Never practice", "Skip fundamentals", "Avoid projects"],
            answer: "Practice regularly",
        },
        {
            question: "Which approach improves technical learning?",
            options: ["Build projects", "Only read titles", "Avoid exercises", "Skip testing"],
            answer: "Build projects",
        },
        {
            question: "What helps measure learning progress?",
            options: ["Assessments", "Random guessing", "Ignoring results", "Skipping practice"],
            answer: "Assessments",
        },
        {
            question: "What is important for career growth?",
            options: ["Continuous learning", "Avoiding new skills", "Never practicing", "Ignoring feedback"],
            answer: "Continuous learning",
        },
    ],
};

export default function CourseAssessmentPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const career = searchParams.get("career") || "Your Career";
    const course = searchParams.get("course") || "Course";
    const skill = searchParams.get("skill") || "";
    const platform = searchParams.get("platform") || "Learning Platform";

    const questions = useMemo(() => {
        const normalizedSkill = skill.toLowerCase();
        const normalizedCourse = course.toLowerCase();

        if (normalizedSkill.includes("sql") || normalizedCourse.includes("sql")) {
            return questionBank.SQL;
        }
        if (
            normalizedSkill.includes("javascript") ||
            normalizedSkill.includes("js") ||
            normalizedCourse.includes("javascript")
        ) {
            return questionBank.JavaScript;
        }
        if (normalizedSkill.includes("react") || normalizedCourse.includes("react")) {
            return questionBank.React;
        }
        if (
            normalizedSkill.includes("node") ||
            normalizedSkill.includes("express") ||
            normalizedCourse.includes("node")
        ) {
            return questionBank.Node;
        }
        if (normalizedSkill.includes("mongo") || normalizedCourse.includes("mongo")) {
            return questionBank.MongoDB;
        }

        return questionBank.default;
    }, [course, skill]);

    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [result, setResult] = useState(null);

    const question = questions[currentQuestion];

    const selectAnswer = (answer) => {
        if (submitted) return;
        setAnswers((previous) => ({
            ...previous,
            [currentQuestion]: answer,
        }));
    };

    const saveProgress = async (percentage, passed) => {
        try {
            setSaving(true);
            const response = await api.post("/progress", {
                career,
                course,
                skill,
                platform,
                overallProgress: percentage,
                completedModules: passed ? 1 : 0,
                totalModules: 1,
                skills: [
                    {
                        name: skill || course,
                        progress: percentage,
                        completed: passed,
                    },
                ],
                completedItems: passed ? [course] : [],
            });

            console.log("PROGRESS UPDATED:", response.data);
        } catch (error) {
            console.error(
                "Progress update error:",
                error.response?.data || error.message || error
            );
        } finally {
            setSaving(false);
        }
    };

    const calculateResult = async () => {
        if (Object.keys(answers).length !== questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let correct = 0;
        questions.forEach((item, index) => {
            if (answers[index] === item.answer) {
                correct++;
            }
        });

        const percentage = Math.round((correct / questions.length) * 100);
        const passed = percentage >= 60;

        setResult({
            correct,
            total: questions.length,
            percentage,
            passed,
        });

        setSubmitted(true);
        await saveProgress(percentage, passed);
    };

    if (!question) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#080b14] text-white">
                <p className="text-slate-400">No questions available.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#080b14] text-white">
            {/* HEADER */}
            <header className="border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-5">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <span className="font-bold">
                        Course <span className="text-violet-400">Assessment</span>
                    </span>
                    <div className="text-xs text-slate-500">
                        {currentQuestion + 1} / {questions.length}
                    </div>
                </div>
            </header>

            {/* CONTENT */}
            <div className="mx-auto max-w-3xl px-5 py-10">
                {!submitted ? (
                    <>
                        {/* COURSE INFO */}
                        <div className="mb-8">
                            <p className="text-xs uppercase tracking-[0.18em] text-violet-400">
                                Skill Assessment
                            </p>
                            <h1 className="mt-3 text-3xl font-bold">{course}</h1>
                            <p className="mt-2 text-sm text-slate-500">
                                {skill && <>Skill: {skill} {" • "} </>}
                                {platform}
                            </p>
                            <p className="mt-3 text-sm text-slate-500">
                                Career Goal:{" "}
                                <span className="text-violet-300">{career}</span>
                            </p>
                        </div>

                        {/* PROGRESS BAR */}
                        <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/[0.05]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
                                style={{
                                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                                }}
                            />
                        </div>

                        {/* QUESTION CONTAINER */}
                        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8">
                            <p className="text-xs text-slate-600">
                                Question {currentQuestion + 1}
                            </p>
                            <h2 className="mt-4 text-xl font-semibold leading-8">
                                {question.question}
                            </h2>

                            {/* OPTIONS */}
                            <div className="mt-7 space-y-3">
                                {question.options.map((option) => {
                                    const selected = answers[currentQuestion] === option;
                                    return (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => selectAnswer(option)}
                                            className={`w-full rounded-2xl border p-4 text-left text-sm transition ${selected
                                                ? "border-violet-400/40 bg-violet-500/10 text-violet-200"
                                                : "border-white/5 bg-white/[0.02] text-slate-400 hover:border-violet-400/20 hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* NAVIGATION */}
                            <div className="mt-8 flex justify-between gap-3">
                                <button
                                    type="button"
                                    disabled={currentQuestion === 0}
                                    onClick={() => setCurrentQuestion((prev) => prev - 1)}
                                    className="rounded-xl border border-white/5 px-5 py-3 text-xs text-slate-400 transition hover:bg-white/[0.03] disabled:opacity-30"
                                >
                                    Previous
                                </button>

                                {currentQuestion < questions.length - 1 ? (
                                    <button
                                        type="button"
                                        disabled={!answers[currentQuestion]}
                                        onClick={() => setCurrentQuestion((prev) => prev + 1)}
                                        className="rounded-xl bg-violet-500 px-6 py-3 text-xs font-semibold text-white transition hover:bg-violet-400 disabled:opacity-30"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={!answers[currentQuestion] || saving}
                                        onClick={calculateResult}
                                        className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-30"
                                    >
                                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                                        Submit Assessment
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    /* RESULT SCREEN */
                    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-center">
                        {result.passed ? (
                            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-400" />
                        ) : (
                            <XCircle className="mx-auto h-16 w-16 text-red-400" />
                        )}

                        <h1 className="mt-6 text-3xl font-bold">
                            {result.passed ? "Assessment Passed!" : "Assessment Failed"}
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            {result.passed
                                ? "Great job! Your progress has been updated."
                                : "You scored below 60%. Review the module material and try again."}
                        </p>

                        <div className="my-8 flex justify-center gap-6">
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4">
                                <span className="block text-2xl font-bold text-violet-400">
                                    {result.percentage}%
                                </span>
                                <span className="text-xs text-slate-500">Final Score</span>
                            </div>
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4">
                                <span className="block text-2xl font-bold text-white">
                                    {result.correct} / {result.total}
                                </span>
                                <span className="text-xs text-slate-500">Correct Answers</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                router.push("/dashboardpage"); // or your exact dashboard route path (e.g., '/progress' or '/dashboard')
                                router.refresh(); // <-- Clears Next.js router cache & re-fetches server data
                            }}
                            className="rounded-xl bg-violet-500 px-8 py-3 text-xs font-semibold text-white transition hover:bg-violet-400"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}