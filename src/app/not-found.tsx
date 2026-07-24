import Link from "next/link";
import { Container } from "@/components/ui/container";
import { routes } from "@/constants/routes";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-medium opacity-60">404</p>
      <h1 className="text-2xl font-semibold">This page could not be found.</h1>
      <Link href={routes.home} className="text-sm underline underline-offset-4">
        Back to home
      </Link>
    </Container>
  );
}
