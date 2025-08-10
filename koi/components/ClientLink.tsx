'use client';

import React from 'react';
import Image from 'next/image';

interface ClientLinkProps {
    name: string;
    url: string;
    icon?: string;
    iconAlt?: string;
    isSensitive?: boolean;
    className?: string;
}

const ClientLink = ({ name, url, icon, iconAlt, isSensitive, className }: ClientLinkProps) => {
    const handleNavigation = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // --- normal link ---
    if (!isSensitive) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {icon && (
                    <div className="flex-shrink-0 w-5 h-5 relative">
                        <Image
                            src={icon}
                            alt={iconAlt || `${name} icon`}
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                    </div>
                )}
                <span>{name}</span>
            </a>
        );
    }

    //  ------- hide link -------
    return (
        <button
            onClick={handleNavigation}
            className={className}
            aria-label={`Open ${name} in a new window`}
        >
            {icon && (
                <div className="flex-shrink-0 w-5 h-5 relative">
                    <Image
                        src={icon}
                        alt={iconAlt || `${name} icon`}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
            )}
            <span>{name}</span>
        </button>
    );
};

export default ClientLink;