import Wave from "react-wavify";

const InvertedWave = () => {
    return (
        // Set wave to bottom, then invert the container
        <div className='scale-y-[-1]' id='AboutWaveDiv'>
            {/*  wave must be absolute  */}
            <Wave
                className="min-w-svw z-0 absolute inset-x-0 bottom-0"
                fill="var(--color-milky-white)"
                paused={false}
                options={{
                    height: 60,
                    amplitude: 20,
                    speed: 0.3,
                    points: 4
                }}
            />
        </div>
    );
}

export default InvertedWave;