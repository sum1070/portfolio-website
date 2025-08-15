"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bgPrimary } from "@/components/theme/bg-primary";

export default function LoadCountdown() {
  const router = useRouter();
  const [count, setCount] = useState(4);

  useEffect(() => {
    if (count === 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center relative">
      {bgPrimary()}
      <div className="text-8xl font-bold text-white">{count > 0 ? count : ""}</div>
    </div>
  );
}
