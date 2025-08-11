import Image from 'next/image';
import React from 'react';
import { iconMap } from './imageUtils';
import { cn } from '@/utils';
import { TBaseProps } from '@/lib/types';

interface FetchImageProps extends TBaseProps {
    src: keyof typeof iconMap;
    className?: string;
    alt?: string;
    size?: number;
}

const FetchImage = ({
    src,
    style,
    className,
    size = 24,
    alt = `${src} icon`,
}: FetchImageProps) => {

    const imageSrc = iconMap[src] || src;

    return (
        <Image
            src={imageSrc}
            width={size }
            height={size }
            alt={alt}
            className={cn( className )}
            style={style}
        />
    );
};

export default FetchImage;