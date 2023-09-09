export const privateKeyBufferFromString = (privateKeyString) => {
    const buffer = Buffer.from(privateKeyString, "hex");
    return new Uint8Array(buffer);
};
//# sourceMappingURL=conversions.js.map