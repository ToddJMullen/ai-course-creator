"use client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { Chapters, CourseList } from "@/configs/schema";
import { use, useEffect, useState } from "react";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import Header from "@/app/dashboard/_components/Header";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";

function Course({ params }) {
  const courseId = use(params)?.courseId;
  const [course, setCourse] = useState();

  useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, courseId));
    console.log("course/", result);
    setCourse(result[0]);
  };

  return (
    <div>
      <Header />
      <div className="px-10 p-10 md:px-20 lg:px-44">
        <CourseBasicInfo course={course} edit={false} />
        {/* </div>
      <div className="px-10 p-10 md:px-20 lg:px-44"> */}
        <CourseDetail course={course} />
        {/* </div>
      <div className="px-10 p-10 md:px-20 lg:px-44"> */}
        <ChapterList course={course} edit={false} />
      </div>
    </div>
  );
}

export default Course;
