import { Pattern } from "@/components";

export default function SectionConnector() {
  return (
    <div className="relative h-[20vh] -mt-[5vh] -mb-[5vh] z-40 pointer-events-none">
      <Pattern
        type="dots"
        position="full"
        color="#fefaf3"
        spacing={13}
        stroke={3}
        className="h-full"
      />
    </div>
  );
}