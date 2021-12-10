#include <emscripten.h>

#include "img.h"

void EMSCRIPTEN_KEEPALIVE jsImgOpen(img **ppStruct, char *filename) {
  img *pStruct = img_open(filename);
  *ppStruct = pStruct; 
}

void EMSCRIPTEN_KEEPALIVE jsImgReadItem(img **ppStruct, img *pStruct, int *code) {
  *code = img_read_item(pStruct, &pStruct->mv);
  *ppStruct = pStruct;
}

/* getters */
void EMSCRIPTEN_KEEPALIVE getLabel(img *pStruct, char **label) {
  *label = pStruct->label;
}

void EMSCRIPTEN_KEEPALIVE getFlags(img *pStruct, int *flags) {
  *flags = pStruct->flags;
}

void EMSCRIPTEN_KEEPALIVE getTitle(img *pStruct, char **title) {
  *title = pStruct->title;
}

void EMSCRIPTEN_KEEPALIVE getCs(img *pStruct, char **cs) {
  *cs = pStruct->cs;
}

void EMSCRIPTEN_KEEPALIVE getDatestamp(img *pStruct, char **datestamp) {
  *datestamp = pStruct->datestamp;
}

void EMSCRIPTEN_KEEPALIVE getL(img *pStruct, double *l) {
  *l = pStruct->l;
}

void EMSCRIPTEN_KEEPALIVE getR(img *pStruct, double *r) {
  *r = pStruct->r;
}

void EMSCRIPTEN_KEEPALIVE getU(img *pStruct, double *u) {
  *u = pStruct->u;
}

void EMSCRIPTEN_KEEPALIVE getD(img *pStruct, double *d) {
  *d = pStruct->d;
}

void EMSCRIPTEN_KEEPALIVE getMvx(img *pStruct, double *mvx) {
  *mvx = pStruct->mv.x;
}

void EMSCRIPTEN_KEEPALIVE getMvy(img *pStruct, double *mvy) {
  *mvy = pStruct->mv.y;
}

void EMSCRIPTEN_KEEPALIVE getMvz(img *pStruct, double *mvz) {
  *mvz = pStruct->mv.z;
}
