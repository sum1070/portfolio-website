import React from "react";
import {TBaseProps} from "@/lib/types";
import { cn } from "@/utils";

export default function CenterContainer(props: Readonly<TBaseProps>) {
  return (
    <div
      id="center-container"
      className={cn(
        "flex text-center min-h-svh sm:min-h-dvh justify-center items-center min-w-screen",
        `${props.className ? props.className : ""}`
      )}>
      {props.children}
    </div>
  );
}