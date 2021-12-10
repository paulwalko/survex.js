#!/bin/bash

package() {
  rm -rf package
  mkdir -p package
  pushd package &>/dev/null
  cp ../include/img_shim.c ../include/survex/src/{img.c,img.h} .
  emcc img.c img_shim.c \
    -O3 \
    -s EXPORTED_FUNCTIONS="['_free']" \
    -s EXPORTED_RUNTIME_METHODS="['FS', 'getValue', 'UTF8ToString']" \
    -o ../img.js
  popd &>/dev/null
  rm -rf package
}


$@
