import { TShape } from "@/lib/types";

interface TriangleProp extends TShape {
    image?: "big" | "mid";
}

function Triangle({
    className = "",
    size = "200px",
    image = "big",
    rotate = "0deg",
}: Readonly<TriangleProp>) {
    const url = image === "big" ? "/images/triangle-big.webp" : "/images/triangle-mid.webp";

    const style: React.CSSProperties = {
        width: size,
        height: size,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `rotate(${rotate})`,
        position: "absolute",
    };

    return <div className={className} style={style} />;
}

export default Triangle;