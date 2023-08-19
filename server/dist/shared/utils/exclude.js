"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = void 0;
function exclude(model, keys) {
    const clonedModel = Object.assign({}, model);
    for (const key of keys) {
        delete clonedModel[key];
    }
    return clonedModel;
}
exports.exclude = exclude;
//# sourceMappingURL=exclude.js.map