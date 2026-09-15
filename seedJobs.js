// seedJobs.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Job = require("../Backend/Models/JobModel");

dotenv.config();

const dummyJobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    requiredSkills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
    career: "Frontend Engineer",
    experienceLevel: "Entry Level",
    salaryRange: "$60,000 - $80,000",
    applyUrl: "https://example.com/apply/1",
  },
  {
    title: "React Next.js Engineer",
    company: "WebFlow Inc",
    location: "Bengaluru, India",
    requiredSkills: ["React", "Next.js", "TypeScript", "Tailwind"],
    career: "Frontend Engineer",
    experienceLevel: "Mid Level",
    salaryRange: "₹12 - ₹18 LPA",
    applyUrl: "https://example.com/apply/2",
  },
  {
    title: "Backend Node.js Developer",
    company: "DataNode",
    location: "Remote",
    requiredSkills: ["Node.js", "Express", "MongoDB", "REST API", "JavaScript"],
    career: "Backend Engineer",
    experienceLevel: "Entry Level",
    salaryRange: "$65,000 - $85,000",
    applyUrl: "https://example.com/apply/3",
  },
  {
    title: "Full Stack MERN Developer",
    company: "CloudScale",
    location: "Hybrid (Chennai)",
    requiredSkills: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind"],
    career: "Full Stack Engineer",
    experienceLevel: "Entry Level",
    salaryRange: "₹8 - ₹14 LPA",
    applyUrl: "https://example.com/apply/4",
  },
  {
    title: "UI/UX Front-End Developer",
    company: "Designify",
    location: "Remote",
    requiredSkills: ["HTML", "CSS", "JavaScript", "Figma", "Tailwind"],
    career: "Frontend Engineer",
    experienceLevel: "Entry Level",
    salaryRange: "$50,000 - $70,000",
    applyUrl: "https://example.com/apply/5",
  },
  {
    title: "Python Backend Engineer",
    company: "PyLogic",
    location: "Remote",
    requiredSkills: ["Python", "Django", "PostgreSQL", "REST API"],
    career: "Backend Engineer",
    experienceLevel: "Mid Level",
    salaryRange: "$75,000 - $95,000",
    applyUrl: "https://example.com/apply/6",
  },
  {
    title: "Junior Software Engineer",
    company: "AppInnovate",
    location: "Chennai, India",
    requiredSkills: ["JavaScript", "HTML", "CSS", "Git"],
    career: "Software Engineer",
    experienceLevel: "Entry Level",
    salaryRange: "₹5 - ₹8 LPA",
    applyUrl: "https://example.com/apply/7",
  },
  {
    title: "DevOps & Cloud Associate",
    company: "OpsCloud",
    location: "Remote",
    requiredSkills: ["Docker", "AWS", "Linux", "CI/CD"],
    career: "DevOps Engineer",
    experienceLevel: "Entry Level",
    salaryRange: "$70,000 - $90,000",
    applyUrl: "https://example.com/apply/8",
  },
  {
    title: "Database Administrator",
    company: "DBMasters",
    location: "Hyderabad, India",
    requiredSkills: ["MongoDB", "SQL", "PostgreSQL", "Node.js"],
    career: "Database Engineer",
    experienceLevel: "Mid Level",
    salaryRange: "₹10 - ₹15 LPA",
    applyUrl: "https://example.com/apply/9",
  },
  {
    title: "TypeScript API Developer",
    company: "APIFlow",
    location: "Remote",
    requiredSkills: ["TypeScript", "Node.js", "Express", "GraphQL"],
    career: "Backend Engineer",
    experienceLevel: "Mid Level",
    salaryRange: "$80,000 - $100,000",
    applyUrl: "https://example.com/apply/10",
  },
];

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.DB_URL);
    console.log("MongoDB Connected...");
    await Job.deleteMany();
    await Job.insertMany(dummyJobs);
    console.log("10 Dummy Jobs Inserted Successfully!");
    process.exit();
  } catch (error) {
    console.error("Error Seeding Jobs:", error);
    process.exit(1);
  }
};

seedJobs();