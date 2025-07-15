"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context"; // Import custom auth hook
import { ChromeIcon, GithubIcon } from "lucide-react";
import Image from "next/image";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth(); // Use custom auth hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password.");
    }
  };

  const handleSocialSignIn = (provider: string) => {
    setError(
      `Social login with ${provider} is not implemented yet with custom auth.`
    );
    // In a real custom auth, you'd redirect to your own OAuth proxy or handle it differently.
  };

  return (
    <div className="w-full max-w-md bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-8 shadow-lg text-center">
      <Image
        src="/MJDAT/MJDAT9.png"
        alt="MJDAt Solutions Logo"
        className="mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold mb-2 text-mjdat-green">Sign In</h1>
      <p className="text-gray-300 mb-8">Access your MJDAt Solutions account.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-mjdat-green text-mjdat-dark py-2 rounded-md hover:bg-mjdat-light-green transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-mjdat-green/30 hover:bg-mjdat-green/10 transition-colors bg-transparent text-mjdat-text-light"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading}
        >
          <ChromeIcon className="h-5 w-5" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-mjdat-green/30 hover:bg-mjdat-green/10 transition-colors bg-transparent text-mjdat-text-light"
          onClick={() => handleSocialSignIn("github")}
          disabled={isLoading}
        >
          <GithubIcon className="h-5 w-5" />
          Continue with GitHub
        </Button>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="text-mjdat-green hover:underline"
          prefetch={false}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
