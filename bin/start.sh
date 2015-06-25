#!/usr/bin/env bash
cd freesearchUI
mkdir -p logs
touch logs/searchLine.log
node --harmony server.js