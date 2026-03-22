import { cn } from "@/lib/utils";

interface Props {
  temp: number | null;
}

export function TempValue({ temp }: Props) {
  if (temp === null)
    return <span className="num text-[hsl(var(--muted-foreground))]">—</span>;
  const cls = temp > 90 ? "temp-hot" : temp > 80 ? "temp-warm" : "temp-cool";
  return <span className={cn("num font-semibold", cls)}>{temp} °C</span>;
}
