import { CenterContainer } from "@/components/CenterContainer";

export const Hero = () => {
  return (
    <CenterContainer className="min-h-screen ">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold text-balance text-nice-purple0">HELLO!</h1>
        <p className="mt-4 text-lg text-nice-purple1 text-balance sm:text-xl/8">line2</p>
        <p className="mt-2 text-base text-nice-purple1 " >line3</p>
      </div>
    </CenterContainer>
  );
}
