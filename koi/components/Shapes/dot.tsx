import { TShape } from "@/lib/types";

interface DotProps extends TShape {
    type?: "solid" | "hollow";
    color?: string;
}

export function Dot({
    className = "",
    size = "10px",
    type = "solid",
    color = "var(--color-sky-blue)",
    x = "0px",
    y = "0px",
    border = 2,
    blur = false,
}: Readonly<DotProps>) {
    const style: React.CSSProperties = {
        width: size,
        height: size,
        left: x,
        top: y,
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: type === "solid" ? color : "transparent",
        border: type === "hollow" ? `${border}px solid ${color}` : "none",
        display: "inline-block",
        boxShadow: blur ? `0 0 ${border * 2}px ${color}` : "none",
    };

    return <div className={className} style={style} />;
}