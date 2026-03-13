"use client";

import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  href,
  className,
}: ProjectCardProps) {
  const content = (
    <div
      className={`bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0066FF]/5 hover:border-neutral-700 h-full${className ? ` ${className}` : ""}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-display font-semibold text-neutral-100">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm mt-2 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-[--color-accent-light] text-[--color-accent]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
