interface LineCircleProps {
    className?: string;
    size?: string;
    x?: string;
    y?: string;
}

export function LineCircle({
    className = "",
    size = "200px",
    x = "50%",
    y = "50%",
}: Readonly<LineCircleProps>) {
    const url = "/images/circle-bars-palep-p.webp"; 

    const style: React.CSSProperties = {
        width: size,
        height: size,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        left: x,
        top: y,
    };

    return <div className={className} style={style} />;
}