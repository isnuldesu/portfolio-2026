// Draws the MI brush monogram and writes it as clean SVG (npm run logo).
//
// The mark is written like a broad-nib pen: a flat elliptical nib, held at a
// fixed angle, is stamped along each stroke's centreline, so downstrokes come
// out thick and hairlines thin, and the strokes swell in and taper out. The
// stamped drawing is rendered large and traced with potrace into one smooth
// outline: plain filled paths, no strokes or text, the same at every size.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const NIB_ANGLE = -38; // degrees
const NIB_W = 12.5; // half-length of the nib
const NIB_H = 6.2; // half-thickness of the nib: a broad marker rather than a fine pen
const SLANT = -13; // italic skew, degrees
const CORAL = "#EB5362";

// Strokes in an upright 300 x 200 box (y down), each a list of cubic segments.
const strokes = [
  // lead-in and first stem
  [[[6, 132], [16, 84], [34, 58], [46, 60]], [[46, 60], [56, 62], [50, 118], [42, 172]]],
  // first arch
  [[[44, 120], [54, 72], [72, 54], [88, 55]], [[88, 55], [106, 56], [106, 84], [103, 118]], [[103, 118], [101, 140], [99, 156], [97, 172]]],
  // second arch, running on into the i
  [
    [[100, 120], [110, 72], [128, 54], [144, 55]],
    [[144, 55], [162, 56], [162, 84], [159, 118]],
    [[159, 118], [156, 146], [152, 170], [172, 171]],
    [[172, 171], [190, 172], [202, 136], [210, 96]],
  ],
  // i stem and the flick out
  [[[210, 96], [206, 132], [198, 166], [218, 169]], [[218, 169], [238, 171], [262, 148], [282, 116]]],
];
const DOT = { x: 232, y: 34, r: 14 };

const bez = ([p0, p1, p2, p3], t) => {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]];
};

// Stamp the nib along every stroke. Ends taper to 45% so strokes start and
// finish like a pen lifting off.
function stamps() {
  const out = [];
  for (const stroke of strokes) {
    const pts = [];
    stroke.forEach((seg, i) => {
      for (let s = i ? 1 : 0; s <= 120; s++) pts.push(bez(seg, s / 120));
    });
    pts.forEach(([x, y], i) => {
      const t = i / (pts.length - 1);
      const k = Math.min(1, t / 0.1, (1 - t) / 0.12) * 0.55 + 0.45;
      out.push(
        `<ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="${(NIB_W * k).toFixed(2)}" ry="${Math.max(NIB_H, NIB_H * k).toFixed(2)}" transform="rotate(${NIB_ANGLE} ${x.toFixed(2)} ${y.toFixed(2)})"/>`,
      );
    });
  }
  out.push(`<circle cx="${DOT.x}" cy="${DOT.y}" r="${DOT.r}"/>`);
  return out.join("");
}

const k = Math.tan((SLANT * Math.PI) / 180);
const VB = { x: -10, y: 0, w: 320, h: 200 };
const SCALE = 12; // render 3840 x 2400 for tracing

// Render the stamped mark black on white, at size, for potrace.
const drawing = `<svg xmlns="http://www.w3.org/2000/svg" width="${VB.w * SCALE}" height="${VB.h * SCALE}" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}"><rect x="${VB.x}" y="${VB.y}" width="${VB.w}" height="${VB.h}" fill="#fff"/><g transform="matrix(1 0 ${k.toFixed(4)} 1 ${(-k * 200).toFixed(2)} 0)" fill="#000">${stamps()}</g></svg>`;
const { data, info } = await sharp(Buffer.from(drawing)).greyscale().raw().toBuffer({ resolveWithObject: true });

// Write a PGM and trace it.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mi-logo-"));
const pgm = path.join(tmp, "mark.pgm");
fs.writeFileSync(pgm, Buffer.concat([Buffer.from(`P5\n${info.width} ${info.height}\n255\n`), data]));
const traced = execFileSync("potrace", [pgm, "-s", "-o", "-", "--turdsize", "8", "--alphamax", "1.1", "--opttolerance", "0.25", "-k", "0.5"]).toString();
fs.rmSync(tmp, { recursive: true, force: true });

// potrace writes points in a flipped, x10 coordinate space; keep its group
// transform and map that back into our viewBox.
const g = traced.match(/<g transform="([^"]+)"[^>]*>([\s\S]*?)<\/g>/);
const d = [...g[2].matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(" ");
const toVB = `translate(${VB.x} ${VB.y}) scale(${1 / SCALE}) ${g[1]}`;
const mark = (fill) => `<path fill="${fill}" transform="${toVB}" d="${d.replace(/\s+/g, " ").trim()}"/>`;

const svg = (body, w, h, vb) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">${body}</svg>\n`;
const vb = `${VB.x} ${VB.y} ${VB.w} ${VB.h}`;

fs.mkdirSync("public/brand", { recursive: true });
fs.writeFileSync("public/brand/mi-mark.svg", svg(mark(CORAL), VB.w, VB.h, vb));
fs.writeFileSync("public/brand/mi-mark-white.svg", svg(mark("#FFFFFF"), VB.w, VB.h, vb));
// App icon and favicon: white mark on a coral rounded square.
fs.writeFileSync(
  "src/app/icon.svg",
  svg(`<rect width="512" height="512" rx="116" fill="${CORAL}"/><g transform="translate(36 112) scale(1.38)">${mark("#FFFFFF")}</g>`, 512, 512, "0 0 512 512"),
);
// The path alone, for the inline React component.
fs.writeFileSync("src/components/site/mi-mark-path.ts", `// Generated by scripts/build-logo.mjs. Do not edit by hand.\nexport const MI_VIEWBOX = "${vb}";\nexport const MI_TRANSFORM = "${toVB}";\nexport const MI_PATH = "${d.replace(/\s+/g, " ").trim()}";\n`);
console.log("wrote public/brand/mi-mark.svg, public/brand/mi-mark-white.svg, src/app/icon.svg, src/components/site/mi-mark-path.ts");

// Raster icons from the same artwork: the browser tab icon and the iOS home screen icon.
await sharp("src/app/icon.svg").resize(512).png().toFile("src/app/icon.png");
await sharp("src/app/icon.svg").resize(180).png().toFile("src/app/apple-icon.png");
console.log("wrote src/app/icon.png, src/app/apple-icon.png");
