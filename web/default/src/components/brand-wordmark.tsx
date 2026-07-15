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
import { useId } from "react";

import { isHuichuanBrand } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
}

interface BrandWordmarkProps {
  name?: string;
  className?: string;
}

export function BrandMark(props: BrandMarkProps) {
  const id = useId().replaceAll(":", "");
  const leftGradientId = `huichuan-brand-left-${id}`;
  const rightGradientId = `huichuan-brand-right-${id}`;
  const coreGradientId = `huichuan-brand-core-${id}`;

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={props.className}
      fill="none"
    >
      <path
        d="M20.5 5.5C11.8 7.2 5.4 14.9 5.4 24s6.4 16.8 15.1 18.5"
        stroke={`url(#${leftGradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M27.5 5.5C36.2 7.2 42.6 14.9 42.6 24s-6.4 16.8-15.1 18.5"
        stroke={`url(#${rightGradientId})`}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M24 14.2c1.25 6.3 3.5 8.55 9.8 9.8-6.3 1.25-8.55 3.5-9.8 9.8-1.25-6.3-3.5-8.55-9.8-9.8 6.3-1.25 8.55-3.5 9.8-9.8Z"
        fill={`url(#${coreGradientId})`}
      />
      <circle cx="8.2" cy="16.3" r="1.7" fill="#67E8F9" />
      <circle cx="39.8" cy="31.7" r="1.7" fill="#F0ABFC" />
      <defs>
        <linearGradient id={leftGradientId} x1="8" y1="7" x2="21" y2="43">
          <stop stopColor="#22D3EE" />
          <stop offset=".52" stopColor="#6366F1" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id={rightGradientId} x1="40" y1="6" x2="26" y2="43">
          <stop stopColor="#F472B6" />
          <stop offset=".55" stopColor="#D946EF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id={coreGradientId} x1="16" y1="16" x2="32" y2="32">
          <stop stopColor="#22D3EE" />
          <stop offset=".48" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BrandWordmark(props: BrandWordmarkProps) {
  const displayName = props.name?.trim() || "huichuan";

  if (!isHuichuanBrand(displayName)) {
    return (
      <span className={cn("font-semibold tracking-tight", props.className)}>
        {displayName}
      </span>
    );
  }

  return (
    <span
      aria-label={displayName}
      className={cn("font-semibold tracking-tight", props.className)}
    >
      <span aria-hidden="true">HUI</span>
      <span
        aria-hidden="true"
        className="bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent"
      >
        CHUAN
      </span>
    </span>
  );
}
