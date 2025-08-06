"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "@/interfaces/section.interface";
import { Button } from "../ui/Buttons";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  section: Extract<Section, { __component: "sections.hero" }>;
  userType?: string;
}

export default function HeroSection({ section, userType }: HeroSectionProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const showExtraInput = userType === "userType1";

  return (
    <section className="w-full bg-white dark:bg-[#29252D] py-16 px-4 md:px-6">
      <div className="max-w-7xl w-full h-full flex flex-col md:flex-row items-center justify-center gap-16 mx-auto">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative w-full h-64 md:h-80 lg:h-96 max-w-lg overflow-hidden bg-gray-200 dark:bg-[#29252D]">
            <Image
              src="/img/0_0 26.png"
              alt={section.title || "Hero Image"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center h-full text-center">
          {/* Heading */}
          <div className="mb-6">
            <div className="text-lg md:text-xl font-normal text-white mb-1 font-[var(--font-calistoga)] opacity-90">
              Lorem Ipsum
            </div>
            <div className="text-4xl md:text-6xl font-bold text-white font-[var(--font-calistoga)] leading-tight">
              Lorem Ipsum<br />Dolor
            </div>
          </div>

          {/* Subtitle with arrow */}
          <div className="flex items-center justify-center text-xs md:text-sm text-white mb-6 font-normal opacity-90">
            Notice our Mission – Philosophy – and Cause is central
            <ArrowRight className="ml-2 w-4 h-4 text-white opacity-80" />
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-4 justify-center">
            <Button type="primary">Apply to Match</Button>
            <Button type="secondary">Get Matched</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
