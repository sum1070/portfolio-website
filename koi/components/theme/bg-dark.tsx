export function bgDark() {
    return <div
        className="absolute inset-0 -z-40 hidden dark:block"
        style={{
            backgroundColor: "var(--color-bg-primary)",
        }} />;
}