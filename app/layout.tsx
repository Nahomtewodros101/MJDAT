import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context" // Use custom AuthProvider

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body>
        <AuthProvider>
          {" "}
          {/* Wrap with custom AuthProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Default to dark theme as per screenshot
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
