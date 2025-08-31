import { bgPrimary } from "@/components";
import { cn } from "@/utils";

interface LoadingScreenProps {
    fullPage?: boolean;
    className?: string;
}

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

            <div id="loading-dark-bg" className="hidden dark:block absolute inset-0 bg-[#0e0d0d] -z-40" />

            <div className="flex flex-col items-center justify-center gap-8">
                <div className="min-h-[180px] flex flex-col items-center justify-center gap-4">
                    <span className="eyes"></span>
                    <span className="spinner"></span>
                </div>
                <div>
                    <div className={"loading loading04 text-4xl lg:text-8xl font-extrabold tracking-wider"}>
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
        </div>
    );
}