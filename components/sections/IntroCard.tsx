'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface TestimonialData {
  id: number;
  profileImage: string;
  testimonial: string;
  name: string;
  additionalText: string;
}

const IntroCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: TestimonialData[] = [
    {
      id: 1,
      profileImage: '/img/vaughnick_A_jubilent_cartoon_cat_jumpy_for_joy_where_tons_and_a2f81452-6ed9-421d-b361-3f8545330a80_2 1.png',
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit es",
      name: "Vanessa",
      additionalText: "Lorem ipsum dolor sit amet, conse"
    },
    {
      id: 2,
      profileImage: '/img/vaughnick_A_jubilent_cartoon_cat_jumpy_for_joy_where_tons_and_a2f81452-6ed9-421d-b361-3f8545330a80_2 1.png',
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      name: "Amy",
      additionalText: "Lorem ipsum dolor sit amet, cons"
    },
    {
      id: 3,
      profileImage: '/img/vaughnick_A_jubilent_cartoon_cat_jumpy_for_joy_where_tons_and_a2f81452-6ed9-421d-b361-3f8545330a80_2 1.png',
      testimonial: "\"I did a few verification checks and they tested my ability, now I am able to find people a partner for life. I always loved hooking my friends up... now I can do it for money. Truly a case of finding my calling! No but the extra money is really well received by my family, plus working from home allows me to take better care them.\"",
      name: "Frank",
      additionalText: "Lorem ipsum dolor sit amet, con"
    }
  ];

  // Auto-cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-[#29252D] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-[#3A3540] rounded-lg p-6 transition-all duration-500 ${
                index === currentIndex ? 'scale-105 shadow-2xl' : 'scale-100 opacity-80'
              }`}
            >
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-600">
                  <Image
                    src={testimonial.profileImage}
                    alt={`${testimonial.name}'s profile`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="text-white mb-6">
                <p className="text-sm leading-relaxed text-left">
                  {testimonial.testimonial}
                </p>
              </div>

              {/* Name */}
              <div className="text-center mb-2">
                <h3 className="text-white font-semibold text-lg">
                  {testimonial.name}
                </h3>
              </div>

              {/* Additional Text */}
              <div className="text-center">
                <p className="text-gray-300 text-xs">
                  {testimonial.additionalText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-gray-500 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroCard;
