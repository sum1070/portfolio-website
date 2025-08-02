import { cn } from '@/lib/utils'
import React from 'react'
import { positionClasses } from '@/lib/types'

const BlobsClasses = "absolute rounded-full mix-blend-multiply filter"

const BlobsOpacity1 = "opacity-70 sm:opacity-40"
const BlobsOpacity2 = "opacity-20 sm:opacity-80"
const BlobsOpacity3 = "opacity-20 sm:opacity-50"
const BlobsOpacity4 = "opacity-70"

const BlurredBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none  will-change-transform">
      {/* C */}
      <div
        id='centerBlob'
        className={cn(
          BlobsClasses,
          positionClasses.center,
          BlobsOpacity1,
          "h-110 w-110",
          "[animation:blob_7s_infinite_1s_ease-in-out] -translate-x-1/2 -translate-y-1/2",
          "bg-conic from-sky-blue via-violet-400 to-fuchsia-300",
          "blur-3xl",
        )}

      ></div>
    {/* BR */}
      {/* <div
        className={cn(
          BlobsClasses, BlobsOpacity3,
          "[animation:blob3_6s_infinite_2s]",
          "blur-3xl",
          "bg-linear-60 from-fuchsia-500 to-sky-300",
          "bottom-0 right-0",
          "w-80 h-80 lg:w-120 lg:h-120 xl:w-200 xl:h-200",
        )}
      ></div> */}
      {/* BL */}
      <div
        className={cn(
          BlobsClasses, BlobsOpacity4,
          "[animation:blobRotate360_23s_infinite_2s]",
          "bg-radial-[at_25%_25%] from-pink-300 via-purple-300 to-pink-200 to-90%",
          "blur-xl md:blur-2xl",
          positionClasses['bottom-right'],
          "md:w-100 md:h-100 xl:w-110 xl:h-110",
        )}
      ></div>
    </div>
  )
}

export default BlurredBlobs