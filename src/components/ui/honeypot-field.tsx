import { HONEYPOT_NAME } from "@/lib/security/honeypot";

/**
 * A decoy field for bots. Hidden off-screen and skipped by the keyboard and
 * screen readers, so a real person never sees or fills it — but a form-filling
 * bot does, which lets the server drop the submission.
 */
export function HoneypotField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
        border: 0,
        padding: 0,
        margin: -1,
      }}
    >
      <label>
        Company (leave this blank)
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
