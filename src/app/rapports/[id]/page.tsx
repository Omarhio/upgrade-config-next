import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { rapports, getRapportById } from "@/data/rapports";
import { RapportDetail } from "@/components/rapports/rapport-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return rapports.map((r) => ({ id: String(r.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const rapport = getRapportById(Number(id));
  if (!rapport) return {};
  return {
    title: rapport.titre,
    description: rapport.analyse.slice(0, 120) + "...",
  };
}

export default async function RapportPage({ params }: Props) {
  const { id } = await params;
  const rapport = getRapportById(Number(id));
  if (!rapport) notFound();
  return <RapportDetail rapport={rapport} allRapports={rapports} />;
}
