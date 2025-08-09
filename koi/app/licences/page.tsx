import { CenterContainer, Navbar, BlueBackground} from '@/components'
import React from 'react'
import { cn } from '@/lib/utils'

const licences = () => {
    return (
        <div className={cn("flex overflow-hidden min-w-svw min-h-svh relative")} id="licencesPage">
            <Navbar/>
            <BlueBackground />
            <CenterContainer className="min-h-dvh">
                <div>hello</div>
            </CenterContainer>
        </div>
    )
}

export default licences