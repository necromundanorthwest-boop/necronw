#!/bin/bash
set -euo pipefail

# Locate the website even when Terminal is still in the user's home folder.
release_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$release_dir"

if ! command -v npx >/dev/null 2>&1; then
  printf '%s\n' 'Node.js and npx are required. Install Node.js, then run this script again.'
  exit 1
fi

printf '%s\n' 'Deploying NecroNW alpha.5 to the existing splashpage Worker.'
npx wrangler@4 deploy --config "$release_dir/wrangler.json"
printf '\n%s\n' 'Check the deployed version: https://splashpage.necromundanorthwest.workers.dev/release.json'
