import { cn } from '@/utils'
import React from 'react'
import { positionClasses } from '@/lib/types'

const BlobsClasses = "absolute rounded-full mix-blend-multiply filter"

const BlobsOpacity2 = "opacity-50 sm:opacity-50"
const BlobsOpacity4 = "opacity-10 sm:opacity-50"

// HERO
// only show on screen >= md
const BlurredBlobsHero = () => {
  return (
    <div className="md:block dark:hidden hidden -z-20 absolute inset-0 overflow-hidden pointer-events-none  will-change-transform">
      {/* C */}
      <div
        id='centerBlob'
        className={cn(
          BlobsClasses,
          positionClasses.center,
          BlobsOpacity2,
          "h-80 w-80 sm:h-120 sm:w-120 md:h-160 md:w-160",
          "[animation:blob_6s_infinite_1s_ease-in-out] -translate-x-1/2 -translate-y-1/2",
          "bg-conic from-sky-blue via-purple-400 md:via-purple2 to-pink3",
          "blur-3xl",
        )}/>
      {/* BR */}
      <div
        id='BRBlob'
        className={cn(
          BlobsClasses, BlobsOpacity4,
          "[animation:blobRotate360_13s_infinite_2s]",
          "bg-radial-[at_25%_25%] from-pink-300 via-purple-300 to-pink-200 to-90%",
          "blur-xl md:blur-2xl",
          positionClasses['bottom-right'],
          "md:w-120 md:h-120 xl:w-160 xl:h-160",
        )}/>
      {/* TL */}
      <div
        id='TLBlob'
        className={cn(
          BlobsClasses, BlobsOpacity4,
          "bg-radial-[at_25%_25%] from-purple2 via-purple-400 to-purple-200 to-90%",
          "[animation:blob3_6s_infinite_2s]",
          "blur-2xl",
          positionClasses['top-left'],
          "-translate-y-5 rotate-45",
          "md:w-120 md:h-120"
        )}/>
      {/* TR */}
      <div
        id='TRBlob'
        className={cn(
          "bg-conic from-sky-blue via-blue-400 to-blueWave1",
          BlobsClasses, BlobsOpacity4,
          "[animation:blob3_6s_infinite_2s]",
          "blur-2xl",
          positionClasses['top-right'],
          "-translate-y-5 rotate-45",
          "md:w-120 md:h-120"
        )}/>
    </div >
  )
}

export default BlurredBlobsHero