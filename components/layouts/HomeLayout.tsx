"use client";
import type { PageData } from "@/interfaces/page.interface";
import type { Section } from "@/interfaces/section.interface";

import CallToAction from "../sections/CallToAction";
import HeroSection from "../sections/HeroSection";
import IntroCard from "../sections/IntroCard";
import TextImageSection from "../sections/TextImageSection";
import Ticker from "../sections/Ticker";

interface HomeLayoutProps {
  page: PageData;
}

const sectionStyles = {
  background: (component: Section["__component"], index: number): string =>
    component === "sections.ticker"
      ? ""
      : "bg-[#29252D]",

  container: "max-w-7xl",
};

const imageUrl1 = `http://localhost:1337/uploads/large_0_0_24_38387b799e.png`;
const imageUrl2 = `http://localhost:1337/uploads/image_8f72fcb3ec.png`;


export default function HomeLayout({ page }: HomeLayoutProps) {
  const { sections } = page;
  const renderSection = (section: Section, index: number) => {
    const key = section.id;
    switch (section.__component) {
      case "sections.hero":
        return (
          <HeroSection key={key} section={section} userType={page.pageType} />
        );
      case "sections.text-image":
        return (
          <div>
            <div className="mb-2">
              <p className="text-white text-sm font-bold mb-4">ELEVATOR PITCH</p>
              <p className="text-white text-xl leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation
              </p>
            </div>
            <TextImageSection
              key={key}
              section={
                section as Extract<
                  Section,
                  { __component: "sections.text-image" }
                >
              }
              imageUrl={imageUrl1}

            />

            <TextImageSection
              key={key}
              section={
                { ...section, reversed: index % 2 === 1 } as Extract<
                  Section,
                  { __component: "sections.text-image" }
                >
              }
              imageUrl={index === 0 ? imageUrl1 : imageUrl2}
            />

            <IntroCard/>
          </div>
        );

      case "sections.call-to-action":
        return <CallToAction key={key} section={section} />;
      case "sections.ticker":
        return (
          <Ticker
            key={key}
            section={
              section as Extract<Section, { __component: "sections.ticker" }>
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {sections.map((section, index) => {
        const { __component, id } = section;
        const isTicker = __component === "sections.ticker";
        const bgClass = sectionStyles.background(__component, index);

        return (
          <section key={id} className={`w-full ${bgClass}`}>
            {isTicker ? (
              renderSection(section, index)
            ) : (
              <div
                className={`mx-auto px-4 sm:px-6 lg:px-16 xl:px-20 ${sectionStyles.container}`}
              >
                {renderSection(section, index)}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
