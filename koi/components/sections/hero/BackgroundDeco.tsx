import CodeTextSVG from "../../decorations/CodeText";
import { Bar } from "../../decorations/Bar";
import { Dot } from "../../decorations/Dot";
import { LineCircle } from "../../decorations/LineCircle";
import { Triangle } from "../../decorations/Triangle";

export default function BackgroundDeco() {
    return (
        <>
            <div className="-z-40 pointer-events-none absolute inset-0 overflow-hidden">
                {/* Bar */}
                <Bar
                    width="500px"
                    length="80px"
                    x="70%"
                    y="80%"
                    rotate="135deg" />
                <Bar
                    width="400px"
                    length="15px"
                    color="var(--color-sky-blue)"
                    endColor="var(--color-pale-purple0)"
                    x="4%"
                    y="90%"
                    rotate="315deg" />
                <Bar
                    width="220px"
                    length="15px"
                    color="var(--color-sky-blue)"
                    endColor="var(--color-pale-purple0)"
                    x="-5%"
                    y="80%"
                    rotate="135deg" />
                <Bar
                    width="300px"
                    length="10px"
                    color="var(--color-Mauve)"
                    endColor="var(--color-sky-blue)"
                    x="20%"
                    y="10%"
                    rotate="135deg" />
                {/* Circle */}
                <LineCircle
                    size="200px"
                    className="mx-auto absolute bottom-0 left-0"
                    x="0%"
                    y="84%" />
                {/* Triangle */}
                <Triangle
                    className="right-40 bottom-11/12"
                    size="150px"
                    image="mid" />
                <Triangle
                    className="right-11/12 bottom-4/12"
                    size="100px"
                    image="big"
                    rotate="330deg" />
                {/* Dots */}
                <Dot
                    size="36px"
                    type="hollow"
                    x="5%"
                    y="7%"
                    border={7}
                    color="var(--color-milky-white)" />
                <Dot
                    size="40px"
                    x="88%"
                    y="95%"
                    border={7}
                    blur={true}
                    color="var(--color-pale-purple0)" />
                <Dot
                    size="15px"
                    x="92%"
                    y="75%"
                    border={7}
                    color="var(--color-pale-purple0)" />
                {/* pink with purple shadow */}
                <Dot
                    size="38px"
                    x="9.8%"
                    y="18.9%"
                    blur={true}
                    color="var(--color-purple0)" />
                <Dot
                    size="36px"
                    x="10%"
                    y="19%"
                    border={7}
                    color="var(--color-pink2)" />
                {/* blue with pink shadow */}
                <Dot
                    size="42px"
                    x="79.8%"
                    y="65%"
                    blur={true}
                    color="var(--color-pink1)"
                    border={7} />
                <Dot
                    size="40px"
                    x="80%"
                    y="65%" />

            </div>
            <div className="z-10 absolute top-0 right-0">
                <CodeTextSVG />
            </div>
        </>
    );
};
