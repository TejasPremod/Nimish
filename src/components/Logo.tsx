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
      <img 
        src="/logo.jpeg"
        alt="Nimish Logo" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
};
