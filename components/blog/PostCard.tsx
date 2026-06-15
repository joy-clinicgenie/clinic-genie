import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Post, PostCategory } from "@/lib/data/posts";

/* ─── Category placeholder illustrations ───────────────────────────────────── */

function IllustrationSEO() {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="160" fill="url(#seo-bg)" />
      <defs>
        <linearGradient id="seo-bg" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#062833" /><stop offset="1" stopColor="#0B3D47" />
        </linearGradient>
      </defs>
      {/* SERP card rows */}
      {[30, 62, 94].map((y, i) => (
        <g key={y}>
          <rect x="32" y={y} width="180" height="24" rx="4" fill="#0E3D4A" />
          <rect x="40" y={y + 5} width={100 - i * 12} height="6" rx="2" fill="#18C4D9" opacity={0.9 - i * 0.2} />
          <rect x="40" y={y + 14} width={130 - i * 10} height="4" rx="2" fill="#78E2DD" opacity={0.35 - i * 0.08} />
          {/* rank badge */}
          <rect x="220" y={y + 6} width="20" height="12" rx="3" fill={i === 0 ? "#18C4D9" : "#0A2730"} opacity={i === 0 ? 1 : 0.7} />
          <text x="230" y={y + 15} textAnchor="middle" fontFamily="monospace" fontSize="7" fill={i === 0 ? "#0B2A30" : "#78E2DD"} fontWeight="bold">#{i + 1}</text>
        </g>
      ))}
      {/* magnifying glass */}
      <circle cx="262" cy="72" r="36" stroke="#78E2DD" strokeWidth="2" opacity="0.12" />
      <circle cx="262" cy="72" r="26" stroke="#18C4D9" strokeWidth="2.5" opacity="0.5" />
      <path d="M280 90l14 14" stroke="#78E2DD" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      {/* up-arrow on #1 */}
      <path d="M246 80l-6-10-6 10" stroke="#CCF4F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <text x="32" y="140" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.5" letterSpacing="2">SEARCH ENGINE OPTIMISATION</text>
    </svg>
  );
}

function IllustrationAISearch() {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="160" fill="url(#ai-bg)" />
      <defs>
        <linearGradient id="ai-bg" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D1A40" /><stop offset="1" stopColor="#062833" />
        </linearGradient>
        <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#18C4D9" stopOpacity="0.3" /><stop offset="1" stopColor="#18C4D9" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* glow */}
      <circle cx="160" cy="80" r="60" fill="url(#ai-glow)" />
      {/* neural nodes */}
      {[
        [72, 40],[72, 80],[72, 120],
        [140, 55],[140, 105],
        [200, 40],[200, 80],[200, 120],
        [268, 60],[268, 100],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="6" fill="#0E3D4A" stroke="#18C4D9" strokeWidth="1.5" opacity="0.85" />
      ))}
      {/* connections */}
      {[
        [72,40,140,55],[72,80,140,55],[72,80,140,105],[72,120,140,105],
        [140,55,200,40],[140,55,200,80],[140,105,200,80],[140,105,200,120],
        [200,40,268,60],[200,80,268,60],[200,80,268,100],[200,120,268,100],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#18C4D9" strokeWidth="1" opacity="0.2" />
      ))}
      {/* active path highlight */}
      <line x1="72" y1="80" x2="140" y2="55" stroke="#78E2DD" strokeWidth="1.8" opacity="0.8" />
      <line x1="140" y1="55" x2="200" y2="80" stroke="#78E2DD" strokeWidth="1.8" opacity="0.8" />
      <line x1="200" y1="80" x2="268" y2="60" stroke="#78E2DD" strokeWidth="1.8" opacity="0.8" />
      <circle cx="160" cy="80" r="12" fill="#18C4D9" opacity="0.2" />
      <circle cx="160" cy="80" r="6" fill="#18C4D9" opacity="0.9" />
      <text x="32" y="150" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.5" letterSpacing="2">AI SEARCH</text>
    </svg>
  );
}

