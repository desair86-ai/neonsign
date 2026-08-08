"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonParticlesProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  href?: string;
  icon?: React.ReactNode;
}

export function ButtonParticles({
  label = "Explore",
  href,
  className,
  icon = <ArrowUpRight className="w-5 h-5 transition-colors duration-300" />,
  ...props
}: ButtonParticlesProps) {
  
  const wrapperClasses = cn(
    "relative inline-flex items-center justify-center rounded-full transition-all duration-300",
    "bg-gradient-to-r from-[#752eff] to-[#6eff86]",
    "hover:from-[#6eff86] hover:to-[#752eff]",
    "text-white shadow-md hover:shadow-lg",
    className
  );

  const innerContent = (
    <div className="relative z-20 flex h-full w-full items-center justify-center gap-2 px-8 py-3.5">
      <span className="font-bold text-lg drop-shadow-md">{label}</span>
      {icon}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClasses} {...(props as any)}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={wrapperClasses} {...props}>
      {innerContent}
    </button>
  );
}
