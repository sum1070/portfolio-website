import React from 'react'

const BlurredBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* C */}
      <div
        className="absolute w-100 h-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 sm:opacity-40 [animation:blob_6s_infinite_1s_ease-in-out] bg-linear-to-r from-sky-100 to-fuchsia-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></div>
      {/* TL */}
      <div
        className='absolute rounded-full mix-blend-multiply filter blur-2xl opacity-20 sm:opacity-80 [animation:blob2_6s_infinite_2s] bg-linear-60 from-[var(--color-Mauve)] to-[var(--color-pale)] top-0 right-0 w-80 h-80 '
      ></div>
      {/* BR */}
      <div
        className='absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 sm:opacity-90 [animation:blob3_6s_infinite_2s_delay_2s] bg-linear-60 from-fuchsia-300 to-sky-300 bottom-0 right-0 w-80 h-80 lg:w-120 lg:h-120 xl:w-200 xl:h-200'
      ></div>
      {/* BL */}
      <div
        className='absolute rounded-full mix-blend-multiply filter blur-3xl opacity-30 sm:opacity-70 [animation:blob3_3s_infinite_2s] bg-linear-60 from-[var(--color-sky-blue)] to-[var(--color-pale-purple1)] bottom-0 left-0 w-60 h-60 lg:w-100 lg:h-100 xl:w-110 xl:h-110'
      ></div>
    </div>
  )
}

export default BlurredBlobs