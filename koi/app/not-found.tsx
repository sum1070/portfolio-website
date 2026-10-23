"use client";

import { TransitionLink, WalkingDog } from "@/components";
import { cn } from "@/utils";

const NotFound = () => {
  return (
    <div id="not-found" className="relative min-h-dvh min-w-dvw overflow-hidden select-none">
      <div id="not-found-text" className="px-8 pt-16 md:px-16 md:pt-24 font-titillium-web">
        <h1 className="text-5xl md:text-6xl text-nice-purple1">Oops...</h1>
        <h1 className="mt-6 text-5xl md:text-6xl text-nice-purple0">Page not found.</h1>
        <p className="mt-8 text-sm md:text-base">
          My doggy eats anything...
          <br />
          he probably ate the page you&apos;re looking for...
        </p>
        <TransitionLink
          href="/"
          className={cn(
            "inline-block mt-6 px-5 py-1.5",
            "border rounded-md border-nice-purple1 text-nice-purple2 bg-milky-white/40",
            "hover:bg-purple-400/10 transition-all duration-200",
          )}
        >
          Back to Home
        </TransitionLink>
      </div>

      {/* the culprit */}
      <WalkingDog className="absolute bottom-[6svh] w-28 md:w-36" />
    </div>
  );
};

export default NotFound;
