#!/bin/bash
# Appends signing overlay to build.gradle for release builds
# Runs after "npx cap sync android" in CI

GRADLE_FILE="android/app/build.gradle"
OVERLAY_FILE="scripts/signing-overlay.gradle"

if [ ! -f "$GRADLE_FILE" ]; then
  echo "ERROR: $GRADLE_FILE not found"
  exit 1
fi

if [ ! -f "$OVERLAY_FILE" ]; then
  echo "ERROR: $OVERLAY_FILE not found"
  exit 1
fi

echo "" >> "$GRADLE_FILE"
echo "// --- Signing config injected by CI ---" >> "$GRADLE_FILE"
cat "$OVERLAY_FILE" >> "$GRADLE_FILE"

echo "Signing config appended to $GRADLE_FILE"

# Verification: check that signingConfigs is now present
if grep -q "signingConfigs" "$GRADLE_FILE"; then
  echo "OK: signingConfigs block found in build.gradle"
else
  echo "ERROR: signingConfigs block NOT found after injection"
  exit 1
fi
