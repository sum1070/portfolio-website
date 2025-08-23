import { KoiUrl, Navbar, NekoSleep, PinkBackground, SleepZZZ } from '@/components'
import React from 'react'
import LicenceCard from './LicenceCard';
import { cn, pageIDs } from '@/utils';

const licences = () => {
    const pageID = pageIDs.licences;

    return (
        <div className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative")} id={pageID}>
            <Navbar currentPage={pageID} />
            <PinkBackground />
            <div
                className="absolute inset-0 -z-10 dark:hidden"
                style={{
                    background: `
                        radial-gradient(at 6% 8%, var(--color-purple1) 0%, transparent 40%),
                        radial-gradient(at 95% 75%, var(--color-pink1) 0%, transparent 30%),
                        radial-gradient(at 95% 15%, var(--color-sky-blue) 0%, transparent 50%),
                        radial-gradient(at 50% 15%, var(--color-pale-purple3) 0%, transparent 50%),
                        radial-gradient(at 52% 100%, var(--color-sky-blue) 0%, transparent 50%),
                        radial-gradient(at 9% 88%, var(--color-pale-purple2) 0%, transparent 20%)
                        `,
                    backgroundColor: "var(--color-pale-purple1)",

                }}
            />
            <div className="w-full pt-20 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
                <div id='license-text' className="">
                    <h1 className={cn(
                        "font-black mb-4 text-center",
                    )}>
                        Licences and Tools
                    </h1>
                    <div className="mb-4 text-center">
                        All assets used were created by me <span><NekoSleep className="w-[20px] md:w-[24px] xl:w-[32px] inline-block object-contain" /></span><span><SleepZZZ className="-ml-1 w-[32px] inline-block -mr-2" /></span> or are under PD or CC0 licences if not listed below.
                        <br />
                        Information about the licences can be found on <KoiUrl href="https://creativecommons.org/share-your-work/cclicenses/" > Creative Commons (CC)</KoiUrl>
                    </div>
                </div>
                <LicenceCard />
            </div>
        </div>
    )
}

export default licences