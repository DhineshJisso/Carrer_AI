"use client";

import CourseCard from "./CoursesCard";

export default function CourseGrid({
    courses = [],
    career = "",
}) {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course, index) => (
                <CourseCard
                    key={course.slug || `${course.title}-${index}`}
                    course={course}
                    career={career}
                />
            ))}
        </div>
    );
}