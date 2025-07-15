import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { sendEmail } from "@/lib/mail";

export async function POST(request: Request) {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { jobId, coverLetter, cvUrl } = await request.json();

    if (!jobId || !coverLetter || !cvUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const jobOpening = await prisma.jobOpening.findUnique({
      where: { id: jobId },
    });
    if (!jobOpening) {
      return NextResponse.json(
        { error: "Job opening not found" },
        { status: 404 }
      );
    }

    const newApplication = await prisma.jobApplication.create({
      data: {
        jobOpeningId: jobId,
        userId: user.id,
        coverLetter,
        cvUrl,
        status: "Pending",
      },
    });

    // Send confirmation email to user
    await sendEmail({
      to: user.email,
      subject: `Job Application Confirmation: ${jobOpening.title}`,
      html: `<p>Dear ${
        user.name || user.email
      },</p><p>Thank you for applying for the <strong>${
        jobOpening.title
      }</strong> position at MJDAt Solutions.</p><p>We have received your application and will review it shortly. You can track your application status in your dashboard.</p><p>Best regards,<br/>MJDAt Solutions Team</p>`,
    });

    // Send notification email to admin (replace with actual admin email)
    await sendEmail({
      to: "admin@mjdat.com", // Replace with actual admin email
      subject: `New Job Application for ${jobOpening.title}`,
      html: `<p>A new application has been submitted for the <strong>${jobOpening.title}</strong> position.</p><p>Applicant: ${user.email}</p><p>View application in admin dashboard.</p>`,
    });

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
