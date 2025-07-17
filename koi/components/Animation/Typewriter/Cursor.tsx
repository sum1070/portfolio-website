import React, { useEffect, useState } from 'react';

interface CursorProps {
    cursorChar?: string;
    blinkSpeed?: number;
    blinkEnabled?: boolean;
}

export function Cursor({
    cursorChar = '|',
    blinkSpeed = 500,
    blinkEnabled = true,
}: Readonly<CursorProps>) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!blinkEnabled) {
            setVisible(true);
            return;
        }

        setVisible(true);
        const timer = setInterval(() => {
            setVisible((visible) => !visible);
        }, blinkSpeed);

        return () => clearInterval(timer);
    }, [blinkSpeed, blinkEnabled]);

    return (
        <span className={`inline-block transition-opacity duration-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {cursorChar}
        </span>
    );
}