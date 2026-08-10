import { cn } from '@/utils'
import { positionClasses } from '@/lib/types'

const BlobsClasses = "absolute rounded-full mix-blend-multiply filter"
const BlobsContainerClasses = "absolute inset-0 overflow-hidden pointer-events-none  will-change-transform"

const BlobsOpacity1 = "opacity-70 sm:opacity-40"
const BlobsOpacity2 = "opacity-70"

// About Page
const BlurredBlobsAbout = () => {
    return (
        <>
            {/* Desktop */}
            <div className={cn(BlobsContainerClasses, "hidden sm:block -z-10 ")}>
                {/* L */}
                <div
                    id='centerBlob'
                    className={cn(
                        BlobsClasses,
                        positionClasses.left,
                        BlobsOpacity1,
                        "h-210 w-210",
                        "animate-[blob_7s_infinite_1s_ease-in-out] -translate-x-1/2 -translate-y-1/2",
                        "bg-conic from-sky-blue via-violet-400 to-fuchsia-300",
                        "dark:hidden",
                        "blur-3xl"
                    )}
                ></div>
                {/* R */}
                <div
                    className={cn(
                        BlobsClasses, BlobsOpacity2,
                        "animate-[blob2_6s_infinite_2s]",
                        "translate-x-52",
                        "bg-radial-[at_25%_25%] from-pink1 via-purple-300 to-pink-200 to-90%",
                        "blur-3xl",
                        positionClasses.right,
                        "w-160 h-160 xl:w-210 xl:h-210",
                        "dark:hidden",
                    )}
                ></div>
            </div>
            {/* Mobile */}
            <div className={cn(BlobsContainerClasses, "block sm:hidden -z-10")}>
                {/* L */}
                <div
                    id='centerBlob'
                    className={cn(
                        BlobsClasses,
                        positionClasses.top,
                        BlobsOpacity1,
                        "h-110 w-110",
                        "animate-[blob_7s_infinite_1s_ease-in-out] -translate-x-1/2 -translate-y-1/2",
                        "bg-conic from-sky-blue via-violet-400 to-fuchsia-300",
                        "blur-3xl"
                    )}
                ></div>
                {/* R */}
                <div
                    id='centerBlob'
                    className={cn(
                        BlobsClasses,
                        positionClasses.bottom,
                        BlobsOpacity1,
                        "h-110 w-110",
                        "animate-[blob_7s_infinite_1s_ease-in-out] translate-y-52",
                        "bg-conic from-sky-blue via-violet-400 to-fuchsia-300",
                        "blur-3xl"
                    )}
                ></div>
            </div></>
    )
}

export default BlurredBlobsAbout