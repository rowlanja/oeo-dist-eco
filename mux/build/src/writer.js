"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const writeToFile = (fileLocationPath, content) => {
    try {
        fs_1.default.writeFileSync(fileLocationPath, content);
        console.log(`\nSaving the document under ${path_1.default.dirname(fileLocationPath)} directory\n`);
    }
    catch (error) {
        console.log("Failed to write file");
        console.error(error);
    }
};
exports.writeToFile = writeToFile;
//# sourceMappingURL=writer.js.map