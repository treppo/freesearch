#!/usr/bin/env bash
set -euo pipefail

pushd freesearchUI
npm install
popd

pushd searchParser
npm install
npm test
popd

mkdir -p dist
tar czf dist/freesearch.tgz freesearchUI searchParser bin