'use client'

/**
 * Cursor logo — 3D diamond/crystal shape (official geometry, normalised to 100×100)
 * Original: https://cursor.com  (512×512 diamond with three visible faces)
 */
export default function CursorIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
    >
      {/* Left face — brightest */}
      <path d="M50 0L0 25L0 75L50 50Z" fill="currentColor" fillOpacity="0.85" />
      {/* Right face — medium */}
      <path d="M100 25L100 75L50 50L50 0Z" fill="currentColor" fillOpacity="0.4" />
      {/* Bottom face — gradient-like via opacity */}
      <path d="M50 100L100 75L50 50L0 75Z" fill="currentColor" fillOpacity="0.65" />
      {/* Right inner shadow */}
      <path d="M100 25L50 100L50 50Z" fill="currentColor" fillOpacity="0.18" />
      {/* Top face — white highlight */}
      <path d="M0 25L50 50L100 25L50 0Z" fill="currentColor" fillOpacity="1" />
    </svg>
  )
}
