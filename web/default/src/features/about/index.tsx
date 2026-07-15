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
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Network, Route, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AnimateInView } from "@/components/animate-in-view";
import { PublicLayout } from "@/components/layout";
import { RichContent } from "@/components/rich-content";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { isHttpUrl, isLikelyHtml } from "@/lib/content-format";

import { getAboutContent } from "./api";

function EmptyAboutState() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const capabilities = [
    {
      title: t("One gateway for every model"),
      description: t(
        "Connect leading AI providers through one consistent API and switch models without rewriting your application.",
      ),
      icon: Network,
    },
    {
      title: t("Intelligent routing and retry"),
      description: t(
        "Distribute requests by priority, weight and availability to keep services fast and resilient.",
      ),
      icon: Route,
    },
    {
      title: t("Logs and observability"),
      description: t(
        "Inspect request status, latency, token usage and errors from a unified operational view.",
      ),
      icon: Activity,
    },
  ];

  return (
    <div className="relative isolate overflow-hidden px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] bg-[size:54px_54px] opacity-[0.14]"
      />
      <div
        aria-hidden="true"
        className="absolute top-[-20rem] left-1/2 -z-20 h-[48rem] w-[72rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.22),rgba(79,70,229,0.10)_40%,transparent_72%)] blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <AnimateInView className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/8 px-3.5 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300">
            <Sparkles className="size-3.5" />
            {t("AI Application Infrastructure Foundation")}
          </div>
          <p className="text-sm font-semibold tracking-[0.28em] text-violet-600 uppercase dark:text-violet-300">
            HUICHUAN AI
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
            {t("Powerful API Management Platform")}
          </h1>
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg">
            {t(
              "Connect models, manage access, control spend and observe every request through one reliable API platform.",
            )}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              className="h-11 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-white shadow-lg shadow-violet-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90"
              render={<Link to="/pricing" />}
            >
              {t("View Pricing")}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-11 px-6 transition-transform duration-200 hover:-translate-y-0.5"
              render={<Link to="/sign-in" />}
            >
              {t("Sign in")}
            </Button>
          </div>
        </AnimateInView>

        <div className="mt-16 grid gap-4 sm:mt-20 md:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <AnimateInView
                as="article"
                key={capability.title}
                delay={index * 70}
                className="landing-card border-border/60 bg-card/75 rounded-3xl border p-6 shadow-sm backdrop-blur-sm"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-300">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-7 text-xl font-semibold">
                  {capability.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-sm leading-6">
                  {capability.description}
                </p>
              </AnimateInView>
            );
          })}
        </div>

        <AnimateInView
          animation="fade-in"
          className="border-border/60 bg-muted/20 mt-16 rounded-3xl border px-6 py-8 text-center sm:mt-20 sm:px-10"
        >
          <div className="mx-auto mb-5 flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>
          <h2 className="text-xl font-semibold">
            {t("Unified AI infrastructure is ready")}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm leading-6">
            {t(
              "The administrator has not configured any about content yet. You can set it in the settings page, supporting HTML or URL.",
            )}
          </p>

          <div className="border-border/50 mt-8 space-y-3 border-t pt-7 text-xs sm:text-sm">
            <p className="text-muted-foreground">
              © {currentYear}{" "}
              <a
                href="https://github.com/QuantumNous"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("QuantumNous")}
              </a>{" "}
              {t("| Based on")}{" "}
              <a
                href="https://github.com/songquanpeng/one-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("One API")}
              </a>{" "}
              © 2023{" "}
              <a
                href="https://github.com/songquanpeng"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("JustSong")}
              </a>
            </p>
            <p className="text-muted-foreground">
              {t("This project must be used in compliance with the")}{" "}
              <a
                href="https://github.com/QuantumNous/new-api/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("AGPL v3.0 License")}
              </a>
              .
            </p>
          </div>
        </AnimateInView>
      </div>
    </div>
  );
}

export function About() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ["about-content"],
    queryFn: getAboutContent,
  });

  const rawContent = data?.data?.trim() ?? "";
  const hasContent = rawContent.length > 0;
  const isUrl = hasContent && isHttpUrl(rawContent);
  const contentIsHtml = hasContent && isLikelyHtml(rawContent);

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="mx-auto flex max-w-4xl flex-col gap-4 py-12">
          <Skeleton className="h-8 w-[45%]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </PublicLayout>
    );
  }

  if (!hasContent) {
    return (
      <PublicLayout showMainContainer={false}>
        <EmptyAboutState />
      </PublicLayout>
    );
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className="h-[calc(100vh-3.5rem)] w-full border-0"
          title={t("About")}
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts"
        />
      </PublicLayout>
    );
  }

  if (contentIsHtml) {
    return (
      <PublicLayout showMainContainer={false}>
        <RichContent
          mode="html"
          htmlVariant="isolated"
          content={rawContent}
          className="prose-neutral dark:prose-invert max-w-none"
        />
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <RichContent
          mode="markdown"
          content={rawContent}
          className="prose-neutral dark:prose-invert max-w-none"
        />
      </div>
    </PublicLayout>
  );
}
