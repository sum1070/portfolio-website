import { KoiUrl } from '@/components'
import { CardDetails } from '@/lib/types'
import React from 'react'
import soundLicenceLinks from './audio-licences'
import svgLicenceLinks from './svg-licences'
import fontLicenceLinks from './font-licences'
import { Spoiler } from 'spoiled'

const LicenceSection = ({ title, description, links }: { title: string; description: React.ReactNode; links?: CardDetails[] }) => (
    <div className="mb-10">
        <h2 className="mb-2">{title}</h2>
        <div className="mb-3">{description}</div>
        {links && links.length > 0 && (
            <ul className="flex flex-col gap-1.5">
                {links.map((link) => (
                    <li key={link.url} className="bullet-arrow">
                        <a className="koi-url" href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        )}
    </div>
)

export const LicenceList = () => {
    return (
        <>
            <LicenceSection
                title="Sounds"
                description={
                    <p>
                        Sounds and music used in this website are from <KoiUrl href="https://freesound.org/">Freesound</KoiUrl>.
                    </p>
                }
                links={soundLicenceLinks}
            />
            <LicenceSection
                title="SVGs"
                description={
                    <p>
                        Most of the SVGs I used were from <KoiUrl href="https://www.svgrepo.com/">SVG Repo</KoiUrl>.
                    </p>
                }
                links={svgLicenceLinks}
            />
            <LicenceSection
                title="Fonts"
                description={
                    <p>
                        The pixel font on the home page is self-hosted from <KoiUrl href="https://int10h.org/oldschool-pc-fonts/">int10h.org</KoiUrl>.
                    </p>
                }
                links={fontLicenceLinks}
            />
            <LicenceSection
                title="Tools"
                description={
                    <div>
                        I created the SVGs with Inkscape and animated them with <KoiUrl href="https://lottiefiles.com/">LottieFiles</KoiUrl>
                        For the pixel art, I used <KoiUrl href="https://www.aseprite.org/">Aseprite</KoiUrl>.
                    </div>
                }
            />
        </>
    )
}

export default LicenceList
