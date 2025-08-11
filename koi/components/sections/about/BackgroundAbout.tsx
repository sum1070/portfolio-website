import { Pattern } from '@/components';
import BlurredBlobsAbout from './BlurredBlobsAbout';

export default function BackgroundHero() {
    return (
        <div
            className="bg-pale-purple2 -z-40"
        >
            <BlurredBlobsAbout />
            <div id='about-pattern-container'>
                <Pattern
                    type="grid"
                    className="w-full h-[10svh] sm:h-[10svh] md:h-[12svh] z-40"
                    position="bottom"
                    color="#fefaf3"
                    width="100%"
                    spacing={13}
                    stroke={3}
                />
                <div className="absolute bottom-0 left-0 w-full py-40 bg-gradient-to-t from-purple1 to-transparent" />
            </div>
        </div>
    );
};

