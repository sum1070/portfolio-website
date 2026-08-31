import { bgPrimary } from "@/components";
import { titilliumWeb } from "@/lib/fonts";
import { cn } from "@/utils";

interface LoadingScreenProps {
    fullPage?: boolean;
    className?: string;
}

const ORBIT_PATH =
    "M 60 8 H 200 A 52 52 0 0 1 252 60 V 200 A 52 52 0 0 1 200 252 H 60 A 52 52 0 0 1 8 200 V 60 A 52 52 0 0 1 60 8 Z";
const ORBIT_DURATION = "2.8s";
// Trail length as a fraction of the orbit (pathLength is normalised to 100)
const TRAIL_LENGTH = 24;

export default function LoadingScreen({
    fullPage = true,
    className
}: Readonly<LoadingScreenProps>) {
    return (
        <div className={cn(
            "flex items-center justify-center relative pointer-events-none",
            fullPage && "min-w-screen min-h-screen",
            className
        )}>
            <div id="loading-light-bg" className="dark:hidden">{bgPrimary()}</div>

            {/* black base with blurred preset-gradient glows as deco */}
            <div id="loading-dark-bg" className="hidden dark:block absolute inset-0 -z-40 bg-dark-black overflow-hidden">
                <div className="gradient-deep-blue absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-60" />
                <div className="gradient-2 absolute -bottom-32 -right-24 h-96 w-96 rounded-full blur-3xl opacity-25" />
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
                <svg
                    viewBox="0 0 260 260"
                    className="loading-dog-bump h-[130px] w-[130px] overflow-visible"
                    aria-hidden="true"
                >
                    <defs>
                        {/* ball: yellow + pink pair from the contact-pill gradient,
                            highlight from the first .gradient-insta stop */}
                        <radialGradient id="loading-ball-grad" cx="0.35" cy="0.3" r="0.9">
                            <stop offset="0%" stopColor="#FFF1BF" />
                            <stop offset="100%" stopColor="#ffd84d" />
                        </radialGradient>
                        {/* trail: stop colours live in globals.css —
                            .gradient-default (light) / .gradient-2 (dark) presets */}
                        <linearGradient id="loading-trail-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" className="loading-trail-stop1" />
                            <stop offset="50%" className="loading-trail-stop2" />
                            <stop offset="100%" className="loading-trail-stop3" />
                        </linearGradient>
                        <filter id="loading-trail-glow" x="-40%" y="-40%" width="180%" height="180%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <clipPath id="loading-dog-clip">
                            <rect x="26" y="26" width="208" height="208" rx="34" />
                        </clipPath>
                    </defs>
                    <rect x="18" y="18" width="224" height="224" rx="42" fill="#fff" />
                    <image
                        href="/images/dog2.jpg"
                        x="26"
                        y="26"
                        width="208"
                        height="208"
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#loading-dog-clip)"
                    />
                    <path
                        className="orbit-trail"
                        d={ORBIT_PATH}
                        pathLength={100}
                        fill="none"
                        stroke="url(#loading-trail-grad)"
                        filter="url(#loading-trail-glow)"
                        strokeWidth={7}
                        strokeLinecap="round"
                        strokeDasharray={`${TRAIL_LENGTH} ${100 - TRAIL_LENGTH}`}
                        strokeDashoffset={TRAIL_LENGTH}
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from={TRAIL_LENGTH}
                            to={TRAIL_LENGTH - 100}
                            dur={ORBIT_DURATION}
                            repeatCount="indefinite"
                        />
                    </path>
                    <g className="orbit-ball">
                        <circle r="13" fill="url(#loading-ball-grad)" stroke="#e95d98" strokeWidth="2.5" />
                        <animateMotion dur={ORBIT_DURATION} repeatCount="indefinite" path={ORBIT_PATH} />
                    </g>
                </svg>
                <div className={cn(
                    titilliumWeb.className,
                    "loading loading-wave text-lg lg:text-xl font-bold tracking-[0.4em] text-nice-purple2"
                )}>
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </div>
        </div>
    );
}
