"use client";
import { iconImages } from '@/lib/utils'
import Image from 'next/image'

const NekoSleep = ({className}: {className?: string}) => {
  return (
    <Image
      className={className}
      alt="svg"
      src={iconImages.nekoSleep}
      width={48}
      height={48}
    />
  )
}

export default NekoSleep