import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/app/components/main-layout";
import { ThemeProvider, DEFAULT_COLOR } from "@/app/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Coffee - Coffee Shop Management System",
  description: "Advanced coffee shop management with smart pricing, inventory, and POS integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const defaultColor = '${DEFAULT_COLOR}';
                  
                  if (theme && theme.startsWith('#')) {
                    document.documentElement.setAttribute('data-theme', theme);
                    
                    // Color utility functions
                    function darkenColor(color, percent) {
                      const num = parseInt(color.replace('#', ''), 16);
                      const amt = Math.round(2.55 * percent);
                      const R = (num >> 16) - amt;
                      const G = ((num >> 8) & 0x00ff) - amt;
                      const B = (num & 0x0000ff) - amt;
                      return '#' + (
                        0x1000000 +
                        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                        (B < 255 ? (B < 1 ? 0 : B) : 255)
                      ).toString(16).slice(1);
                    }
                    
                    function getAnalogousColor(color) {
                      const num = parseInt(color.replace('#', ''), 16);
                      let R = num >> 16;
                      let G = (num >> 8) & 0x00ff;
                      let B = num & 0x0000ff;
                      const temp = R;
                      R = Math.min(255, Math.max(0, Math.round(R * 0.8 + G * 0.2)));
                      G = Math.min(255, Math.max(0, Math.round(G * 0.8 + B * 0.2)));
                      B = Math.min(255, Math.max(0, Math.round(B * 0.8 + temp * 0.2)));
                      return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
                    }
                    
                    // Calculate derived colors
                    const root = document.documentElement;
                    const primaryColor = theme;
                    const secondaryColor = darkenColor(theme, 20);
                    const accentColor = darkenColor(theme, 25);
                    const chartColor = getAnalogousColor(accentColor);
                    
                    root.style.setProperty('--color-primary', primaryColor);
                    root.style.setProperty('--color-secondary', secondaryColor);
                    root.style.setProperty('--color-accent', accentColor);
                    root.style.setProperty('--color-chart', chartColor);
                  } else {
                    document.documentElement.setAttribute('data-theme', defaultColor);
                    // Apply default colors
                    const root = document.documentElement;
                    root.style.setProperty('--color-primary', defaultColor);
                    root.style.setProperty('--color-secondary', defaultColor);
                    root.style.setProperty('--color-accent', defaultColor);
                    root.style.setProperty('--color-chart', defaultColor);
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', '${DEFAULT_COLOR}');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MainLayout>
            {children}
          </MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
