import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/** Centred single-column layout shared by the login and signup pages. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <Container className="py-16 lg:py-24">
      <Reveal className="mx-auto w-full max-w-md">
        <h1 className="text-[1.75rem] font-extrabold text-ink lg:text-[2rem]">{title}</h1>
        <p className="mt-2 text-[0.9375rem] leading-[1.7] text-muted">{subtitle}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-6 text-[0.875rem] text-muted">{footer}</p>
      </Reveal>
    </Container>
  );
}
