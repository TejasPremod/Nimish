/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { cn } from "@/src/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("relative flex items-center justify-center cursor-pointer", className)}>
      <svg 
        viewBox="0 0 200 150" 
        className="w-full h-auto drop-shadow-sm" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The large Burgundy 'N' */}
        <text 
          x="100" 
          y="100" 
          fontFamily="serif" 
          fontSize="110" 
          fontWeight="400" 
          fill="#5a0018" 
          textAnchor="middle"
          letterSpacing="-0.05em"
        >
          N
        </text>

        {/* The Golden Infinity Symbol */}
        <path 
          d="M75,65 C60,45 45,65 55,75 C65,85 80,65 100,65 C120,65 135,85 145,75 C155,65 140,45 125,65 C115,75 85,90 75,65 Z" 
          fill="none" 
          stroke="#C5A059" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="drop-shadow-md"
        />

        {/* The word NIMISH underneath */}
        <text 
          x="100" 
          y="135" 
          fontFamily="serif" 
          fontSize="20" 
          fontWeight="400" 
          fill="#5a0018" 
          textAnchor="middle"
          letterSpacing="0.3em"
        >
          N I M I S H
        </text>
      </svg>
    </div>
  );
};
