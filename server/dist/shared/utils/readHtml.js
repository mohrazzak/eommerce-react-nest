"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHtml = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const readHtml = (path) => {
    return (0, fs_1.readFileSync)((0, path_1.resolve)(path), 'utf-8');
};
exports.readHtml = readHtml;
//# sourceMappingURL=readHtml.js.map