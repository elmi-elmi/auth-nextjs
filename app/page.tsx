/**
 * Home page
 * @module app/page
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {ArrowRight, Shield, Zap, Lock, Linkedin, Github, Mail} from "lucide-react";

/**
 * Home page component
 * Landing page with CTA to login
 *
 * @returns Home page
 */
export default function HomePage() {
  return (
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <main className="flex-1">
          <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-24 md:py-32">
            <div className="flex max-w-[980px] flex-col items-center gap-4 text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
                Next.js 15 Authentication
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}
                  Made Simple
              </span>
              </h1>
              <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
                Production-ready authentication with Next.js 15, TypeScript, React Query, Zustand and Zod. Secure and fast
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Secure by Default</h3>
                  <p className="text-sm text-muted-foreground">
                    JWT tokens stored in memory with httpOnly cookies. No
                    localStorage vulnerabilities.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Optimized with React Query caching, Zustand state management,
                    and Next.js 15 features.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Type Safe</h3>
                  <p className="text-sm text-muted-foreground">
                    Full TypeScript with Zod validation. Catch errors at compile
                    time, not runtime.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}

        <footer className="flex flex-wrap items-center justify-center gap-6 border-t py-8">
          <a
              href="https://www.linkedin.com/in/elmialireza/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            elmialireza
          </a>

          <a
              href="https://github.com/elmi-elmi/crypto-table-task"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              aria-label="GitHub"
          >
            <Github className="h-4 w-4" aria-hidden />
            elmi-elmi
          </a>

          <a
              href="mailto:shahrokhelmi@gmail.com"
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              aria-label="Email"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </a>
        </footer>

      </div>
  );
}