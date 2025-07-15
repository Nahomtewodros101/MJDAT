"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface JobFormProps {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    location: string;
    type: string;
    salary?: string | null; // Changed to allow null
  };
  onSuccess?: () => void;
}

export function JobForm({ initialData, onSuccess }: JobFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [type, setType] = useState(initialData?.type || "");
  const [salary, setSalary] = useState(initialData?.salary || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const method = initialData?.id ? "PUT" : "POST";
    const url = initialData?.id
      ? `/api/admin/jobs?id=${initialData.id}`
      : "/api/admin/jobs";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, location, type, salary }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save job opening.");
      }

      onSuccess?.();
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {initialData?.id ? "Edit Job Opening" : "Create New Job Opening"}
        </CardTitle>
        <CardDescription>
          {initialData?.id
            ? "Update the details for this job opening."
            : "Fill in the details to create a new job opening."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Software Engineer"
              required
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed job description..."
              required
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Remote, New York, NY"
                required
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Job Type</Label>
              <Select value={type} onValueChange={setType} disabled={loading}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="salary">Salary (Optional)</Label>
            <Input
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g., $80,000 - $100,000"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Saving..."
              : initialData?.id
              ? "Update Job"
              : "Create Job"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
