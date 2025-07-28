import React from "react";
import {TContainerProps} from "@/lib/types";

export default function CenterContainer(props: Readonly<TContainerProps>) {
  return (
    <div
      className={`container
        flex items-center justify-center text-center
        min-h-screen
        mx-auto
        sm:py-48
        lg:py-56 lg:px-8
        ${props.className ? props.className : ""}`}>
      {props.children}
    </div>
  );
}

