#!/usr/bin/env bash
# Render the resume and CV print pages to A4 PDFs in public/downloads.
# Needs the dev server running (npm run dev) and Google Chrome installed.
# Chrome is used directly because its print-to-pdf honours `@page { size: A4 }`.
set -euo pipefail

BASE="${BASE:-http://localhost:3000}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

mkdir -p public/downloads
for doc in resume-en resume-id cv-en cv-id; do
  kind="${doc%%-*}"
  lang="${doc##*-}"
  out="public/downloads/muhammad-isnul-${kind}-2026-${lang}.pdf"
  "$CHROME" --headless=new --disable-gpu --user-data-dir="$PROFILE" \
    --no-pdf-header-footer --virtual-time-budget=5000 \
    --print-to-pdf="$out" "$BASE/print/$doc" 2>/dev/null
  echo "wrote $out"
done
