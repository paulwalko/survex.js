#!/bin/bash

EMSDK_VERSION=3.1.0

clean() {
  # emsdk-$EMSDK_VERSION only exists if the init-emsdk command was partially completed
  rm -rf build/ emsdk/ emsdk-$EMSDK_VERSION/
}

init-emsdk() {
  if [ ! -d './emsdk' ]; then
    # Download emsdk
    curl -o emsdk.zip -L https://github.com/emscripten-core/emsdk/archive/refs/tags/$EMSDK_VERSION.zip
    unzip emsdk.zip && mv emsdk-$EMSDK_VERSION/ emsdk/
    rm emsdk.zip
    pushd emsdk &>/dev/null
    ./emsdk install $EMSDK_VERSION
    ./emsdk activate $EMSDK_VERSION
    popd &>/dev/null
  else
    echo 'emsdk directory already exists... not downloading new version.'
  fi

  # Initialize the environment
  source ./emsdk/emsdk_env.sh
}

build() {
  echo 'Building wasm libraries...'
  rm -rf wasm/
  cp -r src/ wasm/
  pushd wasm/ &>/dev/null
  emcc survex/src/img.c img_shim.c \
    -O3 \
    -s EXPORTED_FUNCTIONS="['_free']" \
    -s EXPORTED_RUNTIME_METHODS="['FS', 'getValue', 'UTF8ToString']" \
    -o img.js
  popd &>/dev/null
}

package() {
  echo 'Packaging with webpack...'
  npx webpack
}


$@
