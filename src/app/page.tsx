import type { Metadata } from "next";
import { SetupDashboard } from "@/components/setup/setup-dashboard";

export const metadata: Metadata = {
  title: "Setup",
  description: "Configuration PC gaming complète — Ryzen 7 3800X, RTX 3060, 32 Go DDR4.",
};

export default function HomePage() {
  return <SetupDashboard />;
}
