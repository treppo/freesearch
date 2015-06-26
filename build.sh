#!/usr/bin/env bash
set -euo pipefail

version=125

pushd freetext-search/freesearchUI
npm install
popd

pushd freetext-search/searchParser
npm install
#npm test
popd

mkdir -p dist
cp -R freetext-search freetext-search-$version
zip -r dist/freetext-search-$version.zip freetext-search-$version
rm -r freetext-search-$version