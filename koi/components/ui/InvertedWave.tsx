import Wave from "react-wavify";
import { cn } from "@/utils";

interface InvertedWaveProps {
    className?: string;
}

const InvertedWave = ({ className }: InvertedWaveProps) => {
    return (
        // Set wave to bottom, then invert the container
        <div className={cn('scale-y-[-1] ', className)} id='AboutWaveDiv'>
            {/*  wave must be absolute  */}
            <Wave
                className="min-w-svw z-50 absolute inset-x-0 bottom-0"
                fill="var(--color-milky-white)"
                paused={false}
                options={{
                    height: 80,
                    amplitude: 20,
                    speed: 0.3,
                    points: 4
                }}
            />
        </div>
    );
}

export default InvertedWave;