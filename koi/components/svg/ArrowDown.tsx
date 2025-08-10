"use client";
import { iconImages } from '@/lib/utils'
import Image from 'next/image'

const ArrowDown = ({className}: {className?: string}) => {
  return (
    <Image
      className={className}
      alt="svg"
      src={iconImages.arrowDown}
      width={48}
      height={48}
    />
  )
}

export default ArrowDown