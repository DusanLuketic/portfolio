import { FadeIn } from "@/components/ui/FadeIn";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A modern shopping experience built with Next.js and Stripe integration",
    image: "/projects/project-1.svg",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    title: "AI Dashboard",
    description:
      "Real-time analytics dashboard with machine learning insights",
    image: "/projects/project-2.svg",
    tags: ["React", "Python", "TensorFlow"],
  },
  {
    title: "Social Media App",
    description: "A full-stack social platform with real-time messaging",
    image: "/projects/project-3.svg",
    tags: ["React Native", "Node.js", "Socket.io"],
  },
  {
    title: "Design System",
    description:
      "A comprehensive component library for enterprise applications",
    image: "/projects/project-4.svg",
    tags: ["React", "Storybook", "Tailwind"],
  },
];

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <FadeIn>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-100">
          Selected Projects
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-neutral-400 mt-2">A selection of recent work</p>
      </FadeIn>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => {
          const colSpanClass =
            index === 0 || index === 3 ? "lg:col-span-2" : "lg:col-span-1";

          return (
            <FadeIn
              key={project.title}
              delay={index * 0.1}
              className={colSpanClass}
            >
              <ProjectCard {...project} />
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
