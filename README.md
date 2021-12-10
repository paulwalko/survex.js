# survex.js

Dependencies
- survex: 1.4.1


### Example

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
