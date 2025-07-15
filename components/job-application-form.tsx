"use client";

import Link from "next/link";

import type React from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface JobApplicationFormProps {
  jobId: string;
}

export default function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState("");
  const [cvUrl, setCvUrl] = useState(""); // Simulate CV upload by accepting a URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    if (!user) {
      alert("Please log in to apply for a job.");
      router.push("/auth/login");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId, coverLetter, cvUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Application submitted successfully!");
        setCoverLetter("");
        setCvUrl("");
      } else {
        setError(data.error || "Failed to submit application.");
      }
    } catch (err) {
      console.error("Job application error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return <p className="text-center text-gray-400">Loading user session...</p>;
  }

  if (!user) {
    return (
      <div className="text-center mt-4">
        <p className="text-gray-400 mb-2">
          Please log in to apply for this job.
        </p>
        <Button
          asChild
          className="bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green"
        >
          <Link href="/auth/login">Login to Apply</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 p-4 border border-mjdat-green/20 rounded-md bg-mjdat-dark/30"
    >
      <h3 className="text-lg font-semibold text-mjdat-green">
        Apply for this Job
      </h3>
      <div>
        <Textarea
          placeholder="Cover Letter (max 500 words)"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          required
          rows={5}
          maxLength={500}
          className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
        />
      </div>
      <div>
        <Input
          type="url"
          placeholder="CV Link (e.g., Google Drive, Dropbox URL)"
          value={cvUrl}
          onChange={(e) => setCvUrl(e.target.value)}
          required
          className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
        />
        <p className="text-xs text-gray-400 mt-1">
          Please provide a shareable link to your CV/Resume.
        </p>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-mjdat-green text-sm">{success}</p>}
      <Button
        type="submit"
        className="w-full bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors py-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
