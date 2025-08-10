"use client";
import { positionClasses, TShape } from "@/lib/types";
import { cn } from "@/utils";

interface DotProps extends TShape {
    type?: "solid" | "hollow";
}

function Dot({
    className = "",
    sizeClassName = "",
    size = "10px",
    width = "",
    length = "",
    type = "solid",
    color = "var(--color-sky-blue)",
    border = 2,
    position = 'full',
    blur = false,
}: Readonly<DotProps>) {
    const style: React.CSSProperties = {
        width: sizeClassName ? undefined : (width || size),
        height: sizeClassName ? undefined : (length || size),
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: type === "solid" ? color : "transparent",
        border: type === "hollow" ? `${border}px solid ${color}` : "none",
        display: "inline-block",
        boxShadow: blur ? `0 0 ${border * 2}px ${color}` : "none",
    };
    const positionClass = positionClasses[position] || positionClasses.full;

    return (
        <div className={cn(className, positionClass, sizeClassName)} style={style} />
    );
}

export default Dot;