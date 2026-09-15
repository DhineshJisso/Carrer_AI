"use client";

import { useEffect } from "react";

const skills = [
  "JavaScript",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Python",
  "Java",
  "C++",
  "HTML/CSS",
  "SQL",
  "UI/UX Design",
  "Data Analysis",
  "Machine Learning",
  "Communication",
  "Leadership",
];

export default function SkillSelector({
  selectedSkills = [],
  setSelectedSkills,
}) {
  useEffect(() => {
    // URL: /assessmentpage#skills
    if (window.location.hash === "#skills") {
      // Component render ஆன பிறகு Skills section-ku scroll ஆகும்
      setTimeout(() => {
        document.getElementById("skills")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }
  }, []);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(
        selectedSkills.filter((item) => item !== skill)
      );
    } else {
      setSelectedSkills([
        ...selectedSkills,
        skill,
      ]);
    }
  };

  return (
    <div
      id="skills"
      className="scroll-mt-24"
    >
      <p className="mb-4 text-xs text-slate-500">
        Select all the skills you currently have.
      </p>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => {
          const selected =
            selectedSkills.includes(skill);

          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggleSkill(skill)}
              className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                selected
                  ? "border-violet-400/40 bg-violet-500/15 text-violet-300"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {skill}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-slate-600">
        {selectedSkills.length} skills selected
      </p>
    </div>
  );
}