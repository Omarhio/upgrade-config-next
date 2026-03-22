import Link from "next/link";
import type { Rapport } from "@/data/rapports";
import { Badge } from "@/components/ui/badge";
import { StatusIcon } from "@/components/ui/status-icon";
import { StatusBadge } from "@/components/rapports/status-badge";
import { TempValue } from "@/components/ui/temp-value";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  rapport: Rapport;
  isFinal?: boolean;
  fullHeight?: boolean;
}

export function RapportCard({ rapport, isFinal = false, fullHeight = false }: Props) {
  return (
    <Link href={`/rapports/${rapport.id}`} className={cn("block", fullHeight && "h-full")}>
      <div
        className={cn(
          "group relative overflow-hidden rounded-xl border transition-all duration-300",
          fullHeight && "h-full",
          isFinal
            ? "border-[hsl(var(--emerald)/0.3)] bg-[hsl(var(--emerald)/0.04)] hover:border-[hsl(var(--emerald)/0.5)] hover:shadow-[0_0_24px_hsl(var(--emerald)/0.08)]"
            : rapport.profil.bsod
            ? "border-[hsl(var(--rose)/0.2)] bg-[hsl(var(--rose)/0.03)] hover:border-[hsl(var(--rose)/0.3)]"
            : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--cyan)/0.2)] hover:shadow-[0_0_16px_hsl(var(--cyan)/0.04)]"
        )}
      >
        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="num flex h-5 w-5 items-center justify-center rounded bg-[hsl(var(--muted))] text-[10px] font-semibold text-[hsl(var(--muted-foreground))]">
                {rapport.id}
              </span>
              <StatusIcon stable={rapport.profil.stable} bsod={rapport.profil.bsod} />
            </div>
            <div className="flex flex-wrap justify-end gap-1">
              <Badge variant={rapport.methode === "BIOS" ? "bios" : "ryzenmaster"}>
                {rapport.methode}
              </Badge>
              <StatusBadge stable={rapport.profil.stable} bsod={rapport.profil.bsod} />
            </div>
          </div>

          <p className="mb-3 font-[family-name:var(--font-syne)] text-[13px] font-semibold leading-snug">
            {rapport.titre}
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <div>
              <p className="text-[hsl(var(--muted-foreground))]">Fréquence</p>
              <p className="num font-semibold text-[hsl(var(--cyan))]">{rapport.profil.frequence}</p>
            </div>
            <div>
              <p className="text-[hsl(var(--muted-foreground))]">Vcore</p>
              <p className="num font-semibold">{rapport.profil.vcore}</p>
            </div>
            <div>
              <p className="text-[hsl(var(--muted-foreground))]">Temp. max</p>
              <TempValue temp={rapport.profil.tempMax} />
            </div>
            <div>
              <p className="text-[hsl(var(--muted-foreground))]">Durée</p>
              <p className="num font-semibold">{rapport.profil.duree}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-1 font-[family-name:var(--font-jetbrains)] text-[10px] text-[hsl(var(--muted-foreground))] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[hsl(var(--cyan))]">
            Voir le rapport <ChevronRight className="h-3 w-3" />
          </div>
        </div>

        {isFinal && (
          <div className="h-[1px] bg-gradient-to-r from-[hsl(var(--emerald)/0.6)] via-[hsl(var(--cyan)/0.3)] to-transparent" />
        )}
      </div>
    </Link>
  );
}
