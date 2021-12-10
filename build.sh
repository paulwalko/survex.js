#!/bin/bash

emcc img.c img_shim.c \
  -O3 \
  -s EXPORTED_FUNCTIONS="['_free']" \
  -s EXPORTED_RUNTIME_METHODS="['FS', 'getValue', 'UTF8ToString']" \
  -o img.js
#  -s FORCE_FILESYSTEM=1 \
