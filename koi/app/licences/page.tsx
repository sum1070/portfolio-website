import { KoiUrl, Navbar, PinkBackground } from '@/components'
import React from 'react'
import { cn } from '@/lib/utils'
import LicenceCard from './LicenceCard';
import NekoSleep from '@/components/svg/NekoSleep';
import Zzz from '@/components/svg/Zzz';

const licences = () => {
    const Text = {
        h1: "text-3xl sm:text-4xl md:text-5xl xl:text-7xl ",
        h2: "text-xl sm:text-2xl md:text-3xl xl:text-4xl ",
    };
    return (
        <div className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative")} id="licencesPage">
            <Navbar />
            <PinkBackground />
            <div className="w-full pt-20 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
                <div id='license-text' className="">
                    <h1 className={cn(
                        Text.h1,
                        "font-black mb-4 text-center",
                    )}>
                        Licences and Tools
                    </h1>
                    <p className="mb-4 text-center">
                        All assets used were created by me <span><NekoSleep className="w-[20px] md:w-[24px] xl:w-[32px] inline-block object-contain" /></span><span><Zzz className="-ml-1 w-[32px] inline-block -mr-2" /></span> or are under PD or CC0 licences if not listed below.
                        <br />
                        Information about the licences can be found on <KoiUrl href="https://creativecommons.org/share-your-work/cclicenses/" > Creative Commons (CC)</KoiUrl>
                    </p>
                </div>
                <LicenceCard />
            </div>
        </div>
    )
}

export default licences