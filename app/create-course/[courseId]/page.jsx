"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import LoadingDialog from "../_components/LoadingDialog";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";

function CourseLayout({ params }) {
  const { user } = useUser();
  const courseId = use(params).courseId;
  const [course, setCourse] = useState();

  useEffect(() => {
    console.log({ courseId });
    courseId && user && GetCourse();
  }, [courseId, user]);

  const GetCourse = async () => {
    console.log("GetCourse/", { courseId, user });
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    console.log("GetCourse/result/", { course: result[0] });
    setCourse(result[0]);
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* <LoadingDialog loading={loading} /> */}
      {/* Basic Info  */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* Course Detail  */}
      <CourseDetail course={course} />
      {/* List of Lesson  */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      {/* <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content
      </Button> */}
    </div>
  );
}

export default CourseLayout;
