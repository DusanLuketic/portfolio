import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Figma",
];

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Left: Photo */}
        <FadeIn direction="left">
          <div className="relative aspect-[3/4] md:aspect-square rounded-2xl overflow-hidden border border-neutral-800">
            <Image
              src="/about/me.jpg"
              alt="Dusan Luketic"
              fill
              className="object-cover"
            />
            {/* Accent decoration */}
            <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-[--color-accent] opacity-80" />
          </div>
        </FadeIn>

        {/* Right: Bio */}
        <FadeIn direction="right" delay={0.2}>
          <div>
            <span className="text-[--color-accent] text-sm font-medium uppercase tracking-wider">
              About Me
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-100 mt-3">
              Passionate about creating exceptional web experiences
            </h2>
            <div className="space-y-4 mt-6 text-neutral-400 text-base leading-relaxed">
              <p>
                With over 5 years of experience in frontend development, I
                specialize in building performant, accessible, and visually
                stunning web applications.
              </p>
              <p>
                I&apos;m passionate about clean code, modern design patterns,
                and creating seamless user experiences. My toolkit includes
                React, Next.js, TypeScript, and Tailwind CSS.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or enjoying
                a good cup of coffee.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
