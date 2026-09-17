import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://elyse-razafindravonjy.vercel.app";
const SITE_NAME = "Elysé Razafindravonjy";
const FULL_NAME = "RAZAFINDRAVONJY Solofonirina Elysé";
const DESCRIPTION =
  "Portfolio de RAZAFINDRAVONJY Solofonirina Elysé (Elysé Razafindravonjy), développeur web & mobile junior, étudiant en 3e année à l'École Nationale d'Informatique (ENI) de Fianarantsoa. Découvrez ses projets, sa stack technique et son parcours.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Développeur Web & Mobile`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Elysé Razafindravonjy",
    "Elysé",
    "RAZAFINDRAVONJY Solofonirina Elysé",
    "RAZAFINDRAVONJY Solofonirina",
    "RAZAFINDRAVONJY",
    "Elysé Razafindravonjy développeur",
    "Elysé Razafindravonjy portfolio",
    "développeur web Madagascar",
    "développeur mobile Madagascar",
    "ENI Fianarantsoa",
    "École Nationale d'Informatique Fianarantsoa",
    "développeur junior Madagascar",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    firstName: "Elysé",
    lastName: "Razafindravonjy",
    locale: "fr_FR",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Développeur Web & Mobile`,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — Développeur Web & Mobile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Développeur Web & Mobile`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  alternateName: ["Elysé Razafindravonjy", "Elysé", "RAZAFINDRAVONJY Solofonirina"],
  url: SITE_URL,
  image: `${SITE_URL}/IMG_8870.png`,
  jobTitle: "Développeur Web & Mobile",
  description: DESCRIPTION,
  email: "mailto:erazafindravonjy@gmail.com",
  nationality: "Malagasy",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "École Nationale d'Informatique (ENI) de Fianarantsoa",
  },
  knowsAbout: [
    "Développement Web",
    "Développement Mobile",
    "React",
    "Next.js",
    "TypeScript",
    "Flutter",
  ],
  sameAs: [
    "https://github.com/ElyseRaz",
    "https://linkedin.com/in/elysé-razafindravonjy-9355b32b5/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
