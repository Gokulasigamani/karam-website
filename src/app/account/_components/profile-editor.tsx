"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { initialFormState } from "@/types/form";
import type { GeoPoint, SessionUser } from "@/features/auth/types";
import { saveProfile } from "@/features/auth/server/profile.actions";
import { Field, Input, Textarea } from "@/components/ui/field";
import { FormMessage } from "@/components/ui/form-message";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icons";
import { LocationPicker } from "./location-picker";

/** Resizes any picked image to a square data-URL, small enough to live on the
 *  user record. Cover-crops to the centre so portraits are not squashed. */
async function toAvatarDataUrl(file: File, size = 256, quality = 0.82): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");
  const scale = Math.max(size / bitmap.width, size / bitmap.height);
  const w = bitmap.width * scale;
  const h = bitmap.height * scale;
  ctx.drawImage(bitmap, (size - w) / 2, (size - h) / 2, w, h);
  bitmap.close?.();
  return canvas.toDataURL("image/jpeg", quality);
}

export function ProfileEditor({ user, onDone }: { user: SessionUser; onDone: () => void }) {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(saveProfile, initialFormState);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [district, setDistrict] = useState(user.district ?? "");
  const [ward, setWard] = useState(user.ward ?? "");
  const [photo, setPhoto] = useState(user.photo ?? "");
  const [location, setLocation] = useState<GeoPoint | null>(user.location ?? null);
  const [photoError, setPhotoError] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Close the editor once the save succeeds (server has re-rendered the header).
  useEffect(() => {
    if (state.status === "success") onDone();
  }, [state.status, onDone]);

  const err = (field: string) => {
    const key = state.fieldErrors?.[field]?.[0];
    return key ? t(key) : undefined;
  };

  const onPickFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setPhotoError(false);
    try {
      setPhoto(await toAvatarDataUrl(file));
    } catch {
      setPhotoError(true);
    }
  };

  return (
    <form
      action={formAction}
      noValidate
      className="card-pattern rounded-[var(--radius-block)] bg-surface p-6 sm:p-8"
    >
      <FormMessage state={state} className="mb-6" />

      {/* Photo */}
      <div className="flex items-center gap-5">
        <Avatar name={name || user.name} photo={photo} className="size-20" textClassName="text-xl" />
        <div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full bg-shade px-3.5 py-1.5 text-[0.8125rem] font-semibold text-paper transition-opacity hover:opacity-90"
            >
              <Icon name="plus" className="size-3.5" />
              {t("account.changePhoto")}
            </button>
            {photo && (
              <button
                type="button"
                onClick={() => setPhoto("")}
                className="rounded-full px-3 py-1.5 text-[0.8125rem] font-semibold text-muted hover:text-ink"
              >
                {t("account.removePhoto")}
              </button>
            )}
          </div>
          <p className="mt-2 text-[0.75rem] text-muted">{t("account.photoHint")}</p>
          {photoError && (
            <p className="mt-1 text-[0.75rem] font-medium text-red-600">
              {t("account.photoInvalid")}
            </p>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onPickFile}
        />
        <input type="hidden" name="photo" value={photo} />
      </div>

      <div className="mt-8 grid gap-5 border-t border-hairline pt-8">
        <Field label={t("account.nameLabel")} htmlFor="name" required error={err("name")}>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            invalid={Boolean(err("name"))}
            maxLength={80}
          />
        </Field>

        <Field
          label={t("account.bioLabel")}
          htmlFor="bio"
          error={err("bio")}
          hint={t("account.bioHint")}
        >
          <Textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t("account.bioPlaceholder")}
            maxLength={280}
            className="min-h-24"
          />
        </Field>
      </div>

      {/* Location */}
      <div className="mt-8 border-t border-hairline pt-8">
        <h3 className="text-[0.9375rem] font-extrabold text-ink">{t("account.locationTitle")}</h3>
        <p className="mt-1 mb-5 text-[0.8125rem] leading-[1.6] text-muted">
          {t("account.locationBlurb")}
        </p>
        <LocationPicker
          district={district}
          ward={ward}
          location={location}
          onDistrictChange={setDistrict}
          onWardChange={setWard}
          onLocationChange={setLocation}
          labels={{
            districtLabel: t("forms.district"),
            chooseDistrict: t("forms.chooseDistrict"),
            wardLabel: t("account.wardLabel"),
            wardPlaceholder: t("account.wardPlaceholder"),
            wardHint: t("account.wardHint"),
            mapHint: t("account.mapHint"),
            useMyLocation: t("account.useMyLocation"),
            locating: t("account.locating"),
            pinned: t("account.pinned"),
            noPin: t("account.noPin"),
          }}
        />
        <input type="hidden" name="lat" value={location?.lat ?? ""} />
        <input type="hidden" name="lng" value={location?.lng ?? ""} />
      </div>

      <div className="mt-8 border-t border-hairline pt-6">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          <Button
            size="lg"
            type="submit"
            disabled={pending || name.trim().length < 2}
            className="w-full sm:w-auto"
          >
            {pending ? t("account.saving") : t("account.save")}
          </Button>
          <button
            type="button"
            onClick={onDone}
            className="min-h-11 px-2 text-[0.875rem] font-semibold text-muted hover:text-ink"
          >
            {t("account.cancel")}
          </button>
        </div>
        {name.trim().length < 2 && !pending && (
          <p className="mt-3 text-[0.75rem] text-muted" aria-live="polite">
            {t("forms.completeToContinue")}
          </p>
        )}
      </div>
    </form>
  );
}
