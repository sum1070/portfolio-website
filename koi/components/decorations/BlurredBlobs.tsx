import React from 'react'

const BlurredBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-10 -left-8 w-100 h-70 rounded-full mix-blend-multiply filter blur-xl opacity-55 [animation:blob_4s_infinite_1s_ease-in-out]"
        style={{
          backgroundColor: 'var(--color-pink2)',
        }}
      ></div>

      <div
        className="absolute top-0 -right-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-55 [animation:blob2_6s_infinite_2s]"
        style={{ backgroundColor: 'var(--color-pale-purple2)' }}
      ></div>

      <div
        className="absolute bottom-20 left-40 w-100 h-90 rounded-full mix-blend-multiply filter blur-xl opacity-50 [animation:blob3_5s_infinite_2s]"
        style={{ backgroundColor: 'var(--color-pale-purple0)' }}
      ></div>
    </div>
  )
}

export default BlurredBlobs