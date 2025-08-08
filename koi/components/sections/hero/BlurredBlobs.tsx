import { cn } from '@/lib/utils'
import React from 'react'
import { positionClasses } from '@/lib/types'

const BlobsClasses = "absolute rounded-full mix-blend-multiply filter"

const BlobsOpacity1 = "opacity-70 sm:opacity-60"
const BlobsOpacity2 = "opacity-50 sm:opacity-50"
const BlobsOpacity3 = "opacity-20 sm:opacity-50"
const BlobsOpacity4 = "opacity-10 sm:opacity-50"

// HERO
const BlurredBlobs = () => {
  return (
    <div className="-z-20 absolute inset-0 overflow-hidden pointer-events-none  will-change-transform">
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
        )}

      ></div>
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
        )}
      ></div>
      {/* TL */}
      <div
        id='TLBlob'
        style={{
          background: "radial-gradient(77.73% 77.73% at 98.52% 96.25%, #F98BDA 0%, rgba(128, 76, 239, 0.29) 50.52%, rgba(91, 216, 216, 0) 100%), radial-gradient(141.73% 105.23% at 50% -7.16%, #E1F8FF 0%, rgba(160, 198, 255, 0) 50.73%, rgba(162, 147, 255, 0) 100%), radial-gradient(112.27% 48.54% at 1.59% 50%, rgba(255, 130, 227, 0.5) 0%, rgba(255, 123, 234, 0.095) 53.91%, rgba(254, 216, 255, 0) 100%), linear-gradient(153.07deg, #a353ff 6.37%, rgba(255, 230, 166, 0) 83.82%)",
        }}
        className={cn(
          BlobsClasses, BlobsOpacity4,
          "[animation:blob3_6s_infinite_2s]",
          "blur-2xl",
          positionClasses['top-left'],
          "-translate-y-5 rotate-45",
          "md:w-120 md:h-120"
        )}
      ></div>
      {/* TR */}
      <div
        id='TRBlob'
        style={{
          background: "radial-gradient(63.62% 69.52% at 100% 0%, rgba(247, 214, 98, 0.8) 0%, rgba(247, 214, 98, 0.168) 52.08%, rgba(247, 214, 98, 0) 100%), linear-gradient(208.42deg, #fcb0ff 7.46%, rgba(240, 88, 42, 0.18) 42.58%, rgba(240, 101, 42, 0) 64.13%), radial-gradient(114.51% 122.83% at 0% -15.36%, #e2baff 0%, rgba(231, 79, 106, 0.22) 66.72%, rgba(231, 79, 106, 0) 100%), linear-gradient(333.95deg, rgba(83, 208, 236, 0.85) -7.76%, rgba(83, 208, 236, 0.204) 19.67%, rgba(138, 137, 190, 0) 35.42%), radial-gradient(109.15% 148.57% at 4.46% 98.44%, #A9E8F2 0%, rgba(27, 49, 128, 0) 100%), linear-gradient(141.57deg, #A9E8F2 19.08%, rgba(78, 173, 235, 0) 98.72%)",
        }}
        className={cn(
          BlobsClasses, BlobsOpacity4,
          "[animation:blob3_6s_infinite_2s]",
          "blur-2xl",
          positionClasses['top-right'],
          "-translate-y-5 rotate-45",
          "md:w-120 md:h-120"
        )}
      ></div>
    </div >
  )
}

export default BlurredBlobs