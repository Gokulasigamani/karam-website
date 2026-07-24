import { Container } from "@/components/ui/container";

/** Streamed while a route segment's data resolves. Replace with real skeletons. */
export default function Loading() {
  return (
    <Container className="py-24">
      <div className="h-8 w-48 animate-pulse rounded bg-black/10 dark:bg-white/10" />
    </Container>
  );
}
