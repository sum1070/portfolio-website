'use client';

import { CenterContainer } from '@/components/CenterContainer';
import { Bar } from '@/components/Shapes/Bar';

export function Test() {

    return (
        <>
            <Bar
                width="500px"
                length="80px"
                x="70%"
                y="80%"
                rotate="135deg"
            />
        </>
    );
}
