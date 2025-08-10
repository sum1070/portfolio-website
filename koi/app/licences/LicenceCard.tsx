import { Card, KoiUrl } from '@/components'
import React from 'react'
import soundLicenceLinks from './SoundLicence'
import svgLicenceLinks from './SvgLicence'
import { Spoiler } from 'spoiled'

export const LicenceCard = () => {
    return (
        <>
            <Card
                title="Sounds"
                bgGradient={false}
                description={
                    <p>
                        Sound effects used in this website are from <KoiUrl href="https://freesound.org/">Freesound</KoiUrl> and <KoiUrl href="https://www.zapsplat.com/" >ZAPSPLAT</KoiUrl>.
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
                        I created the SVGs with Inkscape <Spoiler >or just doodled them in Figma</Spoiler> and animated them with <KoiUrl href="https://lottiefiles.com/">LottieFiles</KoiUrl>.
                    </div>

                }
                links={soundLicenceLinks}
            />
        </>

    )
}

export default LicenceCard