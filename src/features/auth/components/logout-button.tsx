"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { logout } from "../server/auth.actions";

/** A one-button form; `logout` clears the session and redirects home. */
export function LogoutButton() {
  const t = useTranslations("common");
  return (
    <form action={logout}>
      <Button variant="subtle" size="sm">
        {t("logOut")}
      </Button>
    </form>
  );
}
