import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface Props {
  stable: boolean;
  bsod: boolean;
  size?: "sm" | "md";
}

export function StatusIcon({ stable, bsod, size = "md" }: Props) {
  const cls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  if (bsod) return <XCircle className={`${cls} text-[hsl(var(--rose))]`} />;
  if (stable) return <CheckCircle2 className={`${cls} text-[hsl(var(--emerald))]`} />;
  return <AlertCircle className={`${cls} text-[hsl(var(--amber))]`} />;
}
