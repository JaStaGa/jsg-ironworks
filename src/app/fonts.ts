import { League_Spartan, JetBrains_Mono } from "next/font/google"

export const heading = League_Spartan({
    subsets: ["latin"],
    weight: ["600", "700", "800"],
    variable: "--font-heading",
    display: "swap",
    preload: true,
})

export const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-mono",
    display: "swap",
    preload: true,
})
