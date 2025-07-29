import {MouseTrail} from "@/components";
import {Hero, MainPage} from "@/components/sections";

export default function deploy() {

  return (
    <div className="min-h-full flex-col">
      <MouseTrail />
      <Hero />
      <MainPage />
    </div>

  );
}
