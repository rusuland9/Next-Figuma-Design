"use client";
import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import type { Section } from "@/interfaces/section.interface";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface TickerProps {
  section: Extract<Section, { __component: "sections.ticker" }> & {
    speed?: number;
  };
}

export default function Ticker({ section }: TickerProps) {
  const [tickerWidth, setTickerWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const lastTimeRef = useRef<number>(0);
  const isAnimatingRef = useRef(false);

  // Get speed from Strapi or use default value (pixels per second)
  const speed = (section.speed || 1) * 20; // Convert to pixels per second

  // Define the text items you specified
  const textItems = [
    {
      id: "1",
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  3.  Learn More"
    },
    {
      id: "2", 
      name: "Lorem Ipsum 1.  Learn More"
    },
    {
      id: "3",
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et  2.  Learn More"
    }
  ];

  // Create multiple copies for seamless infinite scroll
  const multipleItems = [...textItems, ...textItems, ...textItems, ...textItems];

  // Track if ticker is in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Calculate and set ticker dimensions
  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current) {
        // Get width of one complete set
        const itemsWidth = contentRef.current.scrollWidth / 4;
        setTickerWidth(itemsWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [textItems]);

  // Initialize starting position
  useEffect(() => {
    if (tickerWidth > 0 && currentPosition === 0) {
      setCurrentPosition(-tickerWidth); // Start from left side
    }
  }, [currentPosition, tickerWidth]);

  // Continuous animation function
  const animate = useCallback((timestamp: number) => {
    if (!isAnimatingRef.current) return;

    if (lastTimeRef.current === 0) {
      lastTimeRef.current = timestamp;
    }

    const deltaTime = (timestamp - lastTimeRef.current) / 1000; // Convert to seconds
    const movement = speed * deltaTime;

    setCurrentPosition((prevPosition) => {
      let newPosition = prevPosition + movement; // Move right (+ instead of -)

      // Reset position when one complete set has passed
      if (newPosition >= 0) {
        newPosition = newPosition - tickerWidth;
      }

      return newPosition;
    });

    lastTimeRef.current = timestamp;
    animationRef.current = requestAnimationFrame(animate);
  }, [speed, tickerWidth]);

  // Handle animation start/pause based on visibility
  useEffect(() => {
    if (tickerWidth === 0) return;

    if (inView) {
      // Start or resume animation
      isAnimatingRef.current = true;
      lastTimeRef.current = 0; // Reset timer to avoid jumps
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Pause animation
      isAnimatingRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, tickerWidth, speed, animate]);

  // Update transform when position changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${currentPosition}px)`;
    }
  }, [currentPosition]);

  useEffect(() => {
    return () => {
      isAnimatingRef.current = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden py-2 bg-[#454545]"
      aria-label="Ticker showcase"
    >
      <div ref={inViewRef} className="relative max-w-screen-2xl mx-auto">
        <div
          ref={contentRef}
          className="flex items-center whitespace-nowrap will-change-transform"
          style={{
            transform: `translateX(${currentPosition}px)`,
          }}
        >
          {multipleItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group mx-3 flex-shrink-0 flex items-center"
              role="listitem"
            >
              <span className="text-xs font-medium text-white dark:text-white">
                {item.name.split('Learn More').map((part, idx, array) => (
                  <React.Fragment key={idx}>
                    {part}
                    {idx < array.length - 1 && (
                      <a
                        href="#"
                        className="text-[#FE3C72] underline font-semibold ml-1"
                        style={{ textShadow: '0 0 6px #FE3C72' }}
                        onClick={e => {
                          e.preventDefault();
                          // Add your link action here
                          console.log('Learn More clicked for item:', item.id);
                        }}
                      >
                        Learn More
                      </a>
                    )}
                  </React.Fragment>
                ))}
                  </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}