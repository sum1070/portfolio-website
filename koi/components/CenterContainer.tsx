import React from "react";

interface ContainerProps {
  children: React.ReactNode; // My son to be rendered
  className?: string; // for tailwind styling
}

export function CenterContainer(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container
        flex items-center justify-center text-center
        h-screen px-4
        mx-auto
        max-w-2xl
        py-32
        relative isolate
        sm:py-48
        lg:py-56 lg:px-8
        ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
}

