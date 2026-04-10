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
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* 
        IMPORTANT: Use the exact reference image. 
        The user should ensure their logo file (e.g., logo.png) is placed in the public directory or root.
      */}
      <img 
        src=""
        alt="Nimish Logo" 
        className="w-full h-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
