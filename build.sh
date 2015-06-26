#!/usr/bin/env bash
set -euo pipefail

pushd freetext-search/freesearchUI
npm install
popd

pushd freetext-search/searchParser
npm install
#npm test
popd

mkdir -p dist
cp -R freetext-search freetext-search-123
zip -r dist/freetext-search-123.zip freetext-search-123
rm -r freetext-search-123