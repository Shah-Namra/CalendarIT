// components/GridBackground.tsx
'use client';

import { useTheme } from "next-themes";

export function GridBackground() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 dark:bg-slate-950 bg-white transition-colors duration-500" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute inset-0 dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>
    </div>
  );
}