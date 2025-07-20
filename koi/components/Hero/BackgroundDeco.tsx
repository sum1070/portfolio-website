import { Bar } from "../Shapes/Bar";
import { Dot } from "../Shapes/dot";
import { LineCircle } from "../Shapes/LineCircle";
import { Triangle } from "../Shapes/Triangle";

export const BackgroundDeco = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
            {/* Bar */}
            <Bar
                width="500px"
                length="80px"
                x="70%"
                y="80%"
                rotate="135deg"
            />
            <Bar
                width="400px"
                length="15px"
                startColor="var(--color-sky-blue)"
                endColor="var(--color-pale-purple0)"
                x="4%"
                y="90%"
                rotate="315deg"
            />
            <Bar
                width="220px"
                length="15px"
                startColor="var(--color-sky-blue)"
                endColor="var(--color-pale-purple0)"
                x="-5%"
                y="80%"
                rotate="135deg"
            />
            <Bar
                width="300px"
                length="10px"
                startColor="var(--color-Mauve)"
                endColor="var(--color-sky-blue)"
                x="20%"
                y="10%"
                rotate="135deg"
            />
            {/* Circle */}
            <LineCircle
                size="200px"
                className="mx-auto absolute bottom-0 left-0"
                x="0%"
                y="84%"
            />
            {/* Triangle */}
            <Triangle
                className="right-40 bottom-11/12"
                size="150px"
                image="mid"
            />
            <Triangle
                className="right-11/12 bottom-4/12"
                size="100px"
                image="big"
                rotate="330deg"
            />
            {/* Dots */}
            <Dot
                size="36px"
                type="hollow"
                x="10%"
                y="10%"
                border={7}
                color="var(--color-milky-white)"
            />
            <Dot
                size="40px"
                x="80%"
                y="65%"
                border={7}
            />
            <Dot
                size="40px"
                x="88%"
                y="95%"
                border={7}
                blur={true}
                color="var(--color-pale-purple0)"
            />
            <Dot
                size="15px"
                x="92%"
                y="75%"
                border={7}
                color="var(--color-pale-purple0)"
            />
        </div>
    );
};