function IllustrationWebBrand() {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="160" fill="url(#wb-bg)" />
      <defs>
        <linearGradient id="wb-bg" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B3D47" /><stop offset="1" stopColor="#1A1040" />
        </linearGradient>
      </defs>
      {/* browser */}
      <rect x="30" y="22" width="180" height="116" rx="7" fill="#0D2D35" stroke="#78E2DD" strokeWidth="1.5" />
      <rect x="30" y="22" width="180" height="24" rx="7" fill="#0E3D4A" />
      <rect x="30" y="34" width="180" height="12" fill="#0E3D4A" />
      <circle cx="46" cy="34" r="4.5" fill="#FF6B6B" opacity="0.8" />
      <circle cx="61" cy="34" r="4.5" fill="#FFD93D" opacity="0.8" />
      <circle cx="76" cy="34" r="4.5" fill="#6BCB77" opacity="0.8" />
      <rect x="88" y="28" width="100" height="12" rx="3" fill="#0A2730" stroke="#18C4D9" strokeWidth="0.8" opacity="0.6" />
      {/* hero banner */}
      <rect x="38" y="52" width="164" height="40" rx="4" fill="#0A2730" />
      <rect x="38" y="52" width="164" height="40" rx="4" fill="url(#wb-hero)" />
      <defs>
        <linearGradient id="wb-hero" x1="38" y1="52" x2="202" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#18C4D9" stopOpacity="0.25" /><stop offset="1" stopColor="#8E7BE8" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <rect x="48" y="63" width="70" height="7" rx="2" fill="#CCF4F6" opacity="0.7" />
      <rect x="48" y="75" width="45" height="5" rx="2" fill="#78E2DD" opacity="0.4" />
      <rect x="144" y="58" width="46" height="28" rx="3" fill="#0D3A44" stroke="#18C4D9" strokeWidth="0.8" opacity="0.6" />
      {/* content rows */}
      <rect x="38" y="98" width="80" height="5" rx="2" fill="#78E2DD" opacity="0.3" />
      <rect x="38" y="108" width="60" height="5" rx="2" fill="#78E2DD" opacity="0.2" />
      <rect x="38" y="118" width="70" height="5" rx="2" fill="#78E2DD" opacity="0.15" />
      {/* pen tool */}
      <g transform="translate(232 42)">
        <path d="M0 44 L6 14 L20 0 L36 16 L22 30 L-4 36z" fill="#1A1040" stroke="#8E7BE8" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 0 L36 16" stroke="#CCF4F6" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="16" r="3" fill="#8E7BE8" opacity="0.8" />
      </g>
      <text x="30" y="152" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.5" letterSpacing="2">WEB & BRAND</text>
    </svg>
  );
}

function IllustrationSEM() {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="160" fill="url(#sem-bg)" />
      <defs>
        <linearGradient id="sem-bg" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#062833" /><stop offset="1" stopColor="#0B3D47" />
        </linearGradient>
      </defs>
      {/* bullseye */}
      <circle cx="96" cy="82" r="56" stroke="#18C4D9" strokeWidth="1" opacity="0.1" />
      <circle cx="96" cy="82" r="42" stroke="#18C4D9" strokeWidth="1.2" opacity="0.18" />
      <circle cx="96" cy="82" r="28" stroke="#18C4D9" strokeWidth="1.5" opacity="0.3" />
      <circle cx="96" cy="82" r="14" stroke="#18C4D9" strokeWidth="2" opacity="0.6" />
      <circle cx="96" cy="82" r="5" fill="#18C4D9" opacity="0.9" />
      {/* arrow hitting target */}
      <line x1="168" y1="14" x2="102" y2="78" stroke="#78E2DD" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M168 14 l-12 2 2-12" fill="#78E2DD" />
      {/* mini ad metric cards */}
      {[
        { x: 188, y: 28, label: "CPC", val: "↓ 22%", color: "#6BCB77" },
        { x: 236, y: 28, label: "CTR", val: "↑ 18%", color: "#18C4D9" },
        { x: 188, y: 74, label: "ROI", val: "3.4×",  color: "#78E2DD" },
        { x: 236, y: 74, label: "CPA", val: "↓ 31%", color: "#6BCB77" },
      ].map(({ x, y, label, val, color }) => (
        <g key={label}>
          <rect x={x} y={y} width="42" height="36" rx="5" fill="#0D2D35" stroke={color} strokeWidth="1" opacity="0.7" />
          <text x={x + 21} y={y + 14} textAnchor="middle" fontFamily="monospace" fontSize="7" fill={color} opacity="0.8" letterSpacing="1">{label}</text>
          <text x={x + 21} y={y + 27} textAnchor="middle" fontFamily="sans-serif" fontSize="9" fill={color} fontWeight="bold">{val}</text>
        </g>
      ))}
      <text x="32" y="150" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.5" letterSpacing="2">SEM & ADS</text>
    </svg>
  );
}

