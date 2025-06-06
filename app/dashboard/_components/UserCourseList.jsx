"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    user && getUserCourse();
  }, [user]);

  const getUserCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress));
    console.log("courses/", result);
    setCourseList(result);
  };
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl ">My AI Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList.map((course, idx) => (
              <CourseCard
                course={course}
                key={idx}
                refreshData={() => getUserCourse()}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, idx) => (
              <div
                key={idx}
                className=" mt-5 w-full bg-slate-200 animate-pulse rounded-lg h-[270px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
