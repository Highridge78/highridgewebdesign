"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  ["/agency-os/dashboard", "Dashboard"],
  ["/agency-os/projects", "Projects"],
  ["/agency-os/onboarding", "Onboarding"],
  ["/agency-os/seo", "SEO Planner"],
  ["/agency-os/briefs", "Briefs"],
  ["/agency-os/reports", "Reports"],
  ["/agency-os/sops", "SOPs"],
  ["/agency-os/ai", "AI Assist"],
  ["/agency-os/automation", "Automation"],
  ["/agency-os/revenue", "Revenue"],
  ["/agency-os/clients", "Clients"],
  ["/agency-os/communications", "Comms"],
  ["/agency-os/insights", "Insights"],
  ["/agency-os/templates", "Templates"],
  ["/agency-os/proposals/presets", "Presets"],
  ["/agency-os/products", "Products"],
  ["/agency-os/performance", "Performance"],
  ["/agency-os/growth", "Growth"],
] as const;

export function InternalShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(14,165,233,.10),transparent_38%),radial-gradient(circle_at_85%_0%,rgba(56,189,248,.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-300">Highridge Agency OS · Internal</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          <nav className="mt-5 flex flex-wrap gap-2">
            {navItems.map(([href, label]) => {
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-cyan-400 font-semibold text-slate-950"
                      : "border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </header>

        <section className="mt-6">{children}</section>
      </div>
    </main>
  );
}
