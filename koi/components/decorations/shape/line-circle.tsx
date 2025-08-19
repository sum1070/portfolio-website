import { TShape } from "@/lib/types";
import React from "react";

const LineCircle = React.memo(function LineCircle({
    className = "",
    size = "200px",
    x = "50%",
    y = "50%",
}: Readonly<TShape>) {
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
        willChange: "transform",
    };

    return <div className={className} style={style} />;
});

export default LineCircle;