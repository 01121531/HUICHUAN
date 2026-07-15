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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { BrandMark, BrandWordmark } from "@/components/brand-wordmark";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LandingHeaderProps {
  isAuthenticated: boolean;
}

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Core capabilities", href: "#capabilities" },
  { label: "Use cases", href: "#scenarios" },
  { label: "Frequently asked questions", href: "#faq" },
] as const;

export function LandingHeader({ isAuthenticated }: LandingHeaderProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "pointer-events-auto mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? "max-w-[52rem] px-3 pt-3"
              : "max-w-7xl px-4 pt-0 md:px-6",
          )}
        >
          <nav
            aria-label={t("Primary navigation")}
            className={cn(
              "relative flex items-center justify-between overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled
                ? "bg-background/60 ring-border/50 h-12 rounded-2xl pr-1.5 pl-4 shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.02)] ring-[0.5px] backdrop-blur-2xl dark:shadow-[0_2px_16px_-6px_rgba(0,0,0,0.4)]"
                : "h-16 px-2",
            )}
          >
            <a
              href="#home"
              className="group flex shrink-0 items-center gap-2.5"
              aria-label={t("Home")}
            >
              <span className="flex size-7 shrink-0 items-center justify-center transition-all duration-300 group-hover:scale-105">
                <BrandMark className="size-full" />
              </span>
              <BrandWordmark className="text-sm" />
            </a>

            <div className="hidden items-center gap-0.5 sm:flex">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors duration-200"
                >
                  {t(item.label)}
                </a>
              ))}
              <div className="bg-border/40 mx-2 h-4 w-px" />
              <LanguageSwitcher />
              <ThemeSwitch />
              <div className="bg-border/40 mx-1 h-4 w-px" />
              <Button
                size="sm"
                className="h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 text-xs font-medium text-white shadow-sm shadow-violet-500/20 hover:opacity-90"
                render={
                  <Link to={isAuthenticated ? "/dashboard" : "/sign-in"} />
                }
              >
                {isAuthenticated ? t("Go to Dashboard") : t("Sign in")}
              </Button>
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <ThemeSwitch />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={t("Toggle navigation menu")}
              >
                <span className="relative size-4">
                  <span
                    className={cn(
                      "absolute inset-x-0 block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300",
                      mobileOpen ? "top-[7px] rotate-45" : "top-[3px]",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 top-[7px] block h-[1.5px] rounded-full bg-current transition-all duration-300",
                      mobileOpen ? "scale-x-0 opacity-0" : "opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 block h-[1.5px] origin-center rounded-full bg-current transition-all duration-300",
                      mobileOpen ? "top-[7px] -rotate-45" : "top-[11px]",
                    )}
                  />
                </span>
              </Button>
            </div>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-opacity duration-300",
                scrolled ? "opacity-80" : "opacity-0",
              )}
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </nav>
        </div>
      </header>

      <div
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={cn(
          "bg-background/98 fixed inset-0 z-40 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:pointer-events-none sm:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-full flex-col justify-between px-8 pt-20 pb-10">
          <nav
            aria-label={t("Mobile navigation")}
            className="flex flex-col gap-1"
          >
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-muted-foreground flex items-center py-3 text-base font-medium tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  mobileOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
                style={{
                  transitionDelay: mobileOpen ? `${100 + index * 50}ms` : "0ms",
                }}
              >
                {t(item.label)}
              </a>
            ))}
          </nav>
          <div
            className={cn(
              "flex flex-col gap-3 transition-all duration-500",
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
            style={{ transitionDelay: mobileOpen ? "250ms" : "0ms" }}
          >
            <Link
              to={isAuthenticated ? "/dashboard" : "/sign-in"}
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-opacity hover:opacity-90 active:opacity-80"
            >
              {isAuthenticated ? t("Go to Dashboard") : t("Sign in")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
