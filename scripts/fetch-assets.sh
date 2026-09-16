#!/bin/bash
# One-off: pull nicswork.online Canva assets, resize, re-encode.
# Opaque -> JPEG q82, alpha -> PNG. next/image emits AVIF/WebP at request time.
set -uo pipefail

SRC="https://nicswork.online/_assets/media"
RAW="$(dirname "$0")/raw"
OUT="${1:?usage: fetch-assets.sh <output-dir>}"
mkdir -p "$RAW" "$OUT"

fail=0

# name:maxpx:hash...
grab() {
  local name="$1" max="$2"; shift 2
  local n=1
  for h in "$@"; do
    local png="$RAW/$h.png"
    if [ ! -s "$png" ]; then
      curl -sSf -o "$png" "$SRC/$h.png" || { echo "DOWNLOAD FAIL: $name #$n $h"; fail=1; rm -f "$png"; continue; }
    fi
    # reject non-images (404 pages etc.)
    if ! sips -g pixelWidth "$png" >/dev/null 2>&1; then
      echo "NOT AN IMAGE: $name #$n $h"; fail=1; rm -f "$png"; continue
    fi
    local alpha; alpha=$(sips -g hasAlpha "$png" 2>/dev/null | awk '/hasAlpha/{print $2}')
    local base; base=$([ "$#" -eq 1 ] && echo "$name" || echo "$name-$n")
    if [ "$alpha" = "yes" ]; then
      sips -Z "$max" -s format png "$png" --out "$OUT/$base.png" >/dev/null 2>&1 || { echo "CONVERT FAIL: $base"; fail=1; }
    else
      sips -Z "$max" -s format jpeg -s formatOptions 82 "$png" --out "$OUT/$base.jpg" >/dev/null 2>&1 || { echo "CONVERT FAIL: $base"; fail=1; }
    fi
    n=$((n+1))
  done
}

# --- backgrounds / decor ---
grab hero-bg      1920 0606266ceadd9781bddbe0ef56ee1c9f
grab work-bg      1920 fd79ee9b33a949c191ec2800d37f4be5
grab texture      1920 ded7169a1989a8a20b65424946a6b06e
grab divider      1600 b67f73ef9f2545e29ec7986e158ceb7e
grab capability-bg 1920 b4bf2080a46ade74e53532129ef0c64a
grab contact-bg   1920 9566763b2fa739495f4ce00b4c5d2240
grab portrait     1200 a6d4f80583935a357ab54a7fd419c58f

# --- graphic design work (displayed ~350px wide; 1000 covers 2x) ---
grab brand-kits 1000 \
  4b460debd786734d4c177d00af203a9d d4a83d4eccde4a466f66d776011e8b43 \
  ec638d1aedb3e285aacc67769c76f363 13f9b265fd72767e8f896301cd887ab3

grab digital-book 1000 \
  f00a1945b5b88b74d445d88b56e6d8fb a6dde44f166083a53085cc84da5ee46f \
  cc86ee5c9e3b816f4dbadbc5dd9a39ad 81d9ecec17b261e7bf86509aff6c7110 \
  6c109c2f54fd72d7aefa4aa01f76fdbc 78a9eb967e85d57d7ed07bbaa7a64043 \
  4a0978cc0f7b27d7ddf4710b7c43b7f9 e6b6f306d85329f124dc6668ed8035ec

grab card-deck 1000 \
  d89af8ac436e5b76b990e1e605b1bea9 bd22a01f4247cd0fc863b75e230c1c5a \
  768a6bc3b9465d3b5c1cdb89eeaccd76 18bcb24a4d4a0c615ab894d7eb38f5ee \
  9185c6486565a058d5ca6f234f08f6ef 81f4461ad73c8b72797588ea2c0ad9b9 \
  00a53527a77489a361311ed5bdc6bc00

grab scripture-card 1000 \
  4142dc3e6a4aa3aaa583a5979635b8f3 a4732e81ede262bb28cc019d7db273f1 \
  5b80e8bd68a2e90c6372c633bcacade2 ae50e1409cb28a439c27f0a958aeebc3 \
  7814d8b1efdbe928f7c6129b8a80bb01 34990fa499ab2ee6081092accec7a654 \
  1ac5772f5079f3a808e80f94a2d9a180 4a0a86c6ff92d8dba36cf7e7fecbfec0

grab social-thumbnails 1000 \
  87ad3e7e6f82423b88766ed7f7724458 75b736779804d9c4b75ada8492ebcd78 \
  a817a190525086d006b132c3c6707955 bdda303fa9e36d1aa0dadabfa714e860 \
  1cb4de91a33f35159d4461f9ef7d0cde ce6e6c9c6427eeb4a6bc65126cfd8864

grab magazines 1000 \
  c77ad485531bfe6b143e207a05cbed65 98ec928a504609014b123d0cfae96886 \
  5c78e105037db201ad18aaa673120f47 6a4c140efea3c9fb3f040ec783f0b7fd

grab digital-marketing 1000 \
  ba6e9589e6d6e6d7b422f236ddc0bbf2 f2a1720fa1c1b1459aab8d6740b67c26 \
  07c33210c12ad057d24bb2a5dc7b950f 2764384ec863dea66f6f27abd97b8c44 \
  910289be8c66536773caebbc7dd70f17 bf10ae1758d408ae5691cd969b13e923 \
  77fc21c474763aef74f47bcf4bbe973e d80bbb67cfb5996849775bcd11c9f796

echo "---"
echo "raw:       $(du -sh "$RAW" | cut -f1)  ($(ls "$RAW" | wc -l | tr -d ' ') files)"
echo "processed: $(du -sh "$OUT" | cut -f1)  ($(ls "$OUT" | wc -l | tr -d ' ') files)"
[ "$fail" -eq 0 ] && echo "ALL OK" || { echo "SOME FAILED (see above)"; exit 1; }
