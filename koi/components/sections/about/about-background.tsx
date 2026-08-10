import { Pattern } from '@/components';
import BlurredBlobsAbout from './about-blobs';

export default function BackgroundAbout() {
    return (
        <div
            className=""
        >
            <BlurredBlobsAbout />
            <div id='about-pattern-container' className='w-full' >
                <Pattern
                    type="grid"
                    className="dark:hidden w-full h-[6svh] sm:h-[8svh]  md:hidden z-0"
                    position="bottom"
                    color="#fefaf3"
                    width="100%"
                    spacing={13}
                    stroke={3}
                />
                <Pattern
                    type="grid"
                    className="dark:block hidden w-full h-[6svh] sm:h-[8svh] md:h-[9svh] z-0"
                    position="bottom"
                    color="#9b9b9b"
                    width="100%"
                    spacing={13}
                    stroke={3}
                />
                <div className="absolute bottom-0 left-0 w-full py-40 bg-gradient-to-t from-purple1 to-transparent" />
            </div>
        </div>
    );
};

