import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md ">
      <Link href={"/dashboard"}>
        <Image src={"/logo.svg"} width={150} height={100} />
      </Link>
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
