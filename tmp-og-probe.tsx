/** Scratch probe: get an un-ignore-listed stack out of the OG renderer. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

async function render(label: string, element: React.ReactElement, fonts?: any[]) {
  try {
    const res = new ImageResponse(element, { width: 400, height: 200, ...(fonts ? { fonts } : {}) });
    const buf = Buffer.from(await res.arrayBuffer());
    console.log(`${label}: OK ${buf.length} bytes, png=${buf.subarray(1, 4).toString() === "PNG"}`);
  } catch (e) {
    console.log(`${label}: FAILED`);
    console.log(e);
  }
}

async function main() {
  const font = await readFile(join(process.cwd(), "public", "fonts", "dancing-script.ttf"));
  console.log("font bytes:", font.length);

  // A: no custom font at all — is the pipeline itself fine?
  await render("A no-font", <div style={{ display: "flex", fontSize: 24 }}>plain</div>);

  // B: custom font registered but not used
  await render(
    "B font-registered-unused",
    <div style={{ display: "flex", fontSize: 24 }}>plain</div>,
    [{ name: "Dancing Script", data: font, style: "normal", weight: 600 }],
  );

  // C: custom font actually applied — the case the card hits
  await render(
    "C font-applied",
    <div style={{ display: "flex", fontSize: 24, fontFamily: "Dancing Script" }}>Gokulasigamani</div>,
    [{ name: "Dancing Script", data: font, style: "normal", weight: 600 }],
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
