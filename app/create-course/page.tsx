"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import LoadingDialog from "./_components/LoadingDialog";
import { UserInputContext } from "../_context/UserInputContext";

function CreateCourse() {
  const StepperOptions = [
    { id: 1, name: "Category", icon: <HiMiniSquares2X2 /> },
    { id: 2, name: "Topic & Desc", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("userCourseInput changed/", userCourseInput);
  }, [userCourseInput]);

  return (
    <div>
      {/* stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, idx) => (
            <div className="flex items-center" key={idx}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px] ">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= idx && "bg-primary"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {idx !== StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] lg:w-[170px] rounded-full bg-gray-300 ${
                    activeIndex - 1 >= idx && "bg-primary"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44">
        {/* Components */}
        {activeIndex === 0 && <SelectCategory />}
        {activeIndex === 1 && <TopicDescription />}
        {activeIndex === 2 && <SelectOption />}
        <LoadingDialog loading={false} />
        {/* next/previous */}
        <div className="flex justify-between mt-10">
          <Button
            className=""
            size="default"
            variant="outline"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < StepperOptions.length - 1 && (
            <Button
              className=""
              size="default"
              variant="default"
              disabled={activeIndex === StepperOptions.length - 1}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex == StepperOptions.length - 1 && (
            <Button
              className=""
              size="default"
              variant="default"
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
