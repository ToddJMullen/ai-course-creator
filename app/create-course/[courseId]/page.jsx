"use client";
import { db } from "@/configs/db";
import { getVideos } from "@/configs/service";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import LoadingDialog from "../_components/LoadingDialog";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const router = useRouter();
  const { user } = useUser();
  const courseId = use(params).courseId;
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log({ courseId });
    courseId && user && GetCourses();
  }, [courseId, user]);

  const GetCourses = async () => {
    console.log("GetCourses/", { courseId, user });
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

  const GenerateChapterContent = async () => {
    console.log("GenerateChapterContent/");
    setLoading(true);
    const chapters = course.courseOutput?.course?.chapters;
    chapters.forEach(async (chapter, idx) => {
      // if (idx < 3) {
      const PROMPT =
        "Explain the concept in Detail on Topic:" +
        course?.name + // user given
        ", Chapter:" +
        chapter?.name + // ai created
        ", in JSON Format with list of array with field as title, description in detail, Code Example(Code field in <precode> format) if applicable";
      console.log(PROMPT);
      try {
        let videoId = "";

        getVideos(course?.name + ":" + chapter?.name)
          .then((resp) => {
            console.log("getVideos/resp", resp);
            videoId = resp[0]?.id?.videoId;
          })
          .catch((err) => {
            console.error("getVideos/err", err);
          });

        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const str = result?.response?.text();
        const json = JSON.parse(str);
        await db.insert(Chapters).values({
          chapterId: idx,
          courseId: course?.courseId,
          content: json,
          videoId,
        });

        // console.log("GenerateChapterContent/result/", { json });
        setLoading(false);
      } catch (error) {
        console.error("getVideos/error", error);
        setLoading(false);
      }
      // }
    });

    await db.update(CourseList).set({
      publish: true,
    });
    router.replace("/create-course/" + course?.courseId + "/finish");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialog loading={loading} />
      {/* Basic Info  */}
      <CourseBasicInfo course={course} refreshData={() => GetCourses()} />
      {/* Course Detail  */}
      <CourseDetail course={course} />
      {/* List of Lesson  */}
      <ChapterList course={course} refreshData={() => GetCourses()} />

      <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
