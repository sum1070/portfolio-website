import { BlurredBlobsMain } from "@/components/decorations";
import { Pattern } from '@/components';

export default function BackgroundHero() {
    return (
        <>
            <BlurredBlobsMain />
            <div
                className="absolute inset-0 -z-50 bg-pale-purple1">
            </div>
            <div className="absolute bottom-0 left-0 w-full py-40 bg-gradient-to-t from-purple1 to-transparent"></div>
            {/* white dots grid */}
            <Pattern
                type="grid"
                className="w-full h-[10svh] sm:h-[10svh] md:h-[12svh] z-40"
                position="bottom"
                color="#fefaf3"
                width="100%"
                spacing={13}
                stroke={3}
            />
        </>
    );
};

