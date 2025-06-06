"use client";
import { db } from "@/configs/db";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";

function FinishScreen({ params }) {
  const router = useRouter();
  const { user } = useUser();
  const courseId = use(params).courseId;
  const [course, setCourse] = useState();
  // const [loading, setLoading] = useState(false);

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

  const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`;

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7">
      <h2 className="text-center font-bold text-2xl my-3 text-primary">
        Congrats! Your course is ready!
      </h2>
      <CourseBasicInfo course={course} refreshData={() => {}} />
      <h2 className="mt-5">Course URL:</h2>
      <h2 className="text-center text-gray-400 border p-2 rounded-md flex gap-5">
        {url}
        <HiOutlineClipboardDocumentCheck
          className="h-5 w-5"
          onClick={async () => await navigator.clipboard.writeText(url)}
        />
      </h2>
    </div>
  );
}

export default FinishScreen;
