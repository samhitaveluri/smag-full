"use client";

import Link from "next/link";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";

export default function Nav() {
  const [content, setContent] = useState("SALES");

  return (
    <div className="absolute top-0 p-10 px-16 w-full font-teko flex justify-between">
      <Link href="/">
        <span className="text-7xl">SMAG</span>
      </Link>
      <div className="flex gap-4 text-lg items-center">
        <span>SALES</span>
        <Divider orientation="vertical" className="h-4 self-center" />
        <span>MARKETING</span>
        <Divider orientation="vertical" className="h-4 self-center" />
        <span>ANALYTICS</span>
        <Divider orientation="vertical" className="h-4 self-center" />
        <span>GROWTH</span>
      </div>
    </div>
  );
}