function IllustrationCompliance() {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="160" fill="url(#comp-bg)" />
      <defs>
        <linearGradient id="comp-bg" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#062833" /><stop offset="1" stopColor="#0D1A40" />
        </linearGradient>
        <radialGradient id="comp-glow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#18C4D9" stopOpacity="0.15" /><stop offset="1" stopColor="#18C4D9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="80" r="70" fill="url(#comp-glow)" />
      {/* shield */}
      <path d="M160 28 L196 44 L196 86 C196 106 160 122 160 122 C160 122 124 106 124 86 L124 44 Z" fill="#0E3D4A" stroke="#18C4D9" strokeWidth="2" strokeLinejoin="round" />
      <path d="M160 36 L190 50 L190 86 C190 103 160 116 160 116 C160 116 130 103 130 86 L130 50 Z" fill="#0A2730" />
      {/* check mark */}
      <path d="M146 76 l9 9 18-20" stroke="#78E2DD" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* document on the right */}
      <rect x="218" y="36" width="72" height="90" rx="5" fill="#0E3D4A" stroke="#78E2DD" strokeWidth="1" opacity="0.6" />
      <rect x="226" y="50" width="56" height="5" rx="2" fill="#78E2DD" opacity="0.5" />
      <rect x="226" y="62" width="44" height="4" rx="2" fill="#78E2DD" opacity="0.3" />
      <rect x="226" y="72" width="50" height="4" rx="2" fill="#78E2DD" opacity="0.25" />
      <rect x="226" y="82" width="38" height="4" rx="2" fill="#78E2DD" opacity="0.2" />
      {/* checkboxes */}
      {[96, 106, 116].map((y) => (
        <g key={y}>
          <rect x="226" y={y} width="8" height="8" rx="1.5" fill="#0A2730" stroke="#18C4D9" strokeWidth="1" opacity="0.7" />
          <path d={`M228 ${y+4} l2 2 3-3`} stroke="#6BCB77" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="240" y={y + 2} width="36" height="4" rx="2" fill="#78E2DD" opacity="0.2" />
        </g>
      ))}
      <text x="32" y="150" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.5" letterSpacing="2">COMPLIANCE</text>
    </svg>
  );
}

