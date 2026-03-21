"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { sbcs } from "@/data/sbc";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Cpu, Wifi, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComparatifPage() {
  const [activeTab, setActiveTab] = useState(sbcs[0].id);

  return (
    <div className="space-y-12">

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="relative space-y-2">
        <div className="pointer-events-none absolute -top-16 right-0 h-40 w-64 rounded-full bg-[hsl(var(--cyan))] opacity-[0.05] blur-3xl" />
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--cyan)/0.8)]">
          Single Board Computers
        </p>
        <h1 className="gradient-text text-4xl font-bold tracking-tight">Comparatif SBC</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          {sbcs.length} cartes &mdash; dont tests d&apos;overclocking sur le Raspberry Pi 3
        </p>
      </motion.div>

      {/* Table */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-syne)] text-base font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Vue globale
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--border))] to-transparent" />
        </div>

        <div className="overflow-hidden rounded-xl border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)]">
                {["Carte", "CPU", "RAM", "WiFi", "Ethernet", "Année"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sbcs.map((sbc) => {
                const cpu  = sbc.specs.find((s) => s.label === "CPU")?.value ?? "—";
                const ram  = sbc.specs.find((s) => s.label === "RAM")?.value ?? "—";
                const wifi = sbc.specs.find((s) => s.label === "WiFi")?.value;
                const eth  = sbc.specs.find((s) => s.label === "Ethernet")?.value ?? "—";
                const isActive = activeTab === sbc.id;

                return (
                  <tr
                    key={sbc.id}
                    onClick={() => setActiveTab(sbc.id)}
                    className={cn(
                      "cursor-pointer border-b border-[hsl(var(--border))] last:border-0 transition-all duration-150",
                      isActive
                        ? "bg-[hsl(var(--cyan)/0.04)]"
                        : "hover:bg-[hsl(var(--muted)/0.3)]"
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {sbc.id === "rpi-3b" && (
                          <Star className="h-3 w-3 shrink-0 text-[hsl(var(--amber))]" />
                        )}
                        <span className="font-semibold">{sbc.model}</span>
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyan))]" />
                        )}
                      </div>
                    </td>
                    <td className="max-w-[160px] truncate px-4 py-3 font-[family-name:var(--font-jetbrains)] text-xs text-[hsl(var(--muted-foreground))]">
                      {cpu}
                    </td>
                    <td className="num px-4 py-3 text-xs">{ram}</td>
                    <td className="px-4 py-3">
                      {wifi ? (
                        <div className="flex items-center gap-1">
                          <Wifi className="h-3 w-3 text-[hsl(var(--emerald))]" />
                          <span className="num text-[10px] text-[hsl(var(--muted-foreground))]">
                            {wifi.includes("ac") ? "5GHz" : "2.4G"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[hsl(var(--muted-foreground))]">—</span>
                      )}
                    </td>
                    <td className="num px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{eth}</td>
                    <td className="num px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{sbc.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Fiches */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-[family-name:var(--font-syne)] text-base font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Fiches détaillées
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[hsl(var(--border))] to-transparent" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 h-auto flex-wrap gap-1 bg-[hsl(var(--muted))]">
            {sbcs.map((sbc) => (
              <TabsTrigger
                key={sbc.id}
                value={sbc.id}
                className="font-[family-name:var(--font-jetbrains)] text-xs data-[state=active]:bg-[hsl(var(--background))] data-[state=active]:text-[hsl(var(--foreground))]"
              >
                {sbc.model}
                {sbc.id === "rpi-3b" && <Star className="ml-1 h-2.5 w-2.5 text-[hsl(var(--amber))]" />}
              </TabsTrigger>
            ))}
          </TabsList>

          {sbcs.map((sbc) => (
            <TabsContent key={sbc.id} value={sbc.id}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={sbc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="grid gap-5 lg:grid-cols-3"
                >
                  {/* Image + meta */}
                  <Card className="lg:col-span-1">
                    <CardContent className="p-5 space-y-4">
                      {sbc.image && (
                        <div className="relative mx-auto h-44 w-full overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
                          <Image
                            src={sbc.image}
                            alt={sbc.name}
                            fill
                            className="object-contain p-4"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-[family-name:var(--font-syne)] font-bold">{sbc.name}</h3>
                          {sbc.id === "rpi-3b" && <Badge variant="bios">OC testé</Badge>}
                        </div>
                        <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[11px] text-[hsl(var(--muted-foreground))]">
                          {sbc.brand} &middot; {sbc.year}
                        </p>
                      </div>
                      {sbc.notes && (
                        <p className="border-l-2 border-[hsl(var(--cyan)/0.4)] pl-3 text-xs italic text-[hsl(var(--muted-foreground))]">
                          {sbc.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Specs */}
                  <Card className={sbc.ocProfiles ? "lg:col-span-1" : "lg:col-span-2"}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Cpu className="h-4 w-4 text-[hsl(var(--cyan))]" />
                        Spécifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-0">
                      {sbc.specs.map((spec) => (
                        <div key={spec.label}>
                          <div className="flex items-start justify-between gap-4 py-2 text-sm">
                            <dt className="shrink-0 text-[hsl(var(--muted-foreground))]">{spec.label}</dt>
                            <dd className="num text-right text-xs font-medium">{spec.value}</dd>
                          </div>
                          <div className="h-px bg-[hsl(var(--border))]" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* OC Profiles */}
                  {sbc.ocProfiles && (
                    <Card className="lg:col-span-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm">
                          <Activity className="h-4 w-4 text-[hsl(var(--emerald))]" />
                          Overclocking
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {sbc.ocProfiles.map((profile) => (
                          <div
                            key={profile.label}
                            className={cn(
                              "rounded-lg border p-3 transition-colors",
                              profile.recommended
                                ? "border-[hsl(var(--emerald)/0.3)] bg-[hsl(var(--emerald)/0.05)]"
                                : "border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]"
                            )}
                          >
                            <div className="mb-1.5 flex items-center justify-between">
                              <span className="text-xs font-semibold">{profile.label}</span>
                              {profile.recommended && (
                                <Badge variant="stable" className="text-[9px]">Recommandé</Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-[family-name:var(--font-jetbrains)] text-[11px] text-[hsl(var(--muted-foreground))]">
                              <span>{profile.frequence}</span>
                              <span>ov {profile.overVoltage}</span>
                              <span className={profile.tempMax > 70 ? "text-[hsl(var(--amber))]" : "text-[hsl(var(--emerald))]"}>
                                {profile.tempMax} °C
                              </span>
                              <span className="text-[hsl(var(--emerald))]">
                                {profile.stable ? "✓ Stable" : "✗ Instable"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
