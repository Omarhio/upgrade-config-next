import type { Metadata } from "next";
import { SynthesePage } from "@/components/synthese/synthese-page";

export const metadata: Metadata = {
  title: "Synthèse OC",
  description: "Synthèse globale des 6 tests d'overclocking Ryzen 7 3800X.",
};

export default function Synthese() {
  return <SynthesePage />;
}
