"use client";

import { motion } from "motion/react";
import { FadeIn } from "@/components/ui/FadeIn";

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative"
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0}>
          <span className="text-neutral-400 text-lg md:text-xl tracking-wide uppercase">
            Hello, I&apos;m
          </span>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-100 tracking-tight mt-4">
            Dusan Luketic
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="text-xl md:text-2xl text-neutral-400 mt-4">
            Senior Frontend Developer
          </p>
        </FadeIn>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="text-base md:text-lg text-neutral-500 mt-6"
        >
          Crafting elegant digital experiences
        </motion.p>

        <FadeIn delay={1.0}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10">
            <a
              href="#projects"
              className="bg-[--color-accent] hover:bg-[--color-accent-hover] text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="text-neutral-400 hover:text-neutral-100 underline underline-offset-4 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </FadeIn>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-neutral-600"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 3L8 13M8 13L4 9M8 13L12 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
