# survex.js

Dependencies
- [survex: 1.4.1](https://github.com/ojwb/survex/tree/v1.4.1)
- [emsdk: 3.1.0](https://github.com/emscripten-core/emsdk/tree/3.1.0). This defaults to node 14.15.5 and npm 6.14.11.


## Development
1. Run `source ./build.sh init-emsdk` to initialize the environment before doing any other dev work. `source` is required to update the `PATH` in the current shell
1. Run `git submodule update --init` to fetch `src/survex`
1. In `build.sh`, see `build` for building wasm files or `package` for building webpack files


### Example

- Only works as a proper NPM module (no browser support, PRs accepted :))

```
const survex = require('survex.js');

survex.load((Survex) => {
  Survex.imgOpen('http://10.42.0.203:8081/svn/skydusky/us/va/bland/Skydusky/Skydusky.3d')
  .then(img => {
    while (img.code >= 0) {
      if (img.code === survex.codes['raw']['img_LABEL']) {
        console.log(`label: ${img.label}, X: ${img.mv.x}, Y: ${img.mv.y}, Z: ${img.mv.z}`);
      }
      img = Survex.imgReadItem(img.ptr);
    }
  });
});
```
