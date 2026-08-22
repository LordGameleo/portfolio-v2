'use client'

/**
 * Claude (Anthropic) logo — stylised radiating-bar mark.
 * Anthropic's visual identity uses elongated bars arranged in a radial sunburst.
 */
export default function ClaudeIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
    >
      {/* Top bar */}
      <rect x="44" y="8"  width="12" height="28" rx="5" />
      {/* Bottom bar */}
      <rect x="44" y="64" width="12" height="28" rx="5" />
      {/* Left bar */}
      <rect x="8"  y="44" width="28" height="12" rx="5" />
      {/* Right bar */}
      <rect x="64" y="44" width="28" height="12" rx="5" />

      {/* Top-right bar (45°) */}
      <rect x="61" y="16" width="11" height="24" rx="5" transform="rotate(45 66.5 28)" />
      {/* Bottom-right bar */}
      <rect x="61" y="60" width="11" height="24" rx="5" transform="rotate(-45 66.5 72)" />
      {/* Bottom-left bar */}
      <rect x="28" y="60" width="11" height="24" rx="5" transform="rotate(45 33.5 72)" />
      {/* Top-left bar */}
      <rect x="28" y="16" width="11" height="24" rx="5" transform="rotate(-45 33.5 28)" />

      {/* Centre circle */}
      <circle cx="50" cy="50" r="9" />
    </svg>
  )
}
