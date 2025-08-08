import React from "react";
import {TContainerProps} from "@/lib/types";
import { cn } from "@/lib/utils";

export default function CenterContainer(props: Readonly<TContainerProps>) {
  return (
    <div
      id="center-container"
      className={cn(
        "flex flex-row min-h-screen justify-center items-center min-w-screen",
        `${props.className ? props.className : ""}`
      )}>
      {props.children}
    </div>
  );
}