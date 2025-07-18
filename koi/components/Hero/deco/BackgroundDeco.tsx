import { Bar } from "./Bar";

export const BackgroundDeco = () => {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Bar
                width="500px"
                length="80px"
                x="70%"
                y="80%"
                rotate="135deg"
            />
        </div>
    );
};
