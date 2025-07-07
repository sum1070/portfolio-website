'use client';

import { CenterContainer } from '@/components/CenterContainer';
import { useState } from 'react';

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
];

export function Test() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <CenterContainer>
            {/* Content */}
                <div className="">
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                            HELLO
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                           line2
                        </p>
                    </div>
                </div>
        </CenterContainer>
    );
}
