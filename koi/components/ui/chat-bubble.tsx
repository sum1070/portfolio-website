import { cn } from "@/utils";

const BUBBLES = {
  left: { body: "/images/chat/chat_bubble.png", tail: "/images/chat/chat_bubble_tail.png" },
  right: { body: "/images/chat/chat_bubble_blue.png", tail: "/images/chat/chat_bubble_tail_blue_flipped.png" },
};

interface ChatBubbleProps {
  children: React.ReactNode;
  side?: "left" | "right";
  tail?: boolean;
  className?: string;
}

export default function ChatBubble({ children, side = "left", tail = true, className }: Readonly<ChatBubbleProps>) {
  const mine = side === "right";
  const art = BUBBLES[side];

  return (
    <div className={cn("relative w-fit max-w-[85%]", mine && "ml-auto", tail && (mine ? "mr-3.5" : "ml-3.5"), className)}>
      <span
        aria-hidden="true"
        className="absolute inset-0 [image-rendering:pixelated]"
        style={{ borderStyle: "solid", borderWidth: 16, borderImage: `url(${art.body}) 8 fill / 16px / 0 round` }}
      />
      {tail && <img
        src={art.tail}
        alt=""
        aria-hidden="true"
        width={8}
        height={8}
        draggable={false}
        className={cn(
          "absolute top-4 size-4 [image-rendering:pixelated]",
          mine ? "-right-3.5" : "-left-3.5",
        )}
      />}
      <div className="relative px-[22px] py-[18px] font-titillium-web text-dark-black text-sm sm:text-base leading-snug">
        {children}
      </div>
    </div>
  );
}
