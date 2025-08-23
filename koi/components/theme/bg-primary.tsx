export function bgPrimary() {
    return <div
        className="absolute inset-0 -z-40 dark:hidden "
        style={{
            background: `
                        radial-gradient(at 6% 8%, var(--color-purple2) 0%, transparent 50%),
                        radial-gradient(at 95% 75%, var(--color-pink1) 0%, transparent 50%),
                        radial-gradient(at 95% 15%, var(--color-blue2) 0%, transparent 50%),
                        radial-gradient(at 50% 15%, var(--color-pale-purple3) 0%, transparent 50%),
                        radial-gradient(at 52% 100%, var(--color-sky-blue) 0%, transparent 50%),
                        radial-gradient(at 9% 88%, var(--color-pale-purple2) 0%, transparent 50%)
                        `,
            backgroundColor: "var(--color-pale-purple1)",
        }} />;
}
