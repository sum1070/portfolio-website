import { Card, KoiUrl } from '@/components'
import React from 'react'
import soundLicenceLinks from './audio-licences'
import svgLicenceLinks from './svg-licences'
import { Spoiler } from 'spoiled'

export const LicenceCard = () => {
    return (
        <>
            <Card
                title="Sounds"
                bgGradient={false}
                description={
                    <p>
                        Sounds and music used in this website are from <KoiUrl href="https://freesound.org/">Freesound</KoiUrl>.
                    </p>
                }
                links={soundLicenceLinks}
            />
            <Card
                title="SVGs"
                bgGradient={false}
                description={
                    <p>
                        Most of the SVGs I used were from <KoiUrl href="https://www.svgrepo.com/">SVG Repo</KoiUrl>.
                    </p>
                }
                links={svgLicenceLinks}
            />
            <Card
                variant="compact"
                bgGradient={false}
                title="Tools"
                description={
                    <div>
                        I created the SVGs with Inkscape <Spoiler accentColor="black" >or just doodled them in Figma</Spoiler>,<br /> and animated them with <KoiUrl href="https://lottiefiles.com/">LottieFiles</KoiUrl>.
                    </div>

                }
                links={soundLicenceLinks}
            />
        </>

    )
}

export default LicenceCard