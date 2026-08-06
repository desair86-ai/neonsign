import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    href?: string;
}

export function ButtonColorful({
    className,
    label = "Explore",
    href,
    ...props
}: ButtonColorfulProps) {
    const innerContent = (
        <>
            {/* Base Background */}
            <div className="absolute inset-0 bg-zinc-950 z-0 transition-colors duration-300" />
            
            {/* Gradient background effect (Before Hover: #6eff86 , #752eff) */}
            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "bg-gradient-to-r from-[#6eff86] to-[#752eff]",
                    "opacity-50 group-hover:opacity-0",
                    "blur-md transition-opacity duration-500"
                )}
            />

            {/* Gradient background effect (After Hover: #bca9ff , #ffffff) */}
            <div
                className={cn(
                    "absolute inset-0 z-0",
                    "bg-gradient-to-r from-[#bca9ff] to-[#ffffff]",
                    "opacity-0 group-hover:opacity-80",
                    "blur-md transition-opacity duration-500"
                )}
            />

            {/* Border to define shape */}
            <div className="absolute inset-0 z-10 border border-white/20 group-hover:border-white/40 rounded-full transition-colors duration-500" />

            {/* Content */}
            <div className="relative z-20 flex items-center justify-center gap-2">
                <span className="text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-black group-hover:drop-shadow-none transition-colors duration-300">{label}</span>
                <ArrowUpRight className="w-5 h-5 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] group-hover:text-black group-hover:drop-shadow-none transition-colors duration-300" />
            </div>
        </>
    );

    const commonClasses = cn(
        "relative h-14 px-10 overflow-hidden rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(110,255,134,0.3)]",
        "transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(188,169,255,0.6)]",
        "group",
        className
    );

    if (href) {
        return (
            <Link href={href} className={commonClasses}>
                {innerContent}
            </Link>
        );
    }

    return (
        <button className={commonClasses} {...props}>
            {innerContent}
        </button>
    );
}
