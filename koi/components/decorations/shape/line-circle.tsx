import { TShape } from "@/lib/types";
import React from "react";
import { preload } from "react-dom";

export const LINE_CIRCLE_IMAGE = "/images/circle-bars-palep-p.webp";

const LineCircle = React.memo(function LineCircle({
    className = "",
    size = "200px",
    x = "50%",
    y = "50%",
}: Readonly<TShape>) {
    // preload from here rather than the root layout so only the routes that
    // actually render a LineCircle ask for the image. React dedupes the hint.
    preload(LINE_CIRCLE_IMAGE, { as: "image", type: "image/webp" });

    const url = LINE_CIRCLE_IMAGE;

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