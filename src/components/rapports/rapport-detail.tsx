"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Rapport } from "@/data/rapports";
import { getRapportFinal, getPrevRapport, getNextRapport } from "@/data/rapports";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OcChart } from "@/components/ui/charts/oc-chart";
import { TempValue } from "@/components/ui/temp-value";
import { StatusBadge } from "@/components/rapports/status-badge";
import {
  ChevronLeft, ChevronRight,
  Cpu, Thermometer, Zap, Clock, BookOpen, Shield, Eye,
} from "lucide-react";

const finalId = getRapportFinal().id;

interface Props {
  rapport: Rapport;
  allRapports: Rapport[];
}

export function RapportDetail({ rapport, allRapports }: Props) {
  const prev = getPrevRapport(rapport.id);
  const next = getNextRapport(rapport.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-[family-name:var(--font-jetbrains)] text-xs text-[hsl(var(--muted-foreground))]">
        <Link href="/" className="transition-colors hover:text-[hsl(var(--cyan))]">Setup</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/synthese" className="transition-colors hover:text-[hsl(var(--cyan))]">Synthèse OC</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-[hsl(var(--foreground))]">Test {rapport.id}</span>
      </nav>

      {/* Title */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={rapport.methode === "BIOS" ? "bios" : "ryzenmaster"}>{rapport.methode}</Badge>
          <StatusBadge stable={rapport.profil.stable} bsod={rapport.profil.bsod} withIcon />
          {rapport.id === finalId && <Badge variant="stable">Profil final</Badge>}
        </div>
        <h1 className="gradient-text text-2xl font-bold tracking-tight leading-snug sm:text-3xl">
          {rapport.titre}
        </h1>
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[hsl(var(--muted-foreground))]">
          BIOS {rapport.bios} &middot; {rapport.cooler}
        </p>
      </div>

      {/* Profil + Chart */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-[hsl(var(--cyan))]" />
              Profil OC
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {[
              { label: "Fréquence", value: <span className="num text-[hsl(var(--cyan))]">{rapport.profil.frequence}</span>, icon: <Zap className="h-3.5 w-3.5" /> },
              { label: "Vcore",     value: <span className="num">{rapport.profil.vcore}</span>,          icon: <Zap className="h-3.5 w-3.5" /> },
              { label: "Temp. max", value: <TempValue temp={rapport.profil.tempMax} />,                   icon: <Thermometer className="h-3.5 w-3.5" /> },
              { label: "RAM",       value: <span className="num">{rapport.profil.ram}</span>,             icon: <Cpu className="h-3.5 w-3.5" /> },
              { label: "FCLK",      value: <span className="num">{rapport.profil.fclk}</span>,            icon: <Cpu className="h-3.5 w-3.5" /> },
              { label: "Outil",     value: <span className="num text-xs">{rapport.profil.outil}</span>,  icon: <Shield className="h-3.5 w-3.5" /> },
              { label: "Durée",     value: <span className="num">{rapport.profil.duree}</span>,           icon: <Clock className="h-3.5 w-3.5" /> },
            ].map(({ label, value, icon }) => (
              <div key={label}>
                <div className="flex items-center justify-between py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                    <span className="text-[hsl(var(--muted-foreground)/0.5)]">{icon}</span>
                    {label}
                  </span>
                  <span className="font-semibold">{value}</span>
                </div>
                <div className="h-px bg-[hsl(var(--border))]" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Comparaison des tests</CardTitle>
          </CardHeader>
          <CardContent>
            <OcChart rapports={allRapports} highlightId={rapport.id} />
          </CardContent>
        </Card>
      </div>

      {/* Analyse */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <BookOpen className="h-4 w-4 text-[hsl(var(--cyan))]" />
            Analyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{rapport.analyse}</p>
        </CardContent>
      </Card>

      {/* Recommandations + Surveillance */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-[hsl(var(--cyan))]" />
              Recommandations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {rapport.recommandations.map((rec, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="num mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[hsl(var(--cyan)/0.1)] text-[10px] font-bold text-[hsl(var(--cyan))]">
                    {i + 1}
                  </span>
                  <span className="text-[hsl(var(--muted-foreground))] leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-[hsl(var(--cyan))]" />
              Surveillance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{rapport.surveillance}</p>
          </CardContent>
        </Card>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/rapports/${prev.id}`}
            className="group flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm transition-all duration-200 hover:border-[hsl(var(--cyan)/0.3)] hover:bg-[hsl(var(--secondary))]"
          >
            <ChevronLeft className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200 group-hover:-translate-x-0.5" />
            <div>
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Précédent</p>
              <p className="font-semibold">Test {prev.id}</p>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link
            href={`/rapports/${next.id}`}
            className="group flex items-center gap-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm transition-all duration-200 hover:border-[hsl(var(--cyan)/0.3)] hover:bg-[hsl(var(--secondary))]"
          >
            <div className="text-right">
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Suivant</p>
              <p className="font-semibold">Test {next.id}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        ) : <div />}
      </div>
    </motion.div>
  );
}
