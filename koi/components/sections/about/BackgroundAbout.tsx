import { Pattern } from '@/components';
import BlurredBlobsAbout from './BlurredBlobsAbout';

export default function BackgroundAbout() {
    return (
        <div
            className=""
        >
            <BlurredBlobsAbout />
            <div id='about-pattern-container'>
                <Pattern
                    type="grid"
                    className="w-full h-[6svh] sm:h-[8svh] md:h-[12svh] z-40"
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

