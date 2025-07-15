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
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MJDAT BPO SOLUTIONS</title>
        <link rel="icon" href="/MJDAT/MJDAT9.png" />
        {/* Add any additional head elements here */}
      </head>
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
