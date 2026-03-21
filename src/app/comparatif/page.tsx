import type { Metadata } from "next";
import { ComparatifPage } from "@/components/comparatif/comparatif-page";

export const metadata: Metadata = {
  title: "Comparatif SBC",
  description: "Comparatif des Single Board Computers : Raspberry Pi Zero W, Pi 2, Pi 3 et Orange Pi 3.",
};

export default function Comparatif() {
  return <ComparatifPage />;
}
