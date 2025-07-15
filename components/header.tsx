"use client";

import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context"; // Import custom auth hook

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { user, logout, isLoading } = useAuth(); // Use custom auth hook

  return (
    <header className="flex items-center justify-around px-4 py-3 bg-mjdat-dark text-mjdat-text-light border-b border-mjdat-green/20 sticky top-0 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 text-mjdat-green text-xl font-bold"
        prefetch={false}
      >
        <TriangleIcon className="h-6 w-6 fill-mjdat-green" />
        <span>MJDAt™</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link
          href="/"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="/services"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          Services
        </Link>
        <Link
          href="/careers"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          Careers
        </Link>
        <Link
          href="/news"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          News
        </Link>
        <Link
          href="/about"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          About
        </Link>
        <Link
          href="/support"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          Support
        </Link>
        <Link
          href="/contact"
          className="hover:text-mjdat-green transition-colors"
          prefetch={false}
        >
          Contact
        </Link>
        {user && (
          <Link
            href="/dashboard"
            className="hover:text-mjdat-green transition-colors"
            prefetch={false}
          >
            Dashboard
          </Link>
        )}
      </nav>
      <div className="flex items-center gap-2">
        {!isLoading && !user ? (
          <>
            <Button
              variant="ghost"
              className="text-sm font-medium text-mjdat-text-light hover:text-mjdat-green"
              asChild
            >
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button
              variant="ghost"
              className="text-sm font-medium text-mjdat-text-light hover:text-mjdat-green"
              asChild
            >
              <Link href="/auth/register">Register</Link>
            </Button>
          </>
        ) : (
          !isLoading && (
            <Button
              variant="ghost"
              className="text-sm font-medium text-mjdat-text-light hover:text-mjdat-green flex items-center gap-1"
              onClick={logout}
            >
              <LogOutIcon className="h-4 w-4" /> Logout
            </Button>
          )
        )}
       
      </div>
    </header>
  );
}

function TriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.43 4.43L2.43 20.43H20.43L11.43 4.43Z" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
