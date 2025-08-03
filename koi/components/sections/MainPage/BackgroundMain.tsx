export default function BackgroundHero() {
    return (
        <>

            <div
                className="absolute inset-0 -z-50 bg-pale-purple1"
                style={{
                    background: `
                        radial-gradient(at 95% 75%, var(--color-pink1) 0%, transparent 50%),
                        radial-gradient(at 6% 48%, var(--color-purple1) 0%, transparent 80%),
                        radial-gradient(at 26% 5%, var(--color-milky-white) 0%, transparent 80%),
                        radial-gradient(at 92% 27%, var(--color-sky-blue) 0%, transparent 40%),
                        radial-gradient(at 52% 100%, var(--color-sky-blue) 0%, transparent 50%),
                        radial-gradient(at 9% 88%, var(--color-pale-purple2) 0%, transparent 20%)
                        `,
                    backgroundColor: "var(--color-pale-purple0)",
                }}
            >


            </div>

            {/* <div></div> */}





        </>


    );
};

