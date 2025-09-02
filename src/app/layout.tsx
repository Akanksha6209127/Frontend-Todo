

import LayoutWrapper from "@/components/todo/LayoutWrapper";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/themeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider>{children}</ThemeProvider> */}

        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}




