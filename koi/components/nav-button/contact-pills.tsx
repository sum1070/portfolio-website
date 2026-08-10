"use client";
import { cn } from '@/utils';
import FetchImage from '@/utils/fetch-images';

const pillsTransition = "transition-transform duration-1100 ease-in-out ";
const pillsBase = "absolute z-30 w-[24%] h-full p-3 text-center border-t-2 border-r-2 border-sky-50 rounded-[45%_45%_45%_45%/15%_15%_15%_15%] origin-bottom-left relative overflow-hidden pill-group ";
const pillsBefore = "before:content-[''] before:absolute before:inset-0 before:rounded-inherit before:opacity-[0.01] before:transition-opacity before:duration-500 hover:before:opacity-100 group-focus-within:before:opacity-100 ";
const pillsBGBase = "from-violet-950/[var(--bg-opacity)] via-violet-900/[var(--bg-opacity)]  to-violet-300/[var(--bg-opacity)] [--bg-opacity:30%] shadow-[1px_8px_18px_0px_#d285ff] ";
const pillsBG = {
    bottom: `bg-linear-to-b ${pillsBGBase}`,
    top: `bg-linear-to-t ${pillsBGBase}`,
}
const pills = {
    bottom: pillsBase + pillsTransition + pillsBefore + pillsBG.bottom,
    top: pillsBase + pillsTransition + pillsBefore + pillsBG.top,
}

export default function ContactPills() {
    const imagesCN = "transition-all duration-500 ease-in-out group-hover:drop-shadow-[0_0_5px_white] pill-group-hover:scale-125";
    return (
    <>
        {/* pills 8 28 28 28 8 */}
        <div className='w-full h-full flex flex-row'>
            <div
                id='instagram-pill'
                className={cn(
                    pills.bottom,
                    // hidden by default
                    "translate-x-[-100%] translate-y-[100%]",
                    // show on hover from BL
                    "group-hover:translate-x-[36%] group-hover:translate-y-[20%]",
                    // gradient bg when hovered on this pill
                    "before:bg-[linear-gradient(115deg,#ffd84d,#e95d98,#855cd6)]",
                )}
            >
                <span className=" inline-block relative z-20">
                    <FetchImage
                        className= {imagesCN}
                        src="instagram"
                    />
                </span>
            </div>
            <div
                id='github-pill'
                className={cn(
                    pills.top,
                    // hidden by default
                    "translate-y-[-110%]",
                    // show on hover from BL
                    "group-hover:translate-x-[64%] group-hover:translate-y-[-20%]",
                    // gradient bg when hovered on this pill
                    "before:bg-[linear-gradient(115deg,#8189aa,#4867cc,#273044)]",
                    // flex to align the icon to the bottom
                    "flex flex-col justify-end items-center"
                )}
            >
                <span className=" inline-block relative z-20 mb-2">
                    <FetchImage
                        className= {imagesCN}
                        src="github"
                        size={30}
                    />
                </span>
            </div>
            <div
                id='email-pill'
                className={cn(
                    pills.bottom,
                    // hidden by default
                    "translate-x-[100%] translate-y-[100%]",
                    // show on hover from BL
                    "group-hover:translate-x-[92%] group-hover:translate-y-[20%]",
                    // gradient bg when hovered on this pill
                    "before:bg-[linear-gradient(115deg,#50e7f1,#cd82f3,#f84f79)]",
                    // flex to align the icon to the bottom
                )}
            >
                <span className=" inline-block relative z-20 mb-2">
                    <FetchImage
                        className= {imagesCN}
                        src="gmail"
                    />
                </span>
            </div>
        </div>
    </>
    );
}

