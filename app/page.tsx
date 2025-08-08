// app/page.tsx
import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomePageData, getPageMetadata } from "@/controllers/pageController";
import HomeLayout from "@/components/layouts/HomeLayout";

// Generate metadata for the home page
export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata("home-page");
  return metadata;
}

// Default function for the home page
export default async function Home() {
  // Fetch the home page data using the controller
  const page = await getHomePageData();
  // If home page is not found, return 404
  if (!page) {
    notFound();
  }

  return (
    <div className="mx-auto dark:bg-zinc-900 ">
      <HomeLayout page={page} />
    </div>
  );
}

// Enable ISR with a revalidation period
export const revalidate = 60;
