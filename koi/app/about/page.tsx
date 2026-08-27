import { InvertedWave, Navbar, NavButton } from "@/components";
import { cn, gradient, pageIDs } from "@/utils";
import BackgroundAbout from "@/components/sections/about/about-background";
import TechSkills from "@/components/sections/about/tech-skills";
import AboutAvatar from "@/components/sections/about/about-avatar";

const About = () => {
  const pageID = pageIDs.about;

  return (
    <div
      className={cn(
        "min-h-svh min-w-svw relative h-fit flex flex-col",
        "xl:max-h-svh xl:overflow-hidden",
      )}
      id={pageID}
    >
      <Navbar currentPage={pageID} />
      <BackgroundAbout />

      <div
        id="wave-container"
        className={cn("relative min-w-svw z-10", "pb-18", "xl:pb-21 2xl:pb-30")}
      >
        <InvertedWave className="w-full" />
      </div>

      <div
        id="about-container"
        className={cn(
          "grow w-full relative z-10",
          "px-10 pt-8 pb-8 md:px-24 xl:px-32",
          "flex flex-col gap-y-12", // mobile: one col
          "xl:flex-row xl:gap-x-8 xl:pt-2", // desktop: LR
        )}
      >
        {/* Left*/}
        <div
          id="left-container"
          className={cn(
            "flex flex-col gap-4 xl:pt-16 2xl:p-32",
            "xl:flex-[1.5]", // desktop col ratio (left : right = 1.5 : 1)
          )}
        >
          <div
            id="intro-container"
            className={cn(
              "flex flex-col gap-4 ",
              "items-center justify-center ",
            )}
          >
            <div id="intro-header" className="flex gap-6 py-8 ">
              <AboutAvatar />
              <div
                id="intro-name"
                className="flex flex-col items-start gap-2 md:gap-3"
              >
                {/* cloud thought bubble status */}
                <div id="status-bubble" className="relative">
                  <span
                    id="status-pill"
                    className={cn(
                      "relative inline-block px-5 py-2.5 text-xs font-titillium-web italic",
                    )}
                  >
                    {/* thinking bubble */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="-2 -2 124 76"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M30,12 A14,14 0 0 1 55,8 A13,13 0 0 1 78,10 A12,12 0 0 1 98,20 A12,12 0 0 1 110,38 A11,11 0 0 1 98,54 A13,13 0 0 1 74,62 A14,14 0 0 1 48,62 A13,13 0 0 1 24,56 A11,11 0 0 1 10,40 A9,9 0 0 1 14,24 A11,11 0 0 1 30,12 Z"
                        className="fill-milky-white/80 dark:fill-white/10"
                        stroke="var(--color-nice-purple1)"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <span className="relative z-10">Sleepy</span>
                  </span>
                  <span
                    id="bubble-dot-1"
                    className={cn(
                      "absolute -left-2 -bottom-1 w-2 h-2 rounded-full border border-nice-purple1",
                      "bg-milky-white/70 dark:bg-white/10 animate-pulse",
                    )}
                  />
                  <span
                    id="bubble-dot-2"
                    className={cn(
                      "absolute -left-4 -bottom-2.5 w-1.5 h-1.5 rounded-full border border-nice-purple1",
                      "bg-milky-white/70 dark:bg-white/10 animate-pulse",
                    )}
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
                <h1 className="tracking-tight ">Kit Sum Chan</h1>
              </div>
            </div>
            <div id="intro-text" className="flex flex-col gap-2">
              Hello! I'm Kit Sum. You can also call me Margaret :)
              <p className="bullet-arrow-heart">
                BSc Computer Science with AI, University of Nottingham.
              </p>
              <p className="bullet-arrow-heart">
                Starting MSc Advanced CS (AI) at University of Leeds this autumn!
              </p>
              <p className="bullet-arrow">
                Specialising in AI related fields. Also interested in UX/UI
                design and web development.
              </p>
              <p className="bullet-arrow">
                If I'm offline... perhaps I'm patting my dog or drawing
                anime/game characters (like this pfp~).
              </p>
            </div>
          </div>
        </div>

        {/* Right: skills + buttons */}
        <div
          id="right-container"
          className={cn(
            "flex flex-col gap-y-12 xl:pt-16",
            "xl:flex-1 xl:gap-y-0", // desktop col ratio (left : right = 1.5 : 1)
          )}
        >
          {/* RT: skills */}
          <div
            id="right-top"
            className={cn(
              "flex justify-center items-center",
              "xl:flex-1", // desktop row ratio (top : bottom = 1 : 1.2)
            )}
          >
            <TechSkills featuredOnly={true} />
          </div>

          {/* RB: buttons */}
          <div
            id="right-bottom"
            className={cn(
              "flex flex-col md:flex-row justify-center items-center gap-y-8 gap-x-12 xl:gap-x-16",
              "pb-[4svh]",
              "xl:flex-[1.2]", // desktop row ratio (top : bottom = 1 : 1.2)
            )}
          >
            <NavButton
              background={gradient.paleBlue}
              href={`/${pageIDs.projects}`}
              button="projects"
              title="Projects"
              titleCN=""
            />
            <NavButton
              href={`/${pageIDs.contact}`}
              button="contact"
              background={gradient.default}
              title="Contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
