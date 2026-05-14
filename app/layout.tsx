import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * CONFIGURACIÓN GLOBAL DEL SITIO
 * Aquí se definen las fuentes, el título y la descripción para el SEO.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos para Google y redes sociales
export const metadata: Metadata = {
  title: "Focus Academy | Jiu-Jitsu Brasileño Chile",
  description: "Escuela de BJJ en Chile. Aprende disciplina, confianza y fuerza con los mejores instructores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full">
        {/* Aquí se renderiza el contenido de cada página */}
        {children}
      </body>
    </html>
  );
}
