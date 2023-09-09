"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyBufferFromString = void 0;
const privateKeyBufferFromString = (privateKeyString) => {
    const buffer = Buffer.from(privateKeyString, "hex");
    return new Uint8Array(buffer);
};
exports.privateKeyBufferFromString = privateKeyBufferFromString;
//# sourceMappingURL=conversions.js.map