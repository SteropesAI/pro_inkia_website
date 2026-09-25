import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCampaignByCode, campaigns, BRAND } from "@/data/campaigns";
import CampaignHero from "@/components/campaign/CampaignHero";
import CollectionGallery from "@/components/campaign/CollectionGallery";
import AvantApresStrip from "@/components/campaign/AvantApresStrip";
import SalesArguments from "@/components/campaign/SalesArguments";
import PersonalizeCTA from "@/components/campaign/PersonalizeCTA";
import CampaignFooter from "@/components/campaign/CampaignFooter";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateStaticParams() {
  return campaigns.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const campaign = getCampaignByCode(code);
  if (!campaign) {
    return { title: `Code inconnu | ${BRAND.name}` };
  }
  return {
    title: `${campaign.universe} | ${BRAND.name}`,
    description: `${campaign.heroLines.line1} ${campaign.heroLines.line2} ${campaign.heroLines.line3} — ${BRAND.tagline}`,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { code } = await params;
  const campaign = getCampaignByCode(code);
  if (!campaign) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <CampaignHero campaign={campaign} />
      <SalesArguments campaign={campaign} />
      <AvantApresStrip campaign={campaign} />
      <CollectionGallery campaign={campaign} />
      <PersonalizeCTA campaign={campaign} />
      <CampaignFooter />
    </div>
  );
}
