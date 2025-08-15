import Wave from "react-wavify";
import { cn } from "@/utils";

interface InvertedWaveProps {
    className?: string;
}

// Wave must be absolute
const InvertedWave = ({ className }: InvertedWaveProps) => {
    return (
        // Set wave to bottom, then invert the container
        <div className={cn('scale-y-[-1] ', className)} id='AboutWaveDiv'>
            <Wave
                fill="url(#rainbowGradient)"
                className="min-w-svw opacity-10 z-50 absolute inset-x-0 bottom-0"
                options={{
                    height: 70,
                    amplitude: 20,
                    speed: 0.3,
                    points: 4
                }}
            >
                <defs>
                    <linearGradient id="rainbowGradient" gradientTransform="rotate(0)">
                        <stop offset="2%" stopColor="rgba(255, 0, 0, 1)" />
                        <stop offset="10%" stopColor="rgba(255, 154, 0, 1)" />
                        <stop offset="20%" stopColor="rgba(208, 222, 33, 1)" />
                        <stop offset="30%" stopColor="rgba(79, 220, 74, 1)" />
                        <stop offset="40%" stopColor="rgba(63, 218, 216, 1)" />
                        <stop offset="50%" stopColor="rgba(47, 201, 226, 1)" />
                        <stop offset="60%" stopColor="rgba(28, 127, 238, 1)" />
                        <stop offset="70%" stopColor="rgba(95, 21, 242, 1)" />
                        <stop offset="80%" stopColor="rgba(186, 12, 248 , 1)" />
                        <stop offset="90%" stopColor="rgba(251, 7, 217, 1)" />
                        <stop offset="100%" stopColor="rgba(255, 0, 0, 1)" />
                    </linearGradient>
                </defs>
            </Wave>
            <Wave
                fill="url(#mainGradient)"
                className="min-w-svw z-60 absolute inset-x-0 bottom-0"
                options={{
                    height: 80,
                    amplitude: 20,
                    speed: 0.2,
                    points: 4
                }}
            >
                <defs>
                    <linearGradient id="mainGradient" gradientTransform="rotate(90)">
                        <stop offset="10%" stopColor="var(--color-pale-purple0)" />
                        <stop offset="90%" stopColor="var(--color-milky-white)" />
                    </linearGradient>
                </defs>
            </Wave>

        </div>
    );
}

export default InvertedWave;