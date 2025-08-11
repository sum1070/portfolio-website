import { TBaseProps } from '@/lib/types';
import { cn } from '@/utils';
import React from 'react';

interface WindowCardProps extends TBaseProps {
    title?: string;
    buttonText?: string;
    borderColor?: string;
    headerBgColor?: string;
    bgColor?: string;
    buttonColor?: string;
    onButtonClick?: () => void;
}

const WindowCard = ({
    title = 'Window',
    headerBgColor = 'bg-milky-white',
    bgColor = 'bg-pink-300',
    borderColor = 'border-black',
    children,
    className,
    buttonText = 'Button',
    buttonColor = 'bg-sky-400',
    onButtonClick
}: WindowCardProps) => {

    return (
        <div className={cn(
            'w-[300px] h-[250px] overflow-hidden  -translate-x-1.5 -translate-y-1.5',
            'border-3 shadow-[12px_12px_0_#000000]',
            'transition-all duration-200 ease-in-out hover:-translate-y-4 ',
            'font-titillium-web',
            bgColor,
            className,
            borderColor,
        )}>
            <div className={cn(
                "tracking-wider w-full h-8 px-3 text-lg font-black border-b-3",
                borderColor,
                headerBgColor,
            )}>
                {title}
            </div>
            <div className="p-3 text-sm font-semibold">
                {children}
                {buttonText && (
                    <button
                        onClick={onButtonClick}
                        className={cn(
                            'px-2.5 py-1.5 mt-2.5 border-3 shadow-[3px_3px_0_#000000]',
                            borderColor,
                            'font-bold transition-all duration-300 ease-in-out cursor-pointer',
                            'hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000]',
                            'active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
                            buttonColor,
                        )}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default WindowCard;