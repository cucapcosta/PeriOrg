#!/bin/bash
# Injeta signing config no build.gradle do app Android
# Roda depois de "npx cap add android" no CI

GRADLE_FILE="android/app/build.gradle"

if [ ! -f "$GRADLE_FILE" ]; then
  echo "build.gradle not found, skipping signing config"
  exit 0
fi

# Adiciona signingConfigs antes do buildTypes
sed -i '/buildTypes {/i \
    signingConfigs {\
        release {\
            storeFile file(project.findProperty("storeFile") ?: "not-found.jks")\
            storePassword project.findProperty("storePassword") ?: ""\
            keyAlias project.findProperty("keyAlias") ?: ""\
            keyPassword project.findProperty("keyPassword") ?: ""\
        }\
    }' "$GRADLE_FILE"

# Adiciona signingConfig ao buildType release
sed -i '/buildTypes {/{n;s/release {/release {\n            signingConfig signingConfigs.release/}' "$GRADLE_FILE"

echo "Signing config injected into $GRADLE_FILE"