function IllustrationGrowth() {
  return (
    <svg viewBox="0 0 320 160" fill="none" aria-hidden="true" className="h-full w-full">
      <rect width="320" height="160" fill="url(#gr-bg)" />
      <defs>
        <linearGradient id="gr-bg" x1="0" y1="0" x2="320" y2="160" gradientUnits="userSpaceOnUse">
          <stop stopColor="#062833" /><stop offset="1" stopColor="#0B3D47" />
        </linearGradient>
        <linearGradient id="gr-area" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#18C4D9" stopOpacity="0.3" /><stop offset="1" stopColor="#18C4D9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      {[40, 70, 100, 130].map((y) => (
        <line key={y} x1="40" y1={y} x2="280" y2={y} stroke="#78E2DD" strokeWidth="0.4" opacity="0.12" />
      ))}
      {/* area */}
      <path d="M40 130 Q80 120 110 100 T180 68 T250 38 L250 130z" fill="#18C4D9" opacity="0.1" />
      {/* trend line */}
      <path d="M40 130 Q80 120 110 100 T180 68 T250 38" stroke="#18C4D9" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* data points */}
      {[[40,130],[110,100],[180,68],[250,38]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4.5" fill="#78E2DD" stroke="#062833" strokeWidth="1.5" />
      ))}
      {/* compass rose in top-right */}
      <g transform="translate(274 44)">
        <circle cx="0" cy="0" r="22" fill="#0E3D4A" stroke="#18C4D9" strokeWidth="1.2" opacity="0.6" />
        <path d="M0-16 L3-4 L0-1 L-3-4z" fill="#78E2DD" />
        <path d="M0 16 L3 4 L0 1 L-3 4z" fill="#78E2DD" opacity="0.4" />
        <path d="M16 0 L4 3 L1 0 L4-3z" fill="#78E2DD" opacity="0.4" />
        <path d="M-16 0 L-4 3 L-1 0 L-4-3z" fill="#78E2DD" opacity="0.4" />
        <circle cx="0" cy="0" r="3" fill="#18C4D9" />
      </g>
      {/* 90-day label badge */}
      <rect x="40" y="18" width="84" height="18" rx="4" fill="#0E3D4A" stroke="#18C4D9" strokeWidth="1" opacity="0.7" />
      <text x="82" y="30" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#78E2DD" letterSpacing="1">FIRST 90 DAYS</text>
      <text x="40" y="150" fontFamily="monospace" fontSize="8" fill="#78E2DD" opacity="0.5" letterSpacing="2">GROWTH STRATEGY</text>
    </svg>
  );
}

const CATEGORY_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  "SEO": <IllustrationSEO />,
  "AI Search": <IllustrationAISearch />,
  "Web & Brand": <IllustrationWebBrand />,
  "SEM & Ads": <IllustrationSEM />,
  "Compliance": <IllustrationCompliance />,
  "Growth Strategy": <IllustrationGrowth />,
};

function PostCardImage({ category }: { category: PostCategory }) {
  const illustration = CATEGORY_ILLUSTRATIONS[category];
  return (
    <div className="relative mb-1 overflow-hidden rounded-lg" style={{ aspectRatio: "16/8" }}>
      {illustration ?? (
        <div className="h-full w-full bg-gradient-to-br from-night-700 to-night-800" />
      )}
    </div>
  );
}

/* ─── Card ─────────────────────────────────────────────────────────────────── */

export function PostCard({
  post,
  tone = "dark",
  showImage = true,
  className,
}: {
  post: Post;
  tone?: "dark" | "light";
  showImage?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/genie-tips/${post.slug}`}
      className={cn(
        "group flex h-full flex-col gap-3 rounded-xl p-6 transition-[transform,box-shadow] duration-ui ease-out-soft hover:-translate-y-1.5 motion-reduce:hover:translate-y-0",
        tone === "dark" ? "glass hover:shadow-glow-sm" : "glass-light hover:shadow-card",
        className
      )}
    >
      {showImage && <PostCardImage category={post.category} />}

      <span
        className={cn(
          "inline-flex w-fit items-center rounded-pill px-3 py-1 font-mono text-xs uppercase tracking-wider",
          tone === "dark" ? "bg-genie-500/15 text-genie-300" : "bg-genie-100 text-genie-700"
        )}
      >
        {post.category}
      </span>
      <h3
        className={cn(
          "font-display text-h4 leading-snug transition-colors",
          tone === "dark" ? "text-onDark group-hover:text-genie-200" : "text-ink-900 group-hover:text-genie-700"
        )}
      >
        {post.title}
      </h3>
      <p className={cn("text-sm leading-relaxed", tone === "dark" ? "text-onDark-muted" : "text-ink-500")}>
        {post.dek}
      </p>
      <span className={cn("mt-auto pt-2 text-xs", tone === "dark" ? "text-onDark-faint" : "text-ink-500")}>
        {post.readingTime}
      </span>
    </Link>
  );
}
