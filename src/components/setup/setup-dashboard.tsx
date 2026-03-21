"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { components } from "@/data/setup";
import { rapports, getRapportFinal } from "@/data/rapports";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  HardDrive,
  Zap,
  Thermometer,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.055 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38 } },
};

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

function TempValue({ temp }: { temp: number | null }) {
  if (temp === null) return <span className="text-[hsl(var(--muted-foreground))] num">—</span>;
  const cls =
    temp > 90 ? "temp-hot" : temp > 80 ? "temp-warm" : "temp-cool";
  return <span className={cn("num font-semibold", cls)}>{temp} °C</span>;
}

function StatusIcon({ stable, bsod }: { stable: boolean; bsod: boolean }) {
  if (bsod) return <XCircle className="h-4 w-4 text-[hsl(var(--rose))]" />;
  if (stable) return <CheckCircle2 className="h-4 w-4 text-[hsl(var(--emerald))]" />;
  return <AlertCircle className="h-4 w-4 text-[hsl(var(--amber))]" />;
}

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
        {/* Background glow blob */}
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
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-syne)] text-base font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Composants
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--border))] to-transparent" />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {components.map((comp) => (
            <motion.div key={comp.id} variants={item}>
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
                {/* Bottom accent line */}
                <div className="h-[1px] w-0 bg-gradient-to-r from-[hsl(var(--cyan)/0.6)] to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── OVERCLOCKING ── */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-[family-name:var(--font-syne)] text-base font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
              Overclocking
            </h2>
            <div className="h-px w-24 bg-gradient-to-r from-[hsl(var(--border))] to-transparent" />
          </div>
          <Link
            href="/synthese"
            className="flex items-center gap-1 text-xs font-[family-name:var(--font-jetbrains)] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--cyan))]"
          >
            Synthèse <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rapports.map((rapport) => (
            <motion.div key={rapport.id} variants={item}>
              <Link href={`/rapports/${rapport.id}`} className="block">
                <div className={cn(
                  "group relative overflow-hidden rounded-xl border transition-all duration-300",
                  rapport.id === 6
                    ? "border-[hsl(var(--emerald)/0.3)] bg-[hsl(var(--emerald)/0.04)] hover:border-[hsl(var(--emerald)/0.5)] hover:shadow-[0_0_24px_hsl(var(--emerald)/0.08)]"
                    : rapport.profil.bsod
                    ? "border-[hsl(var(--rose)/0.2)] bg-[hsl(var(--rose)/0.03)] hover:border-[hsl(var(--rose)/0.3)]"
                    : "border-[hsl(var(--border))] bg-[hsl(var(--card))] hover:border-[hsl(var(--cyan)/0.2)] hover:shadow-[0_0_16px_hsl(var(--cyan)/0.04)]"
                )}>
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
                        <Badge variant={rapport.profil.bsod ? "failed" : rapport.profil.stable ? "stable" : "warning"}>
                          {rapport.profil.bsod ? "BSOD" : rapport.profil.stable ? "Stable" : "Instable"}
                        </Badge>
                      </div>
                    </div>

                    <p className="mb-3 text-[13px] font-semibold font-[family-name:var(--font-syne)] leading-snug">
                      {rapport.titre}
                    </p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                      <div>
                        <p className="mb-0.5 text-[hsl(var(--muted-foreground))]">Fréquence</p>
                        <p className="num font-semibold text-[hsl(var(--cyan))]">{rapport.profil.frequence}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 text-[hsl(var(--muted-foreground))]">Vcore</p>
                        <p className="num font-semibold">{rapport.profil.vcore}</p>
                      </div>
                      <div>
                        <p className="mb-0.5 text-[hsl(var(--muted-foreground))]">Temp. max</p>
                        <TempValue temp={rapport.profil.tempMax} />
                      </div>
                      <div>
                        <p className="mb-0.5 text-[hsl(var(--muted-foreground))]">Durée</p>
                        <p className="num font-semibold">{rapport.profil.duree}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end gap-1 text-[11px] text-[hsl(var(--muted-foreground))] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-[hsl(var(--cyan))]">
                      Voir le rapport <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                  {rapport.id === 6 && (
                    <div className="h-[1px] bg-gradient-to-r from-[hsl(var(--emerald)/0.6)] via-[hsl(var(--cyan)/0.3)] to-transparent" />
                  )}
                </div>
              </Link>
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
          {/* Decorative glow */}
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
                  { label: "RAM", value: finalRapport.profil.ram },
                  { label: "FCLK", value: finalRapport.profil.fclk },
                  { label: "Cooler", value: "Arctic LF III Pro 360" },
                  { label: "BIOS", value: finalRapport.bios },
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
