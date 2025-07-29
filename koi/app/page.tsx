'use client';
import { Test } from "./dev/test";
import Dummy from "./dev/dummy";
import Dev from "./dev/dev";
import Deploy from "./dev/deploy";

export default function Home() {

  return (
    <>
      {/* <Dev/> */}
      <Deploy />
        {/* <Test /> */}
    </>

  );
}
