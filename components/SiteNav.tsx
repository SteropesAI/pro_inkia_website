"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { BRAND } from "@/data/campaigns";
import { useCart } from "@/lib/cart";

const LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "/collection", label: "Collection" },
  { href: "/supports", label: "Supports" },
  { href: "/personnaliser", label: "Personnaliser" },
  { href: "/proposition-deco", label: "Proposition déco" },
  { href: "/avant-apres", label: "Avant/après" },
  { href: "/asso", label: "Associations" },
  { href: "/conseil", label: "Conseil" },
  { href: "/contact", label: "Contact" },
];

function CartIcon({ dark }: { dark: boolean }) {
  const { totals, hydrated } = useCart();
  const count = hydrated ? totals.itemCount : 0;
  return (
    <Link
      href="/panier"
      className={`relative p-2 rounded-md transition-colors ${
        dark ? "hover:bg-white/10" : "hover:bg-neutral-100"
      }`}
      aria-label={`Panier${count ? ` (${count})` : ""}`}
    >
      <ShoppingBag size={20} />
      {count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full bg-[#66C6E8] text-neutral-950 text-[10px] font-bold flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}

export default function SiteNav({
  variant = "auto",
}: {
  variant?: "light" | "dark" | "auto";
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onCampaign = pathname?.startsWith("/c/") ?? false;
  const onWizard =
    pathname === "/personnaliser" || pathname?.startsWith("/personnaliser/");
  const resolved =
    variant === "auto"
      ? onCampaign || onWizard
        ? "dark"
        : "light"
      : variant;
  const dark = resolved === "dark";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || (pathname?.startsWith(href + "/") ?? false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur ${
        dark
          ? "bg-neutral-950/90 border-white/10 text-white"
          : "bg-white/90 border-neutral-200 text-neutral-900"
      }`}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight shrink-0">
          Ink<span className="text-[#66C6E8]">IA</span>.art
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5 text-sm">
          {LINKS.map((l) => {
            const active = !l.external && isActive(l.href);
            const cls = `px-3 py-1.5 rounded-md transition-colors ${
              active
                ? dark
                  ? "bg-white/10 text-white font-medium"
                  : "bg-neutral-100 text-neutral-950 font-semibold"
                : dark
                  ? "text-white/75 hover:text-white hover:bg-white/5"
                  : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50"
            }`;
            return (
              <li key={l.href + l.label}>
                {l.external ? (
                  <a href={l.href} className={cls}>
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className={cls}>
                    {l.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 shrink-0">
          <p
            className={`hidden xl:block text-xs italic mr-2 ${
              dark ? "text-white/45" : "text-neutral-400"
            }`}
          >
            {BRAND.tagline}
          </p>
          <CartIcon dark={dark} />
          <button
            type="button"
            className={`lg:hidden p-2 rounded-md ${
              dark ? "hover:bg-white/10" : "hover:bg-neutral-100"
            }`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          className={`lg:hidden border-t ${
            dark ? "border-white/10 bg-neutral-950" : "border-neutral-200 bg-white"
          }`}
        >
          <ul className="container mx-auto px-4 py-3 space-y-1">
            {LINKS.map((l) => (
              <li key={"m-" + l.href + l.label}>
                {l.external ? (
                  <a
                    href={l.href}
                    className="block px-3 py-2.5 rounded-md text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    href={l.href}
                    className="block px-3 py-2.5 rounded-md text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link
                href="/panier"
                className="block px-3 py-2.5 rounded-md text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                Panier
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
