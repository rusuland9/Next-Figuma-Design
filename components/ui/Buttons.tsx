// components/ui/Buttons.tsx
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'text';
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
}

export const Button = ({
  type = 'primary',
  href,
  onClick,
  children,
  className = "",
  showArrow = false,
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center px-6 py-1.5 rounded-full font-bold transition-all duration-300
    relative overflow-hidden whitespace-nowrap
  `;

  const primaryClasses = `
    ${baseClasses}
    bg-gray-800 hover:bg-gray-700 text-white
    font-[var(--font-calistoga)] font-normal text-[16.33px] leading-[160%] text-center
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.2)]
    hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_6px_12px_rgba(0,0,0,0.3)]
    [text-shadow:0_0_13.67px_rgba(254,60,114,0.8),0_0_13.67px_rgba(254,60,114,0.8)]
    hover:[text-shadow:0_0_15px_rgba(254,60,114,1),0_0_15px_rgba(254,60,114,1)]
  `;

  const secondaryClasses = `
    ${baseClasses}
    bg-gray-800 hover:bg-gray-700 text-pink-400
    font-[var(--font-calistoga)] font-normal text-[16.33px] leading-[160%] text-center
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.2)]
    hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),0_6px_12px_rgba(0,0,0,0.3)]
    [text-shadow:0_0_13.67px_rgba(254,60,114,0.8),0_0_13.67px_rgba(254,60,114,0.8)]
    hover:[text-shadow:0_0_15px_rgba(254,60,114,1),0_0_15px_rgba(254,60,114,1)]
  `;

  const textClasses = `
    inline-flex items-center justify-center font-medium text-white dark:text-white 
    hover:text-gray-200 dark:hover:text-gray-200 hover:underline text-base transition-all duration-300
    whitespace-nowrap
  `;

  const buttonClasses = type === 'primary' ? primaryClasses : type === 'secondary' ? secondaryClasses : textClasses;

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${buttonClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClasses} ${className}`}
    >
      {content}
    </button>
  );
};

// Legacy components for backward compatibility
interface GlobalButtonProps {
  text?: string;
  href: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  showArrow?: boolean;
}

export const PrimaryButton = ({
  text,
  href,
  className = "",
  onClick,
}: GlobalButtonProps) => {
  return (
    <Button type="primary" href={href} onClick={onClick} className={className}>
      {text}
    </Button>
  );
};

export const SecondaryButton = ({
  text,
  href,
  className = "",
  onClick,
  children,
  showArrow = false,
}: GlobalButtonProps) => {
  return (
    <Button type="secondary" href={href} onClick={onClick} className={className} showArrow={showArrow}>
      {children || text}
    </Button>
  );
};

export function TextButton({ href, text, className = "" }: GlobalButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-medium text-[#FF00BF] dark:text-[#FFFFFF] hover:text-[#D900A6] dark:hover:text-[#FF33CC] hover:underline text-base ${className}`}
    >
      {text}
    </Link>
  );
}
