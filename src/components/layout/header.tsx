"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Setup" },
  { href: "/synthese", label: "Synthèse OC" },
  { href: "/comparatif", label: "SBC" },
];

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[hsl(var(--background)/0.75)] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-7 w-7 items-center justify-center rounded-md bg-[hsl(var(--cyan)/0.12)] ring-1 ring-[hsl(var(--cyan)/0.3)] transition-all duration-200 group-hover:bg-[hsl(var(--cyan)/0.2)] group-hover:ring-[hsl(var(--cyan)/0.5)]">
            <Cpu className="h-3.5 w-3.5 text-[hsl(var(--cyan))]" />
            <span className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ boxShadow: "0 0 12px hsl(var(--cyan) / 0.3)" }} />
          </div>
          <div>
            <span className="font-[family-name:var(--font-syne)] text-sm font-700 tracking-tight">
              Upgrade Config
            </span>
            <span className="ml-2 text-[10px] font-[family-name:var(--font-jetbrains)] text-[hsl(var(--cyan)/0.7)] tracking-widest uppercase">
              2026
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-0.5 sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-150 rounded-md",
                  isActive
                    ? "text-[hsl(var(--foreground))]"
                    : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-[hsl(var(--secondary))]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="group relative flex h-8 w-8 items-center justify-center rounded-md border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--muted-foreground))] transition-all duration-200 hover:border-[hsl(var(--cyan)/0.3)] hover:text-[hsl(var(--cyan))]"
          aria-label="Basculer le thème"
        >
          <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </button>
      </div>

      {/* Mobile nav */}
      <div className="flex gap-1 border-t border-white/[0.04] px-4 py-1.5 sm:hidden">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors",
                isActive
                  ? "bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]"
                  : "text-[hsl(var(--muted-foreground))]"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
