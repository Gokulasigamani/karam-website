"use server";

import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import type { FormState } from "@/types/form";
import type { GeoPoint } from "../types";
import { text, toFieldErrors } from "@/lib/utils/form";
import { routes } from "@/constants/routes";
import { profileSchema } from "../schemas/auth.schema";
import { getCurrentUser } from "./session";
import { updateProfile } from "./users.repo";

/** A resized avatar should be a handful of KB; this ceiling stops an oversized
 *  data-URL from bloating the user record. ~600k chars ≈ 440KB of image. */
const MAX_PHOTO_CHARS = 600_000;

/** Reads a validated data-URL image, or "" for none / anything suspicious. */
function readPhoto(formData: FormData): string | null {
  const value = formData.get("photo");
  if (typeof value !== "string" || value === "") return "";
  if (!value.startsWith("data:image/")) return null;
  if (value.length > MAX_PHOTO_CHARS) return null;
  return value;
}

/** Reads the dropped pin, or undefined when either coordinate is missing/invalid. */
function readLocation(formData: FormData): GeoPoint | undefined {
  const lat = Number.parseFloat(text(formData, "lat"));
  const lng = Number.parseFloat(text(formData, "lng"));
  const valid =
    Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  return valid ? { lat, lng } : undefined;
}

export async function saveProfile(_previous: FormState, formData: FormData): Promise<FormState> {
  const t = await getTranslations();
  const current = await getCurrentUser();
  if (!current) return { status: "error", message: t("auth.loginAgain") };

  const parsed = profileSchema.safeParse({
    name: text(formData, "name"),
    bio: text(formData, "bio"),
    ward: text(formData, "ward"),
    district: text(formData, "district"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: t("forms.checkFields"),
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const photo = readPhoto(formData);
  if (photo === null) {
    return { status: "error", message: t("account.photoInvalid") };
  }

  try {
    await updateProfile(current.id, {
      name: parsed.data.name,
      bio: parsed.data.bio ?? "",
      ward: parsed.data.ward ?? "",
      district: parsed.data.district,
      photo,
      location: readLocation(formData),
    });
  } catch (error) {
    console.error("saveProfile failed", error);
    return { status: "error", message: t("account.saveError") };
  }

  revalidatePath(routes.account);
  return { status: "success", message: t("account.saved") };
}
