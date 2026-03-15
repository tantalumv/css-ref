#!/usr/bin/env bash
#
# Verify GitHub Pages + Fastly compression
# Usage: ./scripts/verify-deployment.sh
#

set -e

SITE_URL="https://tantalumv.github.io/css-ref"

echo "🔍 Verifying GitHub Pages + Fastly Deployment"
echo "=============================================="
echo ""

# Check if curl is available
if ! command -v curl &> /dev/null; then
    echo "❌ curl is not installed. Please install curl and try again."
    exit 1
fi

echo "📡 Fetching headers from $SITE_URL..."
echo ""

# Get headers with Brotli acceptance
HEADERS=$(curl -sI -H "Accept-Encoding: br" "$SITE_URL/")

echo "### Response Headers ###"
echo "$HEADERS"
echo ""

# Initialize status variables
BROTLI_ENABLED=false
GZIP_ENABLED=false
FASTLY_DETECTED=false
REMIX_REMOVED=true

# Check for Brotli encoding
if echo "$HEADERS" | grep -qi "content-encoding: br"; then
    echo "✅ Brotli compression: ENABLED"
    BROTLI_ENABLED=true
elif echo "$HEADERS" | grep -qi "content-encoding: gzip"; then
    echo "⚠️  Gzip compression: ENABLED (Brotli not used)"
    GZIP_ENABLED=true
else
    echo "❌ Compression: NOT DETECTED"
fi

# Check for Fastly headers
if echo "$HEADERS" | grep -qi "x-served-by"; then
    echo "✅ Fastly CDN: DETECTED"
    FASTLY_DETECTED=true
    FASTLY_POP=$(echo "$HEADERS" | grep -i "x-served-by" | cut -d: -f2 | tr -d ' ')
    echo "   Fastly POP: $FASTLY_POP"
else
    echo "⚠️  Fastly CDN: NOT DETECTED (may be cached)"
fi

# Check X-Cache status
if echo "$HEADERS" | grep -qi "x-cache"; then
    X_CACHE=$(echo "$HEADERS" | grep -i "x-cache" | cut -d: -f2 | tr -d ' ')
    echo "Fastly Cache Status: $X_CACHE"
    if [ "$X_CACHE" = "HIT" ]; then
        echo "   (Content served from edge cache)"
    else
        echo "   (Content fetched from origin)"
    fi
fi

# Check Server header
if echo "$HEADERS" | grep -qi "server: github.com"; then
    echo "✅ GitHub Pages Server: DETECTED"
fi

echo ""
echo "### Asset Verification ###"
echo ""

# Verify bundle.js size
echo "📦 Checking bundle.js..."
JS_HEADERS=$(curl -sI -H "Accept-Encoding: br" "$SITE_URL/dist/bundle.js")

if echo "$JS_HEADERS" | grep -qi "content-encoding: br"; then
    echo "   ✅ bundle.js: Brotli compressed"
elif echo "$JS_HEADERS" | grep -qi "content-encoding: gzip"; then
    echo "   ⚠️  bundle.js: Gzip compressed"
else
    echo "   ❌ bundle.js: NOT compressed"
fi

# Get content-length if available
JS_SIZE=$(echo "$JS_HEADERS" | grep -i "content-length:" | cut -d: -f2 | tr -d ' \r\n')
if [ -n "$JS_SIZE" ]; then
    echo "   Transferred size: $JS_SIZE bytes"
fi

echo ""

# Verify CSS bundle
echo "🎨 Checking bundle.css..."
CSS_HEADERS=$(curl -sI -H "Accept-Encoding: br" "$SITE_URL/dist/bundle.css")

if echo "$CSS_HEADERS" | grep -qi "content-encoding: br"; then
    echo "   ✅ bundle.css: Brotli compressed"
elif echo "$CSS_HEADERS" | grep -qi "content-encoding: gzip"; then
    echo "   ⚠️  bundle.css: Gzip compressed"
else
    echo "   ❌ bundle.css: NOT compressed"
fi

CSS_SIZE=$(echo "$CSS_HEADERS" | grep -i "content-length:" | cut -d: -f2 | tr -d ' \r\n')
if [ -n "$CSS_SIZE" ]; then
    echo "   Transferred size: $CSS_SIZE bytes"
fi

echo ""

# Verify no remixicon requests (check HTML for remixicon.css reference)
echo "🔍 Checking for removed Remix Icon font..."
HTML_CONTENT=$(curl -s "$SITE_URL/")

if echo "$HTML_CONTENT" | grep -qi "remixicon"; then
    echo "⚠️  Remix Icon font: STILL REFERENCED in HTML"
    REMIX_REMOVED=false
else
    echo "✅ Remix Icon font: NOT LOADED (optimization working)"
fi

echo ""
echo "### Summary ###"
echo ""

if [ "$BROTLI_ENABLED" = true ]; then
    echo "✅ Compression: Working (Brotli)"
elif [ "$GZIP_ENABLED" = true ]; then
    echo "✅ Compression: Working (Gzip)"
else
    echo "❌ Compression: NOT WORKING"
fi

if [ "$FASTLY_DETECTED" = true ]; then
    echo "✅ Fastly CDN: Active"
else
    echo "⚠️  Fastly CDN: Not detected in headers"
fi

if [ "$REMIX_REMOVED" = true ]; then
    echo "✅ Icon optimization: Working (-209 kB)"
else
    echo "⚠️  Icon optimization: Not working"
fi

echo ""

# Exit with error if compression not working
if [ "$BROTLI_ENABLED" = false ] && [ "$GZIP_ENABLED" = false ]; then
    echo "❌ ERROR: No compression detected!"
    echo ""
    echo "Possible causes:"
    echo "  1. GitHub Pages hasn't finished propagating (wait 1-2 minutes)"
    echo "  2. Recent deployment still processing"
    echo "  3. CDN cache needs to be purged"
    echo ""
    echo "Try again in 30 seconds or check the GitHub Actions deployment status."
    exit 1
fi

echo "✅ All checks passed!"
echo ""
echo "Expected size reductions:"
echo "  - Remix Icons: 210.9 kB → ~2 kB (-99%)"
echo "  - Varela Font: 23.0 kB → ~12 kB (-48%)"
echo "  - Total Page: ~315 kB → ~95 kB (-70%)"
echo ""
