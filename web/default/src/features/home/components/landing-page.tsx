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
import {
  Activity,
  ArrowRight,
  Building2,
  Check,
  CircleDollarSign,
  Code2,
  GraduationCap,
  Headphones,
  KeyRound,
  Network,
  Rocket,
  Route,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import { AnimateInView } from "@/components/animate-in-view";
import { Footer } from "@/components/layout/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { HeroMotionBackdrop } from "./hero-motion-backdrop";
import { LandingHeader } from "./landing-header";

interface LandingPageProps {
  isAuthenticated: boolean;
}

const CAPABILITIES = [
  {
    title: "One gateway for every model",
    description:
      "Connect leading AI providers through one consistent API and switch models without rewriting your application.",
    icon: Network,
    className: "md:col-span-2 lg:col-span-7",
    tone: "dark",
  },
  {
    title: "Intelligent routing and retry",
    description:
      "Distribute requests by priority, weight and availability to keep services fast and resilient.",
    icon: Route,
    className: "lg:col-span-5",
    tone: "violet",
  },
  {
    title: "Scoped API keys",
    description:
      "Issue isolated keys with model, group and quota controls for users, teams and applications.",
    icon: KeyRound,
    className: "lg:col-span-4",
    tone: "light",
  },
  {
    title: "Usage and billing controls",
    description:
      "Track consumption in real time with clear quotas, pricing rules and account balances.",
    icon: CircleDollarSign,
    className: "lg:col-span-4",
    tone: "light",
  },
  {
    title: "Logs and observability",
    description:
      "Inspect request status, latency, token usage and errors from a unified operational view.",
    icon: Activity,
    className: "md:col-span-2 lg:col-span-4",
    tone: "light",
  },
] as const;

const USE_CASES = [
  {
    title: "AI product teams",
    description:
      "Ship assistants, agents and generation features with a stable model layer.",
    icon: Rocket,
  },
  {
    title: "Enterprise knowledge",
    description:
      "Connect internal applications to approved models with centralized access control.",
    icon: Building2,
  },
  {
    title: "Developer tools",
    description:
      "Power coding assistants, automation and CI workflows through compatible APIs.",
    icon: Code2,
  },
  {
    title: "Education platforms",
    description:
      "Support tutoring, content creation and research across multiple model families.",
    icon: GraduationCap,
  },
  {
    title: "Customer service",
    description:
      "Route conversational workloads reliably while keeping usage and costs visible.",
    icon: Headphones,
  },
  {
    title: "Content and commerce",
    description:
      "Scale copy, image and recommendation workflows from one managed gateway.",
    icon: ShoppingBag,
  },
] as const;

const FAQS = [
  {
    question: "Which API formats are supported?",
    answer:
      "The gateway supports commonly used AI API formats and adapts requests to many upstream providers, so existing tools can connect with minimal changes.",
  },
  {
    question: "Can I switch providers without changing my application?",
    answer:
      "Yes. Keep a consistent endpoint in your application and manage provider routes, model mappings and failover rules from the platform.",
  },
  {
    question: "How are API keys and quotas managed?",
    answer:
      "You can create independent keys, restrict their model access and assign quotas. Usage records make consumption and remaining balance easy to review.",
  },
  {
    question: "Is it suitable for teams and enterprises?",
    answer:
      "Yes. Centralized accounts, permissions, channels, logs and billing controls support both self-service developers and managed enterprise deployments.",
  },
  {
    question: "How do I get started?",
    answer:
      "Create an account, generate an API key, select an available model and replace the base URL in your preferred client or SDK.",
  },
] as const;

const PROVIDERS = [
  { name: "OpenAI", dotClassName: "bg-violet-500" },
  { name: "Claude", dotClassName: "bg-indigo-500" },
  { name: "Gemini", dotClassName: "bg-fuchsia-500" },
  { name: "DeepSeek", dotClassName: "bg-violet-500" },
  { name: "Qwen", dotClassName: "bg-indigo-500" },
  { name: "Mistral", dotClassName: "bg-fuchsia-500" },
] as const;

const PROVIDER_LOOP = [
  ...PROVIDERS.map((provider) => ({
    ...provider,
    id: `${provider.name}-primary`,
    duplicate: false,
  })),
  ...PROVIDERS.map((provider) => ({
    ...provider,
    id: `${provider.name}-duplicate`,
    duplicate: true,
  })),
];

function CapabilityVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div
        aria-hidden="true"
        className="border-border/60 bg-background/65 relative mt-auto overflow-hidden rounded-2xl border p-4 dark:border-white/10 dark:bg-white/[0.045]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,.2),transparent_58%)]" />
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="space-y-2">
            {["OpenAI", "Claude", "Gemini"].map((provider, itemIndex) => (
              <div
                key={provider}
                className="landing-capability-row border-border/60 bg-card/80 text-foreground/70 flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-medium dark:border-white/8 dark:bg-white/[0.055] dark:text-white/70"
                style={{ animationDelay: `${itemIndex * -0.8}s` }}
              >
                <span className="size-1.5 rounded-full bg-violet-400" />
                {provider}
              </div>
            ))}
          </div>
          <div className="relative flex size-16 items-center justify-center">
            <span className="landing-gateway-ring absolute inset-0 rounded-full border border-violet-400/30" />
            <span className="landing-gateway-ring landing-gateway-ring-delay absolute inset-2 rounded-full border border-fuchsia-400/30" />
            <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_32px_rgba(139,92,246,.45)]">
              <Network className="size-4 text-white" />
            </span>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-4 text-center dark:border-emerald-400/15 dark:bg-emerald-400/[0.06]">
            <p className="font-mono text-[10px] text-emerald-600 dark:text-emerald-300/70">
              POST
            </p>
            <p className="mt-1 font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-200">
              /v1/chat
            </p>
            <p className="text-muted-foreground mt-2 text-[10px] dark:text-white/40">
              200 · 824ms
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div
        aria-hidden="true"
        className="border-violet-500/12 bg-background/55 mt-auto space-y-3 rounded-2xl border p-4 shadow-inner"
      >
        {[
          ["primary", "92%", "w-[92%]"],
          ["fallback", "68%", "w-[68%]"],
          ["recovery", "41%", "w-[41%]"],
        ].map(([label, value, width], itemIndex) => (
          <div
            key={label}
            className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-2"
          >
            <span className="text-muted-foreground font-mono text-[10px]">
              {label}
            </span>
            <span className="bg-violet-500/8 h-1.5 overflow-hidden rounded-full">
              <span
                className={`landing-route-meter block h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 ${width}`}
                style={{ animationDelay: `${itemIndex * 120}ms` }}
              />
            </span>
            <span className="text-right font-mono text-[10px] text-violet-600 dark:text-violet-300">
              {value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <div
        aria-hidden="true"
        className="bg-muted/45 border-border/50 mt-auto rounded-2xl border p-4"
      >
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="flex size-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300">
            <KeyRound className="size-3.5" />
          </span>
          <span className="text-muted-foreground">sk-ts_••••••••9A2F</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-semibold tracking-wide uppercase">
          <span className="border-border/50 bg-background rounded-lg border px-2.5 py-2">
            12 models
          </span>
          <span className="border-border/50 bg-background rounded-lg border px-2.5 py-2">
            scoped
          </span>
        </div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div
        aria-hidden="true"
        className="bg-muted/45 border-border/50 relative mt-auto overflow-hidden rounded-2xl border px-4 pt-4"
      >
        <div className="relative z-10 flex items-end justify-between">
          <div>
            <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
              avg. request
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">$0.042</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">
            −12.4%
          </span>
        </div>
        <svg viewBox="0 0 260 70" className="mt-2 h-16 w-full" fill="none">
          <defs>
            <linearGradient id="billing-area" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#8B5CF6" stopOpacity=".32" />
              <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 58C24 53 31 36 53 40c24 5 29-17 52-9 18 6 28 20 50 8 26-15 42-27 61-17 18 9 25 2 44-13V70H0Z"
            fill="url(#billing-area)"
          />
          <path
            className="landing-chart-line"
            d="M0 58C24 53 31 36 53 40c24 5 29-17 52-9 18 6 28 20 50 8 26-15 42-27 61-17 18 9 25 2 44-13"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="bg-muted/45 border-border/50 mt-auto space-y-2 rounded-2xl border p-3"
    >
      {[
        ["200", "gpt-4o-mini", "824 ms"],
        ["200", "claude-sonnet", "631 ms"],
        ["200", "gemini-flash", "492 ms"],
      ].map(([status, model, latency], itemIndex) => (
        <div
          key={model}
          className="bg-background/80 grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg px-3 py-2 font-mono text-[10px]"
        >
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-300">
            <span
              className="landing-log-pulse size-1.5 rounded-full bg-emerald-500"
              style={{ animationDelay: `${itemIndex * -0.6}s` }}
            />
            {status}
          </span>
          <span className="text-muted-foreground truncate">{model}</span>
          <span className="text-muted-foreground">{latency}</span>
        </div>
      ))}
    </div>
  );
}

function HeroDashboardVisual() {
  const metrics = [
    ["Requests", "128,560", "+12.4%"],
    ["Success", "99.95%", "stable"],
    ["Latency", "142ms", "-8.2%"],
  ] as const;

  return (
    <div
      aria-hidden="true"
      className="landing-dashboard-scene relative mx-auto w-full max-w-[42rem] [perspective:1400px]"
    >
      <div className="landing-dashboard-orbit absolute inset-[-12%] rounded-[50%] border border-violet-400/15" />
      <span className="landing-dashboard-orb absolute top-[8%] -left-[3%] size-8 rounded-full bg-gradient-to-br from-white via-violet-300 to-violet-600 shadow-[0_14px_45px_rgba(139,92,246,.38)]" />
      <span className="landing-dashboard-orb landing-dashboard-orb-delay absolute right-[2%] bottom-[18%] size-5 rounded-full bg-gradient-to-br from-white via-fuchsia-300 to-fuchsia-600 shadow-[0_10px_38px_rgba(217,70,239,.36)]" />

      <div className="landing-dashboard-panel border-white/75 bg-background/55 relative overflow-hidden rounded-[2rem] border p-4 shadow-[0_42px_100px_-36px_rgba(109,40,217,.38)] backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-950/65">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.56),transparent_42%,rgba(168,85,247,.08))] dark:bg-[linear-gradient(115deg,rgba(255,255,255,.06),transparent_42%,rgba(168,85,247,.1))]" />
        <div className="relative flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="size-2 rounded-full bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,.7)]" />
            API Gateway
          </div>
          <div className="flex gap-1.5">
            <span className="bg-muted size-5 rounded-full" />
            <span className="bg-muted size-5 rounded-full" />
            <span className="bg-muted size-5 rounded-full" />
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-[1.45fr_.8fr]">
          <div className="border-border/60 bg-card/70 rounded-2xl border p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Request trend</span>
              <span className="landing-live-status flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" /> LIVE
              </span>
            </div>
            <svg
              viewBox="0 0 320 120"
              className="mt-3 h-28 w-full overflow-visible"
            >
              <defs>
                <linearGradient
                  id="hero-chart-fill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop stopColor="#8b5cf6" stopOpacity=".34" />
                  <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[28, 58, 88].map((y) => (
                <path
                  key={y}
                  d={`M0 ${y} H320`}
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="1"
                />
              ))}
              <path
                d="M0 100 C30 92 34 62 64 70 S105 105 132 73 S174 38 198 65 S238 76 258 39 S298 20 320 12 V120 H0Z"
                fill="url(#hero-chart-fill)"
              />
              <path
                className="landing-dashboard-chart"
                d="M0 100 C30 92 34 62 64 70 S105 105 132 73 S174 38 198 65 S238 76 258 39 S298 20 320 12"
                fill="none"
                stroke="url(#hero-chart-stroke)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="hero-chart-stroke"
                  x1="0"
                  y1="0"
                  x2="320"
                  y2="0"
                >
                  <stop stopColor="#6366f1" />
                  <stop offset=".55" stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#d946ef" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="border-border/60 bg-card/70 rounded-2xl border p-4 shadow-sm">
            <span className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
              Model coverage
            </span>
            <p className="mt-3 text-3xl font-bold tracking-tight">20+</p>
            <p className="text-muted-foreground mt-1 text-[10px]">
              One unified endpoint
            </p>
            <div className="mt-5 flex -space-x-1.5">
              {["AI", "G", "C", "Q"].map((item, index) => (
                <span
                  key={item}
                  className="border-background flex size-8 items-center justify-center rounded-full border-2 bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 text-[10px] font-bold text-violet-600 dark:text-violet-300"
                  style={{ animationDelay: `${index * -0.5}s` }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-3 grid grid-cols-3 gap-3">
          {metrics.map(([label, value, change], index) => (
            <div
              key={label}
              className="border-border/60 bg-card/70 landing-dashboard-metric rounded-2xl border p-3 shadow-sm"
              style={{ animationDelay: `${index * -0.7}s` }}
            >
              <p className="text-muted-foreground text-[10px]">{label}</p>
              <p className="mt-1 text-base font-bold tracking-tight sm:text-xl">
                {value}
              </p>
              <p className="mt-1 text-[9px] font-medium text-violet-600 dark:text-violet-300">
                {change}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-data-cube absolute -right-5 -bottom-8 flex size-24 items-center justify-center rounded-[1.7rem] border border-white/60 bg-gradient-to-br from-violet-400/85 via-violet-600/90 to-fuchsia-600/90 shadow-[0_24px_60px_rgba(124,58,237,.42)] backdrop-blur-xl dark:border-white/15">
        <Network className="size-9 text-white drop-shadow-lg" />
      </div>
    </div>
  );
}

export function LandingPage({ isAuthenticated }: LandingPageProps) {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);
  const primaryPath = isAuthenticated ? "/dashboard" : "/sign-up";
  const primaryLabel = isAuthenticated
    ? t("Go to Dashboard")
    : t("Get Started");

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    let frame = 0;
    const updateScrollProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - innerHeight;
        const progress = scrollable > 0 ? scrollY / scrollable : 0;
        page.style.setProperty("--landing-scroll", String(progress));
      });
    };

    updateScrollProgress();
    addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="landing-interactive-page bg-background text-foreground relative isolate"
      onPointerMove={(event) => {
        const page = pageRef.current;
        if (!page || event.pointerType === "touch") return;
        page.style.setProperty("--landing-pointer-x", `${event.clientX}px`);
        page.style.setProperty("--landing-pointer-y", `${event.clientY}px`);
        page.style.setProperty("--landing-pointer-opacity", "1");
      }}
      onPointerLeave={() => {
        pageRef.current?.style.setProperty("--landing-pointer-opacity", "0");
      }}
    >
      <div aria-hidden="true" className="landing-pointer-glow" />
      <div aria-hidden="true" className="landing-scroll-progress" />
      <LandingHeader isAuthenticated={isAuthenticated} />

      <main>
        <section
          id="home"
          className="landing-hero-section relative scroll-mt-16 overflow-hidden px-4 pt-32 pb-20 sm:px-6 sm:pt-40 sm:pb-24 lg:px-8 lg:pt-44"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] bg-[size:54px_54px] opacity-[0.18]"
          />
          <HeroMotionBackdrop />
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            {[
              "left-[8%] top-[24%]",
              "left-[21%] top-[13%]",
              "right-[14%] top-[20%]",
              "right-[27%] top-[38%]",
              "left-[15%] top-[58%]",
              "right-[8%] top-[62%]",
            ].map((position, index) => (
              <span
                key={position}
                className={`landing-float-point absolute size-1.5 rounded-full bg-violet-500/50 shadow-[0_0_18px_5px_rgba(139,92,246,0.22)] ${position}`}
                style={{ animationDelay: `${index * -0.7}s` }}
              />
            ))}
          </div>

          <div className="mx-auto grid max-w-[86rem] items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 xl:gap-14">
            <div className="relative z-10 text-center lg:text-left">
              <div
                className="landing-status-glow landing-animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-background/55 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-violet-700 opacity-0 shadow-sm backdrop-blur-xl dark:bg-violet-500/8 dark:text-violet-300 lg:mx-0"
                style={{ animationDelay: "40ms" }}
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                {t("Unified AI infrastructure is ready")}
              </div>
              <p
                className="landing-animate-fade-up text-sm font-semibold tracking-[0.3em] text-violet-600 uppercase opacity-0 dark:text-violet-300"
                style={{ animationDelay: "120ms" }}
              >
                HUICHUAN AI
              </p>
              <h1
                className="landing-hero-title landing-animate-fade-up mt-5 text-4xl leading-[1.06] font-bold tracking-[-0.045em] opacity-0 sm:text-6xl lg:text-[3.75rem] xl:text-[4.6rem]"
                style={{ animationDelay: "200ms" }}
              >
                {t("One gateway. Every AI model.")}
                <span
                  className="landing-art-title landing-gradient-text mt-3 block bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text px-3 pb-3 text-transparent lg:mx-0 lg:-ml-3"
                  data-text={t("Build without boundaries.")}
                >
                  {t("Build without boundaries.")}
                </span>
              </h1>
              <p
                className="landing-animate-fade-up text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-8 opacity-0 sm:text-lg lg:mx-0 lg:max-w-xl"
                style={{ animationDelay: "280ms" }}
              >
                {t(
                  "Connect models, manage access, control spend and observe every request through one reliable API platform.",
                )}
              </p>
              <div
                className="landing-animate-fade-up mt-8 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row lg:justify-start"
                style={{ animationDelay: "360ms" }}
              >
                <Button
                  className="landing-primary-cta relative h-12 w-full overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-base text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/25 sm:w-auto"
                  render={<Link to={primaryPath} />}
                >
                  {primaryLabel}
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-background/55 h-12 w-full px-7 text-base shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 sm:w-auto"
                  render={<Link to="/pricing" />}
                >
                  {t("View Pricing")}
                </Button>
              </div>
            </div>

            <div
              className="landing-animate-scale-in relative z-10 opacity-0"
              style={{ animationDelay: "300ms" }}
            >
              <HeroDashboardVisual />
            </div>

            <div className="relative z-10 grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
              {[
                [Network, "One gateway for every model"],
                [ShieldCheck, "Scoped API keys"],
                [CircleDollarSign, "Usage and billing controls"],
                [Activity, "Logs and observability"],
              ].map(([Icon, label], index) => {
                const FeatureIcon = Icon as typeof Network;
                return (
                  <AnimateInView
                    key={label as string}
                    delay={420 + index * 70}
                    className="landing-hero-feature border-border/60 bg-background/55 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm backdrop-blur-xl"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                      <FeatureIcon className="size-4" />
                    </span>
                    <span className="text-sm font-semibold">
                      {t(label as string)}
                    </span>
                  </AnimateInView>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-border/60 overflow-hidden border-y px-4 py-8 sm:px-6 lg:px-8">
          <AnimateInView animation="fade-in" className="mx-auto max-w-6xl">
            <p className="text-muted-foreground mb-6 text-center text-xs font-semibold tracking-[0.18em] uppercase">
              {t("Connect the models your products already use")}
            </p>
            <div className="fade-x overflow-hidden py-1">
              <div className="landing-provider-track flex w-max gap-3">
                {PROVIDER_LOOP.map((provider) => (
                  <div
                    key={provider.id}
                    aria-hidden={provider.duplicate}
                    className="border-border/60 bg-card/60 flex h-12 w-40 shrink-0 items-center justify-center gap-2 rounded-xl border text-sm font-semibold shadow-sm backdrop-blur-sm"
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full ${provider.dotClassName}`}
                    />
                    {provider.name}
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>
        </section>

        <section
          id="capabilities"
          className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateInView className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
                {t("Core capabilities")}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                {t("Everything between your product and the models")}
              </h2>
              <p className="text-muted-foreground mt-5 leading-7">
                {t(
                  "A focused control plane for reliable access, clear governance and predictable operations.",
                )}
              </p>
            </AnimateInView>
            <div className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-12">
              {CAPABILITIES.map((capability, index) => {
                const Icon = capability.icon;
                const isDark = capability.tone === "dark";
                let toneClass =
                  "border-border/55 bg-card/75 shadow-[0_20px_60px_-48px_rgba(15,23,42,.35)]";
                if (isDark) {
                  toneClass =
                    "border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] via-card to-fuchsia-500/[0.04] text-foreground shadow-[0_24px_70px_-48px_rgba(124,58,237,.4)] dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-violet-950/50 dark:text-white dark:shadow-[0_28px_80px_-44px_rgba(15,23,42,.7)]";
                } else if (capability.tone === "violet") {
                  toneClass =
                    "border-violet-500/15 bg-gradient-to-br from-violet-500/[0.09] via-card to-fuchsia-500/[0.05] shadow-[0_24px_70px_-48px_rgba(124,58,237,.5)]";
                }
                return (
                  <AnimateInView
                    as="article"
                    key={capability.title}
                    delay={index * 70}
                    className={`landing-card group relative flex min-h-[22rem] w-[86vw] shrink-0 snap-center flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:p-7 md:w-auto md:shrink lg:min-h-[23rem] ${toneClass} ${capability.className}`}
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute -top-24 -right-20 size-64 rounded-full blur-3xl transition-all duration-500 group-hover:scale-110 ${isDark ? "bg-violet-500/10 dark:bg-violet-500/18" : "bg-violet-500/10"}`}
                    />
                    <div className="relative flex items-center justify-between">
                      <div
                        className={`flex size-11 items-center justify-center rounded-2xl ${isDark ? "border border-violet-500/15 bg-violet-500/10 text-violet-600 dark:border-white/10 dark:bg-white/8 dark:text-violet-300" : "bg-violet-500/10 text-violet-600 dark:text-violet-300"}`}
                      >
                        <Icon className="size-5" />
                      </div>
                      <span
                        className={`font-mono text-[11px] tracking-[0.18em] ${isDark ? "text-muted-foreground/55 dark:text-white/30" : "text-muted-foreground/55"}`}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="relative mt-7 text-xl font-semibold tracking-tight sm:text-2xl">
                      {t(capability.title)}
                    </h3>
                    <p
                      className={`relative mt-3 max-w-xl text-sm leading-6 ${isDark ? "text-muted-foreground dark:text-white/55" : "text-muted-foreground"}`}
                    >
                      {t(capability.description)}
                    </p>
                    <div className="relative mt-7 flex flex-1 flex-col">
                      <CapabilityVisual index={index} />
                    </div>
                  </AnimateInView>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-muted/25 border-border/50 border-y px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 lg:pb-0">
              <AnimateInView
                as="article"
                animation="fade-right"
                className="landing-card border-border/60 bg-background relative w-[84vw] shrink-0 snap-center overflow-hidden rounded-3xl border p-7 sm:p-9 lg:w-auto lg:shrink"
              >
                <div className="absolute top-0 right-0 size-52 bg-[radial-gradient(circle,rgba(99,102,241,0.16),transparent_70%)]" />
                <Code2 className="size-8 text-indigo-500" />
                <p className="mt-8 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                  {t("For developers")}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {t("Self-service access in minutes")}
                </h2>
                <p className="text-muted-foreground mt-4 leading-7">
                  {t(
                    "Create a key, choose a model and connect your existing OpenAI-compatible client. No complex integration layer required.",
                  )}
                </p>
                <ul className="mt-7 space-y-3 text-sm">
                  {[
                    "Compatible API endpoints",
                    "Independent keys and quotas",
                    "Transparent usage records",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="size-4 text-emerald-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </AnimateInView>
              <AnimateInView
                as="article"
                animation="fade-left"
                delay={90}
                className="landing-card border-border/60 bg-background relative w-[84vw] shrink-0 snap-center overflow-hidden rounded-3xl border p-7 sm:p-9 lg:w-auto lg:shrink"
              >
                <div className="absolute top-0 right-0 size-52 bg-[radial-gradient(circle,rgba(168,85,247,0.16),transparent_70%)]" />
                <ShieldCheck className="size-8 text-violet-500" />
                <p className="mt-8 text-sm font-semibold text-violet-600 dark:text-violet-300">
                  {t("For enterprises")}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {t("Centralized control at scale")}
                </h2>
                <p className="text-muted-foreground mt-4 leading-7">
                  {t(
                    "Standardize model access across teams with routing policies, account controls and operational visibility in one platform.",
                  )}
                </p>
                <ul className="mt-7 space-y-3 text-sm">
                  {[
                    "Channel health and failover",
                    "Team permissions and governance",
                    "Unified cost visibility",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="size-4 text-emerald-500" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </AnimateInView>
            </div>
          </div>
        </section>

        <section
          id="scenarios"
          className="scroll-mt-16 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <AnimateInView className="max-w-2xl">
              <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
                {t("Use cases")}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                {t("Built for every AI workflow")}
              </h2>
              <p className="text-muted-foreground mt-5 leading-7">
                {t(
                  "From the first prototype to organization-wide deployment, keep model access consistent and manageable.",
                )}
              </p>
            </AnimateInView>
            <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
              {USE_CASES.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <AnimateInView
                    as="article"
                    key={useCase.title}
                    delay={(index % 3) * 70}
                    className="landing-card border-border/60 bg-card/60 w-[78vw] shrink-0 snap-center rounded-2xl border p-6 hover:border-violet-500/35 sm:w-auto sm:shrink"
                  >
                    <div className="bg-muted flex size-10 items-center justify-center rounded-xl">
                      <Icon className="size-5 text-violet-500" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">
                      {t(useCase.title)}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6">
                      {t(useCase.description)}
                    </p>
                  </AnimateInView>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="bg-muted/25 border-border/50 scroll-mt-16 border-y px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <AnimateInView animation="fade-right">
              <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
                {t("Frequently asked questions")}
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                {t("Questions, answered clearly")}
              </h2>
              <p className="text-muted-foreground mt-5 leading-7">
                {t(
                  "Everything you need to understand the gateway before sending your first request.",
                )}
              </p>
            </AnimateInView>
            <AnimateInView animation="fade-left" delay={80}>
              <Accordion className="border-border/60 bg-background rounded-2xl border px-5 shadow-sm sm:px-7">
                {FAQS.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger className="py-5 text-base hover:no-underline">
                      {t(faq.question)}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-6">
                      {t(faq.answer)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateInView>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <AnimateInView
            animation="scale-in"
            className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-14 text-center text-white shadow-2xl shadow-violet-500/20 sm:px-12 sm:py-18"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.1)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] bg-[size:38px_38px]"
            />
            <Sparkles className="relative mx-auto size-8" />
            <h2 className="relative mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
              {t("Ready to simplify your AI stack?")}
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80">
              {t(
                "Start with self-service API access or explore the documentation for enterprise deployment.",
              )}
            </p>
            <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                className="h-12 bg-white px-6 text-base text-violet-700 hover:bg-white/90"
                render={<Link to={primaryPath} />}
              >
                {primaryLabel}
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 border-white/35 bg-white/10 px-6 text-base text-white hover:bg-white/20 hover:text-white"
                render={<Link to="/about" />}
              >
                {t("Explore the platform")}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </AnimateInView>
        </section>
      </main>

      <Footer columns={[]} />
    </div>
  );
}
