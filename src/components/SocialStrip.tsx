"use client"

/** Grayscale “socials” strip with slow parallax drift. Pure SVG, no external assets. */
export default function SocialStrip() {
    const Icons = [XIcon, InstagramIcon, YouTubeIcon, TikTokIcon, LinkedInIcon]
    const row = (keyPrefix: string, extraClass = "") => (
        <div className={`logo-track ${extraClass}`}>
            {Array.from({ length: 2 }).map((_, k) =>
                Icons.map((Icon, i) => (
                    <span key={`${keyPrefix}-${k}-${i}`} className="logo">
                        <Icon />
                    </span>
                ))
            )}
        </div>
    )

    return (
        <div className="logo-strip mt-10" aria-label="social proof logos">
            {row("a")}
            {/* second layer for subtle parallax */}
            <div className="absolute inset-0 pointer-events-none">
                {row("b", "rev")}
            </div>
        </div>
    )
}

/* ---------- Minimal mono SVG icons ---------- */

function XIcon() {
    return (
        <svg viewBox="0 0 64 20" aria-hidden="true">
            <rect x="1" y="1" width="62" height="18" rx="9" fill="#2a2a2a" />
            <path d="M20 5 L28 15 M28 5 L20 15" stroke="#d4d4d4" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 64 20" aria-hidden="true">
            <rect x="1" y="1" width="62" height="18" rx="9" fill="#2a2a2a" />
            <rect x="20" y="5" width="12" height="12" rx="3" stroke="#d4d4d4" strokeWidth="2" fill="none" />
            <circle cx="26" cy="11" r="3" stroke="#d4d4d4" strokeWidth="2" fill="none" />
            <circle cx="30.5" cy="7.5" r="1" fill="#d4d4d4" />
        </svg>
    )
}

function YouTubeIcon() {
    return (
        <svg viewBox="0 0 64 20" aria-hidden="true">
            <rect x="1" y="1" width="62" height="18" rx="9" fill="#2a2a2a" />
            <rect x="18" y="6" width="16" height="8" rx="2" stroke="#d4d4d4" strokeWidth="2" fill="none" />
            <path d="M26 10 L22 8.5 V11.5 Z" fill="#d4d4d4" />
        </svg>
    )
}

function TikTokIcon() {
    return (
        <svg viewBox="0 0 64 20" aria-hidden="true">
            <rect x="1" y="1" width="62" height="18" rx="9" fill="#2a2a2a" />
            <path d="M24 6 v6.5 a3 3 0 1 1 -3 -3" stroke="#d4d4d4" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M28 6 a6 6 0 0 0 6 6" stroke="#d4d4d4" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
    )
}

function LinkedInIcon() {
    return (
        <svg viewBox="0 0 64 20" aria-hidden="true">
            <rect x="1" y="1" width="62" height="18" rx="9" fill="#2a2a2a" />
            <rect x="20" y="7" width="2.5" height="6" fill="#d4d4d4" />
            <circle cx="21.25" cy="6" r="1.25" fill="#d4d4d4" />
            <path d="M26 13 v-3.5 a2 2 0 0 1 4 0 V13" stroke="#d4d4d4" strokeWidth="2" fill="none" />
        </svg>
    )
}
