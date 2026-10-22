#!/usr/bin/env bash
# Render the deck artboards (/print/deck/<id>) to webp in public/work/deck.
# Needs the dev server running (npm run dev) and Google Chrome installed.
set -euo pipefail

BASE="${BASE:-http://localhost:3000}"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d)"
TMP="$(mktemp -d)"
trap 'rm -rf "$PROFILE" "$TMP"' EXIT

ids=(
  samase-sports-club samase-sports-club--1 samase-sports-club--2 samase-sports-club--3
  samase-sports-club--4 samase-sports-club--5 samase-sports-club--6 samase-sports-club--7
  tokoclippers tokoclippers--1 tokoclippers--2 tokoclippers--3
  tokoclippers--4 tokoclippers--5 tokoclippers--6
)

mkdir -p public/work/deck
for id in "${ids[@]}"; do
  "$CHROME" --headless=new --disable-gpu --user-data-dir="$PROFILE" --hide-scrollbars \
    --window-size=2048,1449 --virtual-time-budget=6000 \
    --screenshot="$TMP/$id.png" "$BASE/print/deck/$id" 2>/dev/null
  node -e 'require("sharp")(process.argv[1]).webp({ quality: 86 }).toFile(process.argv[2]).then((i) => console.log(process.argv[2], Math.round(i.size / 1024) + " KB"))' \
    "$TMP/$id.png" "public/work/deck/$id.webp"
done
