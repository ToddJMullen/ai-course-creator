"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";

function CourseStart({ params }) {
  const courseId = use(params)?.courseId;
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();

  console.log({ courseId });

  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.courseId, courseId));
    console.log("GetCourse/result/", result[0]);
    setCourse(result[0]);
  };
  return (
    <div>
      {/* sidebard */}
      <div className="hidden md:block md:w-64 h-screen  border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-4 text-white">
          {course?.courseOutput?.course?.name}
        </h2>
        <div>
          {course?.courseOutput?.course?.chapters?.map((chapter, idx) => (
            <div
              key={idx}
              className={`cursor-pointer hover:bg-purple-50 ${
                selectedChapter?.name === chapter?.name && "bg-purple-100"
              }`}
              onClick={() => setSelectedChapter(chapter)}
            >
              <ChapterListCard chapter={chapter} index={idx + 1} />
            </div>
          ))}
        </div>
      </div>
      {/* content */}
      <div className="md:ml-64">content</div>
    </div>
  );
}

export default CourseStart;
