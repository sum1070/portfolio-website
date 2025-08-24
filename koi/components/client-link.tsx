'use client';

import React from 'react';
import FetchImage from '@/utils/fetch-images';

interface ClientLinkProps {
    name: string;
    url: string;
    icon?: string;
    iconAlt?: string;
    isSensitive?: boolean;
    className?: string;
    iconColor?: string;
}

const ClientLink = ({ name, url, icon, iconAlt, isSensitive, className, iconColor }: ClientLinkProps) => {
    const handleNavigation = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const renderIcon = () => {
        if (!icon) return null;

        return (
            <span className="flex-shrink-0 w-5 h-5 mr-2">
                <FetchImage
                    src={icon}
                    alt={iconAlt || `${name} icon`}
                    size={20}
                    useReactIcon={true}
                    iconColor={iconColor || "currentColor"}
                    className="object-contain"
                />
            </span>
        );
    };

    // --- normal link ---
    if (!isSensitive) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${className || ''}`}
            >
                {icon && renderIcon()}
                <span>{name}</span>
            </a>
        );
    }

    //  ------- hide link -------
    return (
        <button
            onClick={handleNavigation}
            className={`flex items-center ${className || ''}`}
        >
            {icon && renderIcon()}
            <span>{name}</span>
        </button>
    );
};

export default ClientLink;