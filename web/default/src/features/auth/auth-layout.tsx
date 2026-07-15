/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from "@tanstack/react-router";
import { Activity, Network, Route } from "lucide-react";
import { useTranslation } from "react-i18next";

import { BrandMark, BrandWordmark } from "@/components/brand-wordmark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PageTransition } from "@/components/page-transition";
import { ThemeSwitch } from "@/components/theme-switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useSystemConfig } from "@/hooks/use-system-config";
import { isHuichuanBrand } from "@/lib/brand";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation();
  const { systemName, logo, loading } = useSystemConfig();
  const displayName = systemName || "huichuan";
  const statusItems = [
    { label: t("One gateway for every model"), icon: Network },
    { label: t("Intelligent routing and retry"), icon: Route },
    { label: t("Logs and observability"), icon: Activity },
  ];

  return (
    <div className="bg-background text-foreground relative grid min-h-svh overflow-x-hidden lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)]">
      <aside className="border-border/60 bg-gradient-to-br from-violet-50 via-background to-indigo-100/70 text-foreground relative hidden min-h-svh overflow-hidden border-r lg:flex lg:flex-col dark:border-white/10 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950 dark:text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,.06)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_95%)] bg-[size:52px_52px] opacity-25 dark:bg-[linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-32 size-[34rem] rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-600/30"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-10rem] bottom-[-10rem] size-[32rem] rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/20"
        />

        <Link
          to="/"
          className="relative z-10 flex items-center gap-3 px-10 py-8 transition-opacity hover:opacity-80"
        >
          <BrandMark className="size-9" />
          <BrandWordmark
            name={displayName}
            className="text-foreground text-base dark:text-white"
          />
        </Link>

        <div className="relative z-10 my-auto px-10 pb-20 xl:px-16">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3 py-1.5 text-xs font-medium text-violet-700 backdrop-blur-sm dark:border-violet-300/20 dark:bg-violet-300/10 dark:text-violet-100">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {t("Unified AI infrastructure is ready")}
          </div>
          <p className="text-sm font-semibold tracking-[0.28em] text-violet-600 uppercase dark:text-violet-300">
            HUICHUAN AI
          </p>
          <h2 className="mt-5 max-w-xl text-4xl leading-tight font-bold tracking-[-0.04em] xl:text-5xl">
            {t("One gateway. Every AI model.")}
          </h2>
          <p className="text-muted-foreground mt-5 max-w-lg text-base leading-7 dark:text-slate-300">
            {t(
              "Connect models, manage access, control spend and observe every request through one reliable API platform.",
            )}
          </p>

          <div className="mt-10 grid max-w-xl gap-3">
            {statusItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="border-border/70 bg-background/65 group flex items-center gap-3 rounded-2xl border p-3.5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:translate-x-1 hover:border-violet-400/40 hover:bg-violet-500/[0.055] motion-reduce:transform-none dark:border-white/10 dark:bg-white/[0.06] dark:hover:border-violet-300/30 dark:hover:bg-white/[0.09]"
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-400/15 dark:text-violet-200">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-foreground text-sm font-medium dark:text-slate-100">
                    {item.label}
                  </span>
                  <span className="ml-auto size-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,.55)]" />
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-muted-foreground relative z-10 px-10 py-7 text-xs dark:text-slate-500 xl:px-16">
          © {new Date().getFullYear()} {displayName}
        </p>
      </aside>

      <section className="relative flex min-h-svh flex-col bg-[radial-gradient(circle_at_80%_0%,rgba(139,92,246,.10),transparent_34%)]">
        <header className="flex h-18 shrink-0 items-center justify-between px-5 sm:px-8 lg:justify-end">
          <Link
            to="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80 lg:hidden"
          >
            {loading ? (
              <>
                <Skeleton className="size-8 rounded-xl" />
                <Skeleton className="h-5 w-24" />
              </>
            ) : (
              <>
                {isHuichuanBrand(displayName) ? (
                  <BrandMark className="size-8" />
                ) : (
                  <img
                    src={logo}
                    alt={t("Logo")}
                    className="size-8 rounded-xl object-cover"
                  />
                )}
                <BrandWordmark name={displayName} className="text-sm" />
              </>
            )}
          </Link>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeSwitch />
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-5 py-8 sm:px-8 sm:py-12">
          <PageTransition className="auth-form-card border-border/60 bg-background/85 w-full max-w-[440px] rounded-3xl border p-6 shadow-[0_24px_80px_-36px_rgba(76,29,149,.34)] backdrop-blur-xl sm:p-8">
            {children}
          </PageTransition>
        </main>

        <div className="h-4 shrink-0" />
      </section>
    </div>
  );
}
