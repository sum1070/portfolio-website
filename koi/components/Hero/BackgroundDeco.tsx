import { Bar } from "../Shapes/Bar";

export const BackgroundDeco = () => {
    return (
        <>
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
        </>
    );
};
