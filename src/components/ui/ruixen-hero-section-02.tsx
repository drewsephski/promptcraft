"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Settings2, Sparkles, Zap } from "lucide-react";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function HeroSection02() {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <DotPattern className={cn(
        "[mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]",
      )} />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-primary/30 blur-[120px] rounded-full z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-secondary/20 blur-[160px] rounded-full z-0"
      />

      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0.2, y: [0, -20, 0] }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-muted-foreground/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl space-y-6">
        <button
          className="group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-3xl border-0 bg-[length:200%] px-8 py-2 font-medium text-black dark:text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
            before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-[rainbow_3s_linear_infinite] before:bg-[linear-gradient(90deg,var(--color-1),var(--color-2),var(--color-3),var(--color-4),var(--color-5))] before:bg-[length:200%] before:[filter:blur(12px)]
            bg-white dark:bg-black"
          style={{
            ['--color-1' as any]: 'hsl(210, 100%, 60%)', // Blue
            ['--color-2' as any]: 'hsl(280, 80%, 65%)',  // Purple
            ['--color-3' as any]: 'hsl(330, 100%, 65%)', // Pink
            ['--color-4' as any]: 'hsl(20, 100%, 60%)',  // Orange
            ['--color-5' as any]: 'hsl(140, 70%, 50%)',  // Green
          }}
        >
          <a
            href="https://github.com/ruixenui/ruixen-free-components"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border px-3 py-2 rounded-2xl items-center text-black dark:text-white font-normal"
          >
            <Github className="w-4 h-4 mr-2" />
            Ruixen UI
          </a>
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white"
        >
          Master <span className="text-blue-400">Prompt Engineering</span> with Expert Tutorials
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-300 max-w-xl mx-auto"
        >
          Discover curated tutorials, techniques, and best practices from the prompt engineering community. Learn to craft powerful AI instructions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/tutorials">Browse Tutorials</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Link to="/submit">Submit Tutorial</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}