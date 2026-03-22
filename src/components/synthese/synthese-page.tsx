"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { rapports, getRapportFinal } from "@/data/rapports";

const finalId = getRapportFinal().id;
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OcChart } from "@/components/synthese/oc-chart";
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function StatusIcon({ stable, bsod }: { stable: boolean; bsod: boolean }) {
  if (bsod) return <XCircle className="h-3.5 w-3.5 text-[hsl(var(--rose))]" />;
  if (stable) return <CheckCircle2 className="h-3.5 w-3.5 text-[hsl(var(--emerald))]" />;
  return <AlertCircle className="h-3.5 w-3.5 text-[hsl(var(--amber))]" />;
}

function TempDisplay({ temp }: { temp: number | null }) {
  if (temp === null)
    return <span className="num text-[hsl(var(--muted-foreground))]">—</span>;
  const cls = temp > 90 ? "temp-hot" : temp > 80 ? "temp-warm" : "temp-cool";
  return <span className={cn("num font-semibold", cls)}>{temp} °C</span>;
}

export function SynthesePage() {
  const stableCount = rapports.filter((r) => r.profil.stable).length;
  const bsodCount   = rapports.filter((r) => r.profil.bsod).length;

  return (
    <div className="space-y-12">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-2">
        <div className="pointer-events-none absolute -top-16 left-0 h-40 w-64 rounded-full bg-[hsl(var(--cyan))] opacity-[0.06] blur-3xl" />
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--cyan)/0.8)]">
          Ryzen 7 3800X
        </p>
        <h1 className="gradient-text text-4xl font-bold tracking-tight">Synthèse Overclocking</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {rapports.length} tests &mdash; {stableCount} stables &middot; {bsodCount} BSOD &middot;{" "}
          <span className="num font-semibold text-[hsl(var(--emerald))]">Profil final : 4.2 GHz @ 1.28V</span>
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tests réalisés",  value: rapports.length, color: "text-[hsl(var(--foreground))]" },
          { label: "Profils stables", value: stableCount,     color: "text-[hsl(var(--emerald))]" },
          { label: "BSOD",            value: bsodCount,        color: "text-[hsl(var(--rose))]" },
          { label: "Fréquence finale",value: "4.2G",           color: "text-[hsl(var(--cyan))]" },
        ].map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 text-center">
              <p className={cn("num text-3xl font-bold tracking-tight", stat.color)}>{stat.value}</p>
              <p className="mt-1.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-[hsl(var(--cyan))]" />
              Températures & fréquences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OcChart rapports={rapports} />
          </CardContent>
        </Card>
      </motion.section>

      {/* Test grid */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-syne)] text-base font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Détail des tests
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--border))] to-transparent" />
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rapports.map((rapport) => (
            <motion.div key={rapport.id} variants={item}>
              <Link href={`/rapports/${rapport.id}`} className="block h-full">
                <div className={cn(
                  "group relative h-full overflow-hidden rounded-xl border transition-all duration-300",
                  rapport.id === finalId
                    ? "border-[hsl(var(--emerald)/0.3)] bg-[hsl(var(--emerald)/0.04)] hover:border-[hsl(var(--emerald)/0.5)]"
                    : rapport.profil.bsod
                    ? "border-[hsl(var(--rose)/0.2)] bg-[hsl(var(--rose)/0.03)]"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--cyan)/0.2)]"
                )}>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
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
                        <Badge variant={rapport.profil.bsod ? "failed" : rapport.profil.stable ? "stable" : "warning"}>
                          {rapport.profil.bsod ? "BSOD" : rapport.profil.stable ? "Stable" : "Instable"}
                        </Badge>
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
                        <TempDisplay temp={rapport.profil.tempMax} />
                      </div>
                      <div>
                        <p className="text-[hsl(var(--muted-foreground))]">Durée</p>
                        <p className="num font-semibold">{rapport.profil.duree}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-1 font-[family-name:var(--font-jetbrains)] text-[10px] text-[hsl(var(--muted-foreground))] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[hsl(var(--cyan))]">
                      Rapport complet <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Conclusion */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <div className="relative overflow-hidden rounded-xl border border-[hsl(var(--emerald)/0.2)] bg-gradient-to-br from-[hsl(var(--emerald)/0.05)] to-[hsl(var(--card))] p-6">
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[hsl(var(--emerald))] opacity-[0.06] blur-3xl" />
          <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--emerald))] mb-2">
            Conclusion
          </p>
          <p className="relative text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl">
            Le Ryzen 7 3800X atteint son plafond OC à{" "}
            <strong className="text-[hsl(var(--foreground))] num">4.2 GHz all-core</strong> avec 1.28V.
            Au-delà (4.3 GHz), le CPU devient instable indépendamment du refroidissement.
            L&apos;Arctic Liquid Freezer III Pro 360mm a permis d&apos;atteindre un pic de{" "}
            <strong className="num text-[hsl(var(--emerald))]">82.75 °C</strong> au lieu de 97.1 °C
            avec le Wraith Prism, rendant ce profil viable en usage quotidien.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
