interface LineCircleProps {
    className?: string;
    size?: string;
}

export function LineCircle({
    className = "",
    size = "200px",
}: {
    className?: string;
    size?: string;
}) {
    const url = "/images/circle-bars-palep-p.png"; 

    const style: React.CSSProperties = {
        width: size,
        height: size,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    };

    return <div className={className} style={style} />;
}