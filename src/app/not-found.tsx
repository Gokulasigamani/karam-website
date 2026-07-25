import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-bold tracking-[0.14em] text-lime-500 uppercase">{t("eyebrow")}</p>
      <h1 className="text-[1.75rem] font-extrabold text-ink lg:text-[2rem]">{t("title")}</h1>
      <p className="max-w-md text-[0.875rem] leading-[1.7] text-muted">{t("body")}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2.5">
        <Button href={routes.home}>{t("home")}</Button>
        <Link
          href={routes.cases}
          className="inline-flex h-11 items-center px-5 text-sm font-semibold text-ink hover:opacity-60"
        >
          {t("cases")}
        </Link>
      </div>
    </Container>
  );
}
