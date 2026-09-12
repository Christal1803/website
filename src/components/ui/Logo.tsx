import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "full";
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "full", className, priority = false }: LogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src="/logo-mark.svg"
        alt="Rare Property Advisory"
        width={32}
        height={32}
        priority={priority}
        className={cn("block h-auto w-auto", className)}
      />
    );
  }

  return (
    <Image
      src="/logo-full.svg"
      alt="Rare Property Advisory"
      width={127}
      height={32}
      priority={priority}
      className={cn("block h-auto w-auto", className)}
    />
  );
}
