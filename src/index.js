const Module = require('./img.js');
const fetch = require('isomorphic-unfetch');

function buildImg(pStruct, code) {
  const img = {
    code,
    ptr: pStruct,
    label: (() => {
      const labelPtr = Module._malloc(4);
      Module._getLabel(pStruct, labelPtr);
      const labelVal = Module.getValue(labelPtr, 'i32');
      Module._free(labelPtr);
      return Module.UTF8ToString(labelVal);
    })(),
    flags: (() => {
      const flagsPtr = Module._malloc(4);
      Module._getFlags(pStruct, flagsPtr);
      const flags = Module.getValue(flagsPtr, 'i32');
      Module._free(flagsPtr);
      return flags;
    })(),
    title: (() => {
      const titlePtr = Module._malloc(4);
      Module._getTitle(pStruct, titlePtr);
      const titleVal = Module.getValue(titlePtr, 'i32');
      Module._free(titlePtr);
      return Module.UTF8ToString(titleVal);
    })(),
    cs: (() => {
      const csPtr = Module._malloc(4);
      Module._getCs(pStruct, csPtr);
      const csVal = Module.getValue(csPtr, 'i32');
      Module._free(csPtr);
      return Module.UTF8ToString(csVal);
    })(),
    datestamp: (() => {
      const datestampPtr = Module._malloc(4);
      Module._getDatestamp(pStruct, datestampPtr);
      const datestampVal = Module.getValue(datestampPtr, 'i32');
      Module._free(datestampPtr);
      return Module.UTF8ToString(datestampVal);
    })(),
    l: (() => {
      const lPtr = Module._malloc(4);
      Module._getL(pStruct, lPtr);
      const l = Module.getValue(lPtr, 'double');
      Module._free(lPtr);
      return l;
    })(),
    r: (() => {
      const rPtr = Module._malloc(4);
      Module._getR(pStruct, rPtr);
      const r = Module.getValue(rPtr, 'double');
      Module._free(rPtr);
      return r;
    })(),
    u: (() => {
      const uPtr = Module._malloc(4);
      Module._getU(pStruct, uPtr);
      const u = Module.getValue(uPtr, 'double');
      Module._free(uPtr);
      return u;
    })(),
    d: (() => {
      const dPtr = Module._malloc(4);
      Module._getD(pStruct, dPtr);
      const d = Module.getValue(dPtr, 'double');
      Module._free(dPtr);
      return d;
    })(),
    mv: {
      x: (() => {
        const mvxPtr = Module._malloc(4);
        Module._getMvx(pStruct, mvxPtr);
        const mvx = Module.getValue(mvxPtr, 'double');
        Module._free(mvxPtr);
        return mvx;
      })(),
      y: (() => {
        const mvyPtr = Module._malloc(4);
        Module._getMvy(pStruct, mvyPtr);
        const mvy = Module.getValue(mvyPtr, 'double');
        Module._free(mvyPtr);
        return mvy;
      })(),
      z: (() => {
        const mvzPtr = Module._malloc(4);
        Module._getMvz(pStruct, mvzPtr);
        const mvz = Module.getValue(mvzPtr, 'double');
        Module._free(mvzPtr);
        return mvz;
      })(),
    }
  };

  return img;
}


exports.load = function(callback) {
  new Promise((resolve) => {
    Module['onRuntimeInitialized'] = function() {
      Survex = {
        imgOpen: (url) => {
          const filename = url.split('/').slice(-1)[0];
          const path = `/tmp/${filename}`;
          const pathRaw = new TextEncoder().encode(path);
          const pathPtr = Module._malloc(pathRaw.length);
          const pathChunk = Module.HEAPU8.subarray(pathPtr, pathPtr + pathRaw.length);
          pathChunk.set(pathRaw);

          return fetch(url)
          .then(r => r.arrayBuffer())
          .then(b => {
            const data = new Uint8Array(b);
            Module.FS.writeFile(path, data);
          })
          .then(() => {
            const ppStruct = Module._malloc(4);
            Module._jsImgOpen(ppStruct, pathChunk.byteOffset);
            Module._free(pathPtr);
            const pStruct = Module.getValue(ppStruct, 'i32');
            Module._free(ppStruct);
            
            return buildImg(pStruct, 0);
          });
        },
        imgReadItem: (pStruct) => {
          const ppStruct = Module._malloc(4);
          const codePtr = Module._malloc(4);
          Module._jsImgReadItem(ppStruct, pStruct, codePtr);

          pStruct = Module.getValue(ppStruct, 'i32');
          const code = Module.getValue(codePtr, 'i32');
          Module._free(ppStruct);
          Module._free(codePtr);

          return buildImg(pStruct, code);
        },
      }

      callback(Survex);
    }
  });
};

exports.codes = {
  'type': {
    '-2': 'img_BAD',
    '-1': 'img_STOP',
    '0': 'img_MOVE',
    '1': 'img_LINE',
    '3': 'img_LABEL',
    '4': 'img_XSECT',
    '5': 'img_XSECT_END',
    '6': 'img_ERROR_INFO',
  },
  'leg': {
    '1': 'img_FLAG_SURFACE',
    '2': 'img_FLAG_DUPLICATE',
    '4': 'img_FLAG_SPLAY',
  },
  'station': {
    '1': 'img_SFLAG_SURFACE',
    '2': 'img_SFLAG_UNDERGROUND',
    '4': 'img_SFLAG_ENTRANCE',
    '8': 'img_SFLAG_EXPORTED',
    '16': 'img_SFLAG_FIXED',
    '32': 'img_SFLAG_ANON',
    '64': 'img_SFLAG_WALL',
  },
  'file': {
    '128': 'img_FFLAG_EXTENDED',
  },
  'xsect': {
    '1': 'img_XFLAG_END',
  },
  'style': {
    '-1': 'img_STYLE_UNKNOWN',
    '0': 'img_STYLE_NORMAL',
    '1': 'img_STYLE_DIVING',
    '2': 'img_STYLE_CARTESIAN',
    '3': 'img_STYLE_CYLPOLAR',
    '4': 'img_STYLE_NOSURVEY',
  },
  'raw': {
    'img_MOVE': 0,
    'img_LINE': 1,
    'img_LABEL': 3,
    'img_XSECT': 4,
    'img_XSECT_END': 5,
    'img_ERROR_INFO': 6,
    'img_BAD': -2,
    'img_STOP': -1,
    'img_FLAG_SURFACE': 1,
    'img_FLAG_DUPLICATE': 2,
    'img_FLAG_SPLAY': 4,
    'img_SFLAG_SURFACE': 1,
    'img_SFLAG_UNDERGROUND': 2,
    'img_SFLAG_ENTRANCE': 4,
    'img_SFLAG_EXPORTED': 8,
    'img_SFLAG_FIXED': 16,
    'img_SFLAG_ANON': 32,
    'img_SFLAG_WALL': 64,
    'img_FFLAG_EXTENDED': 128,
    'img_XFLAG_END': 1,
    'img_STYLE_NORMAL': 0,
    'img_STYLE_DIVING': 1,
    'img_STYLE_CARTESIAN': 2,
    'img_STYLE_CYLPOLAR': 3,
    'img_STYLE_NOSURVEY': 4,
    'img_STYLE_UNKNOWN': -1,
  }
};
