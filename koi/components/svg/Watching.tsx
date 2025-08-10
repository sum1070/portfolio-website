"use client";
import { iconImages } from '@/lib/utils'
import Image from 'next/image'

const NekoSleep = ({ className }: { className?: string }) => {
    return (
        <span>
            <Image
                className={className}
                alt="svg"
                src={iconImages.watching}
                width={48}
                height={48}
            />
        </span>
    )
}

export default NekoSleep