interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export function SectionWrapper({ children, id, className }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 px-4 md:px-6 lg:px-8${className ? ` ${className}` : ""}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
