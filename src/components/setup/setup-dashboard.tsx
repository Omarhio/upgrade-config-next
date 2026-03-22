"use client";

import { motion } from "framer-motion";
import { Img as Image } from "@/components/ui/img";
import Link from "next/link";
import { components } from "@/data/setup";
import { rapports, getRapportFinal } from "@/data/rapports";
import { RapportCard } from "@/components/rapports/rapport-card";
import { SectionHeader } from "@/components/ui/section-header";
import { staggerContainer, fadeUpItem } from "@/lib/motion";
import { Cpu, HardDrive, Zap, Thermometer, ChevronRight, Activity } from "lucide-react";

const categoryLabel: Record<string, string> = {
  cpu: "CPU", gpu: "GPU", ram: "RAM", mobo: "Mobo",
  storage: "Storage", psu: "PSU", cooler: "Cooler", case: "Case",
};

const categoryIcon: Record<string, React.ReactNode> = {
  cpu: <Cpu className="h-3 w-3" />,
  gpu: <Zap className="h-3 w-3" />,
  storage: <HardDrive className="h-3 w-3" />,
  cooler: <Thermometer className="h-3 w-3" />,
};

export function SetupDashboard() {
  const finalRapport = getRapportFinal();

  return (
    <div className="space-y-14">

      {/* ── HERO ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-56 w-96 rounded-full opacity-[0.07] blur-3xl dark:opacity-[0.12]"
          style={{ background: "hsl(var(--cyan))" }}
        />
        <div className="relative space-y-2">
          <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-[hsl(var(--cyan)/0.8)]">
            Configuration — Mars 2026
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="gradient-text">Mon Setup</span>
          </h1>
          <p className="max-w-xl text-[hsl(var(--muted-foreground))] leading-relaxed">
            Ryzen 7 3800X overclockée à{" "}
            <span className="num font-semibold text-[hsl(var(--foreground))]">
              {finalRapport.profil.frequence}
            </span>{" "}
            @ <span className="num text-[hsl(var(--foreground))]">{finalRapport.profil.vcore}</span>{" "}
            · <span className="num text-[hsl(var(--emerald))]">{finalRapport.profil.tempMax} °C</span> max
          </p>
        </div>
      </motion.div>

      {/* ── COMPOSANTS ── */}
      <section>
        <SectionHeader title="Composants" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {components.map((comp) => (
            <motion.div key={comp.id} variants={fadeUpItem}>
              <div className="group relative overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 hover:border-[hsl(var(--cyan)/0.2)] hover:shadow-[0_0_0_1px_hsl(var(--cyan)/0.06),0_8px_24px_hsl(var(--background)/0.6)]">
                <div className="p-4">
                  <div className="flex items-start gap-3.5">
                    {comp.image ? (
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                        <Image
                          src={comp.image}
                          alt={comp.model}
                          fill
                          className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                        {categoryIcon[comp.category] ?? <Cpu className="h-4 w-4" />}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center gap-1.5">
                        <span className="text-[hsl(var(--muted-foreground))]">
                          {categoryIcon[comp.category]}
                        </span>
                        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                          {categoryLabel[comp.category]}
                        </span>
                      </div>
                      <p className="truncate text-sm font-semibold leading-tight">{comp.model}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{comp.brand}</p>
                    </div>
                  </div>

                  {Object.keys(comp.specs).length > 0 && (
                    <>
                      <div className="my-3 h-px bg-[hsl(var(--border))]" />
                      <dl className="space-y-1.5">
                        {Object.entries(comp.specs).slice(0, 3).map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-2 text-xs">
                            <dt className="text-[hsl(var(--muted-foreground))] shrink-0">{k}</dt>
                            <dd className="num text-right font-medium text-[hsl(var(--foreground)/0.9)]">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  )}
                </div>
                <div className="h-[1px] w-0 bg-gradient-to-r from-[hsl(var(--cyan)/0.6)] to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── OVERCLOCKING ── */}
      <section>
        <SectionHeader
          title="Overclocking"
          action={
            <Link
              href="/synthese"
              className="flex items-center gap-1 text-xs font-[family-name:var(--font-jetbrains)] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--cyan))]"
            >
              Synthèse <ChevronRight className="h-3 w-3" />
            </Link>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rapports.map((rapport) => (
            <motion.div key={rapport.id} variants={fadeUpItem}>
              <RapportCard
                rapport={rapport}
                isFinal={rapport.id === finalRapport.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PROFIL FINAL ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="relative overflow-hidden rounded-xl border border-[hsl(var(--emerald)/0.25)] bg-gradient-to-br from-[hsl(var(--emerald)/0.06)] via-[hsl(var(--card))] to-[hsl(var(--card))]">
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[hsl(var(--emerald))] opacity-[0.06] blur-3xl" />

          <div className="relative p-6">
            <div className="mb-1 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-[hsl(var(--emerald))]" />
              <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--emerald))]">
                Profil final validé
              </span>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="num text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                  {finalRapport.profil.frequence}
                </p>
                <p className="num mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  {finalRapport.profil.vcore} · {finalRapport.profil.tempMax} °C · {finalRapport.profil.duree} OCCT AVX2
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-3">
                {[
                  { label: "RAM",    value: finalRapport.profil.ram },
                  { label: "FCLK",   value: finalRapport.profil.fclk },
                  { label: "Cooler", value: "Arctic LF III Pro 360" },
                  { label: "BIOS",   value: finalRapport.bios },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {label}
                    </p>
                    <p className="num mt-0.5 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
