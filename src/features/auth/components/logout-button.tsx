import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { logout } from "../server/auth.actions";

/** A one-button form; `logout` clears the session and redirects home. */
export async function LogoutButton() {
  const t = await getTranslations("common");
  return (
    <form action={logout}>
      <Button variant="subtle" size="sm">
        {t("logOut")}
      </Button>
    </form>
  );
}
