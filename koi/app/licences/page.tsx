import { KoiUrl, Navbar, PixelDog, GreenBackground } from '@/components'
import React from 'react'
import LicenceCard from './licence-card';
import { cn, pageIDs } from '@/utils';

const licences = () => {
    const pageID = pageIDs.licences;

    return (
        <div className={cn("flex overflow-hidden min-w-dvw min-h-dvh relative")} id={pageID}>
            <Navbar currentPage={pageID} />
            <GreenBackground />
            <div className="w-full pt-20 pb-40 px-8 sm:px-12 md:px-24 max-w-6xl mx-auto">
                <div id='license-text' className="">
                    <h1 className={cn(
                        "font-semibold mb-4 text-center",
                    )}>
                        Licences and Tools
                    </h1>
                    <div className="mb-4 text-center">
                        All assets used were created by me <span><PixelDog startAwake className="w-4 xl:w-8" /></span> or are under PD or CC0 licences if not listed below.
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