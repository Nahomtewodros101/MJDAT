# MJDAt Solutions: Business Process Outsourcing Platform

## Empowering Businesses Through Seamless BPO Services

![MJDAt Solutions Banner](https://via.placeholder.com/1200x400/0A1919/00C896?text=MJDAt+Solutions+-+BPO+Excellence)

MJDAt Solutions is a comprehensive, full-stack web application designed to showcase and manage Business Process Outsourcing (BPO) services. It provides a professional online presence for MJDAt, allowing potential clients to explore services, contact the team, view news, and apply for jobs. For internal management, it features a robust admin dashboard to handle job openings, user accounts, contact messages, and news announcements.

This project is built with a modern Next.js architecture, leveraging React Server Components, a custom JWT authentication system, Prisma ORM for MongoDB, and a sleek Tailwind CSS design with shadcn/ui components.

---

## 🚀 Features

### Public-Facing Website
*   **Dynamic Homepage**: Engaging hero section, overview of core services, "Why Choose Us" highlights, client testimonials, and latest news.
*   **Services Page**: Detailed breakdown of all BPO services offered, including Logistics Support, Customer Service, Data Entry, Human Resources, Financial Services, Digital Marketing, IT Support, Process Automation, and Business Consulting.
*   **Careers Page**: Lists current job openings with detailed descriptions and a form for authenticated users to apply.
*   **News & Announcements**: Dedicated section for company updates, press releases, and announcements.
*   **About Us**: Information about the company's values, mission, and milestones.
*   **Contact Us**: A comprehensive form for inquiries, with automatic email notifications to both the user and an admin.
*   **Legal Pages**: Privacy Policy, Terms of Service, Cookie Policy, and GDPR Compliance.
*   **Responsive Design**: Optimized for seamless viewing across all devices (desktop, tablet, mobile).
*   **Animated Background**: Subtle, modern background animations for an enhanced user experience.
*   **Theme Toggle**: Dark and light mode support.

### User & Authentication
*   **Custom JWT Authentication**: Secure user registration and login using JSON Web Tokens for session management.
*   **User Roles**: Differentiates between `USER` and `ADMIN` roles, controlling access to specific routes and features.
*   **Session Management**: Cookies-based session handling for persistent logins.
*   **Email Notifications**: Automated emails for successful logins and registrations.

### Admin Dashboard (Role-Based Access)
*   **Job Management**: Admins can create, edit, and delete job openings.
*   **User Management**: Admins can view, update roles (User/Admin), and delete user accounts.
*   **Contact Message Management**: Admins can view, mark as read, and delete incoming contact messages.
*   **News Management**: Admins can create, edit, and delete news announcements, with an option to publish immediately.
*   **Job Application Management**: Admins can view and update the status of submitted job applications.

---

## 🛠️ Technologies Used

*   **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Authentication**: Custom JWT (JSON Web Tokens)
*   **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
*   **Email Service**: [Nodemailer](https://nodemailer.com/about/)
*   **Icons**: [Lucide React](https://lucide.dev/icons/)
*   **Date Formatting**: [date-fns](https://date-fns.org/)
*   **Type Checking**: [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/en/) (LTS version recommended)
*   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
*   A running [MongoDB](https://www.mongodb.com/docs/manual/installation/) instance (local or cloud-hosted like MongoDB Atlas).

### Installation

1.  **Clone the repository:**
    \`\`\`bash
    git clone https://github.com/your-username/mjdat-solutions.git
    cd mjdat-solutions
    \`\`\`

2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    yarn install
    \`\`\`

3.  **Set up your Prisma database:**
    This command will generate the Prisma client based on your `schema.prisma` and push the schema to your MongoDB database.
    \`\`\`bash
    npx prisma db push
    \`\`\`

### Environment Variables

Create a `.env` file in the root of your project and add the following environment variables. Replace the placeholder values with your actual credentials.

\`\`\`env
# Database Connection String (MongoDB)
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

# JWT Secret for Authentication (generate a strong, random string)
JWT_SECRET="your_super_secret_jwt_key_here"

# Email Service Configuration (for Nodemailer)
# Example for Mailtrap (for development) or SendGrid/Resend (for production)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587" # or 465 for SSL
SMTP_SECURE="false" # true for 465, false for other ports
SMTP_USER="your_smtp_username"
SMTP_PASSWORD="your_smtp_password"
EMAIL_FROM="no-reply@yourdomain.com" # Sender email address

# Public URL of your application (used for email links)
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Change to your deployment URL in production
\`\`\`

**Important**: For deployment on Vercel, ensure these environment variables are configured directly in your Vercel project settings, as `.env` files are not used at runtime in production. Client-side environment variables must be prefixed with `NEXT_PUBLIC_`.

### Running the Application

Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📂 Project Structure

The project follows the Next.js App Router convention:

\`\`\`
mjdat-solutions/
├── app/
│   ├── api/                  # Next.js API Routes (backend endpoints)
│   │   ├── auth/             # Authentication API (login, register, logout, me)
│   │   ├── admin/            # Admin-specific API (users, jobs, applications, messages, news)
│   │   └── jobs/             # Public job application API
│   ├── (pages)/              # Route groups for public and dashboard pages
│   │   ├── about/page.tsx
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── careers/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── dashboard/        # Admin/User dashboard pages
│   │   │   ├── applications/page.tsx
│   │   │   ├── jobs/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── news/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   └── page.tsx
│   │   ├── gdpr-compliance/page.tsx
│   │   ├── news/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── services/page.tsx
│   │   ├── support/page.tsx
│   │   └── terms/page.tsx
│   ├── globals.css           # Global Tailwind CSS styles
│   ├── layout.tsx            # Root layout for the application
│   ├── loading.tsx           # Loading UI for Suspense
│   └── not-found.tsx         # Custom 404 page
├── components/
│   ├── auth/                 # Authentication-related components (login/register forms)
│   ├── dashboard/            # Admin dashboard specific components
│   ├── ui/                   # shadcn/ui components (auto-generated)
│   ├── animated-background.tsx # Background animation component
│   ├── footer.tsx            # Global footer component
│   ├── header.tsx            # Global header component
│   ├── job-application-form.tsx # Form for job applications
│   └── modern-frame.tsx      # Custom modern frame for service previews
├── lib/
│   ├── auth-context.tsx      # React Context for client-side authentication state
│   ├── auth.ts               # Server-side JWT utilities (generate/verify token, cookie handling)
│   ├── mail.ts               # Nodemailer utility for sending emails
│   ├── prisma.ts             # Prisma client instance
│   └── utils.ts              # Utility functions (e.g., `cn` for Tailwind classes)
├── prisma/
│   └── schema.prisma         # Database schema definition for Prisma
├── public/
│   ├── icons/                # PWA icons
│   ├── manifest.json         # PWA manifest file
│   └── placeholder.svg       # Placeholder images
├── next.config.mjs           # Next.js configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
\`\`\`

---

## 🔐 Authentication

This project implements a custom JWT-based authentication system:

*   **Registration & Login**: Users can sign up and log in using their email and password.
*   **JWT Tokens**: Upon successful login/registration, a JWT is generated and stored in an `httpOnly` cookie for security.
*   **Server-Side Verification**: The `lib/auth.ts` module provides functions to generate, verify, and manage JWTs. Server Components and API Routes use `getAuthUser()` to retrieve the authenticated user's details.
*   **Client-Side Context**: The `lib/auth-context.tsx` provides a React Context (`useAuth`) for client-side components to access the current user's state and perform login/logout actions.
*   **Role-Based Access Control**: The `middleware.ts` file protects dashboard and admin API routes, redirecting unauthenticated users and restricting access for non-admin users.

---

## 📊 Admin Dashboard

The admin dashboard is accessible via `/dashboard` and its sub-routes. Access is restricted to users with the `ADMIN` role.

*   **User Management**: Admins can view all registered users, change their roles (USER/ADMIN), and delete accounts.
*   **Job Management**: Admins can add new job openings, update existing ones, and remove outdated listings.
*   **Application Management**: Admins can review all submitted job applications and update their status (e.g., Pending, Reviewed, Interview, Accepted, Rejected).
*   **Message Management**: Admins can view contact messages submitted through the website, mark them as read, and delete them.
*   **News Management**: Admins can create, edit, and delete news announcements, controlling their publication status.

---

## 📦 Database Schema

The `prisma/schema.prisma` defines the following models:

*   **`User`**: Stores user information including email, hashed password, name, and role (`USER` or `ADMIN`).
*   **`JobOpening`**: Represents available job positions with details like title, description, location, type, and salary.
*   **`JobApplication`**: Records job applications, linking a user to a job opening, including cover letter, CV URL, and application status.
*   **`ContactMessage`**: Stores messages submitted through the contact form.
*   **`NewsAnnouncement`**: Manages news articles and announcements with title, content, image URL, and publication status.

---

## 🚀 Deployment

This application is designed for seamless deployment on [Vercel](https://vercel.com/), the creators of Next.js. Ensure your environment variables are correctly configured in your Vercel project settings.

---

## 👋 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add Your Feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 📞 Contact

For any inquiries or support, please contact:

*   **Email**: info@mjdat.com
*   **Website**: [www.MJDAtSolutions.com](https://www.mjdat.com) (Placeholder)

**Main Developer**: Nahom Tewodros
