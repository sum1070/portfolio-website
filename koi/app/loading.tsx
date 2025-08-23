import { bgPrimary } from "@/components";
import { cn } from "@/utils";

export default function Loading() {
    return (
        <div className="min-w-screen min-h-screen flex items-center justify-center relative">
            {/* Light mode background */}
            <div className="dark:hidden">
                {bgPrimary()}
            </div>
            
            {/* Dark mode background - solid color */}
            <div className="hidden dark:block absolute inset-0 bg-[#0e0d0d] -z-40"></div>
            
            <div className="flex flex-col items-center justify-center gap-8">
                <div className="min-h-[180px] flex flex-col items-center justify-center gap-4">
                    <span className="eyes"></span>
                    <span className="spinner"></span>
                </div>
                <div>
                    <div
                        className={cn(
                            "loading loading04",
                            "text-4xl lg:text-8xl font-extrabold tracking-wider",
                        )}
                    >
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
    )
}

