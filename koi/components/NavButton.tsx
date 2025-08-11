"use client";
import { cn } from '@/utils';
import FetchImage from '@/utils/fetchImage';
import React from 'react';
export default function NavButton({
    btnName = "Contact",
}: {
    btnName?: string;
}) {
    const pillsTransition = "transition-transform duration-1100 ease-in-out";
    const pillsDefaultBg = "bg-violet-400/[var(--bg-opacity)] [--bg-opacity:20%] shadow-[1px_8px_18px_0px_#d285ff] ";
    const pillsBasic = "absolute z-30 w-[24%] h-full p-3 text-center border-t-2 border-r-2 border-sky-50 rounded-[45%_45%_0%_0%/15%_15%_0%_0%] origin-bottom-left relative overflow-hidden pill-group ";
    const pillsBefore = "before:content-[''] before:absolute before:inset-0 before:rounded-inherit before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100 ";
    const pillsCN = pillsBasic + pillsDefaultBg + pillsTransition + pillsBefore;

    return (
        <div className="relative">


            <div
                className={cn(
                    "relative overflow-hidden rounded-[2rem] group w-64 h-30",
                    "transition-all duration-1000 ease-in-out hover:scale-110",
                    "bg-[rgb(193,228,248)]"
                )}
                style={{
                    boxShadow: "#64646f33 0px 7px 29px 0px",
                }}
            >
                {/* Background */}
                <div className=" absolute inset-0 overflow-hidden">
                        <div
                            className={cn(
                                "absolute -top-[75%] -left-[75%] w-[250%] h-[250%]",
                                "bg-[rbg(222,0,75)] bg-gradient-to-r from-[#ff0077] from-0% via-[#d6aaff] via-49% to-[#2e4dff]",
                                // "bg-gradient-to-r from-[rgba(222,0,75,1)] via-[rgba(191,70,255,1)] to-[rgba(0,212,255,1)]",
                                "rounded-[40rem]",
                                "filter blur-[20px]",
                                "animate-effect",
                                "[animation:rotation_4s_infinite_2s]"
                            )}
                        />
                    </div>

                {/* <div
                    className={cn(
                        "absolute inset-0 bottom-0 left-0 right-0 top-0",
                        "rounded-[40rem]",
                        "w-full h-full",
                        "transition-all duration-400",
                        "filter blur-[20px]",
                        "animate-effect",
                        // "opacity-50",
                        "[animation:rotation_4s_infinite_2s]",
                    )}

                /> */}
                {/* <div

                    className={cn(
                        "[animation:blobRotate360_13s_infinite_2s]",
                        // btnAfter,
                        "bg-linear-90 from-[rgba(222,0,75,1)] from-0% via-[rgba(191,70,255,1)] via-49% to-[rgba(0,212,255,1)]",
                        // "after:border-8 after:border-solid after:border-emerald-400",
                        "absolute inset-0 ",
                        //  background: linear-gradient(135deg, #77a1d3, #79cbca);
                        // "bg-linear-135 from-[#77a1d3] to-[#79cbca]",
                        // "bg-[radial-gradient(ellipse_at_bottom,#fed6ff,#7dd3fc,#3730a3)] ",
                        // "bg-[radial-gradient(ellipse_at_bottom,#e8c7ff,#00f2fe,#2298FF,#3730a3)] ",
                    )} /> */}
                {/*   */}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-sky-200 bg-opacity-50 backdrop-blur-[2px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-10" />

                {/* title */}
                <div
                    className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 transition-all duration-700 ease-in-out group-hover:opacity-0 z-20"
                >
                    <div className="font-titillium-web text-3xl">
                        {btnName}
                    </div>
                </div>

                {/* Pill button */}
                <div
                    className={cn(
                        pillsCN,
                        // positioning BL
                        "translate-x-[-100%] translate-y-[100%]",
                        // hover on component
                        "group-hover:translate-x-[24%] group-hover:translate-y-[20%]",
                        // hover on pill
                        "before:bg-[linear-gradient(115deg,#ffd84d,#e95d98,#855cd6)]",
                    )}
                >
                    <span className="icon inline-block relative z-20">
                        <FetchImage
                            className="svg transition-all duration-500 ease-in-out group-hover:drop-shadow-[0_0_5px_white] pill-group-hover:scale-125"
                            src="instagram"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}
