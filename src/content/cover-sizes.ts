/**
 * Intrinsic pixel size of every cover image, so the case study reel can give
 * next/image the true box and nothing shifts while covers load. Regenerate
 * when a cover is replaced (sips -g pixelWidth -g pixelHeight <file>).
 */
export const coverSizes: Record<string, [number, number]> = {
  "/work/covers/andalusclass.webp": [2048, 1449],
  "/work/covers/backslash-creative.webp": [2048, 1536],
  "/work/covers/birru-co.webp": [2048, 1536],
  "/work/covers/geoleo.webp": [2048, 1536],
  "/work/covers/laba-id.webp": [2048, 1449],
  "/work/covers/luna-pos.webp": [2048, 1449],
  "/work/covers/probe.webp": [2048, 1536],
  "/work/covers/rt-pintar.webp": [2048, 1536],
  "/work/covers/samase-sports-club.webp": [2048, 1280],
  "/work/covers/singapore-scout-association.webp": [2048, 1449],
  "/work/covers/tokoclippers.webp": [1440, 1080],
  "/work/covers/vjatre-skincare.webp": [2048, 1536],
  "/work/type-abahchan.webp": [2048, 1536],
  "/work/type-beembo.webp": [2048, 4491],
  "/work/type-geoleo.webp": [2048, 1536],
  "/work/type-jablo.webp": [2048, 1536],
  "/work/deck/samase-sports-club.webp": [2048, 1449],
  "/work/deck/tokoclippers.webp": [2048, 1449],
};
