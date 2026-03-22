"use client";

import { motion } from "framer-motion";
import { rapports, getRapportFinal } from "@/data/rapports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OcChart } from "@/components/ui/charts/oc-chart";
import { RapportCard } from "@/components/rapports/rapport-card";
import { SectionHeader } from "@/components/ui/section-header";
import { staggerContainer, fadeUpItem } from "@/lib/motion";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const finalRapport = getRapportFinal();

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
          <span className="num font-semibold text-[hsl(var(--emerald))]">
            Profil final : {finalRapport.profil.frequence} @ {finalRapport.profil.vcore}
          </span>
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Tests réalisés",  value: rapports.length,              color: "text-[hsl(var(--foreground))]" },
          { label: "Profils stables", value: stableCount,                  color: "text-[hsl(var(--emerald))]" },
          { label: "BSOD",            value: bsodCount,                     color: "text-[hsl(var(--rose))]" },
          { label: "Fréquence finale",value: finalRapport.profil.frequence, color: "text-[hsl(var(--cyan))]" },
        ].map((stat) => (
          <motion.div key={stat.label} variants={fadeUpItem}>
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
        <SectionHeader title="Détail des tests" />

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rapports.map((rapport) => (
            <motion.div key={rapport.id} variants={fadeUpItem}>
              <RapportCard
                rapport={rapport}
                isFinal={rapport.id === finalRapport.id}
                fullHeight
              />
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
            <strong className="text-[hsl(var(--foreground))] num">{finalRapport.profil.frequence} all-core</strong> avec {finalRapport.profil.vcore}.
            Au-delà (4.3 GHz), le CPU devient instable indépendamment du refroidissement.
            L&apos;Arctic Liquid Freezer III Pro 360mm a permis d&apos;atteindre un pic de{" "}
            <strong className="num text-[hsl(var(--emerald))]">{finalRapport.profil.tempMax} °C</strong> au lieu de 97.1 °C
            avec le Wraith Prism, rendant ce profil viable en usage quotidien.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
