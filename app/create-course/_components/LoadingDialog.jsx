import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function LoadingDialog({ loading }) {
  const loaders = [
    <Image src={"/loader.gif"} width={100} height={100} alt="Loading..." />,
    <Image src={"/ai-loader.gif"} width={100} height={100} alt="Loading..." />,
    <Image
      src={"/list-loader.gif"}
      width={100}
      height={100}
      alt="Loading..."
    />,
  ];

  const loader = loaders[Math.floor(Math.random() * loaders.length)];

  return (
    <AlertDialog open={loading}>
      <AlertDialogTitle className="hidden">Loading...</AlertDialogTitle>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <span className="flex flex-col items-center py-10">
              {loader}
              <h2>Please wait... Ai Working on your course</h2>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
