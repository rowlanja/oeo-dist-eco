"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const onyx_ssi_sdk_1 = require("@jpmorganchase/onyx-ssi-sdk");
const config_1 = require("./config");
const conversions_1 = require("./conversions");
const createDidKeyFromPrivateKey = () => __awaiter(void 0, void 0, void 0, function* () {
    const didKey = new onyx_ssi_sdk_1.KeyDIDMethod();
    const issuerDidKey = yield didKey.generateFromPrivateKey((0, conversions_1.privateKeyBufferFromString)(config_1.ISSUER_EDDSA_PRIVATE_KEY));
    console.log("Restoring from a private key pair");
    console.log("==========================");
    console.log("key pair generated");
    console.log(`Algorithm: ${issuerDidKey.keyPair.algorithm}`);
    console.log(`Public Key: ${Buffer.from(issuerDidKey.keyPair.publicKey).toString("hex")}`);
    console.log("==========================");
    console.log(`Generating did:key`);
    console.log(`Issuer did: ${issuerDidKey.did}`);
});
const createDidKey = () => __awaiter(void 0, void 0, void 0, function* () {
    const didKey = new onyx_ssi_sdk_1.KeyDIDMethod();
    const issuerDidKey = yield didKey.create();
    console.log("Creating a key pair");
    console.log("==========================");
    console.log("key pair generated");
    console.log(`Algorithm: ${issuerDidKey.keyPair.algorithm}`);
    console.log(`Private Key: ${Buffer.from(issuerDidKey.keyPair.privateKey).toString("hex")}`);
    console.log(`Public Key: ${Buffer.from(issuerDidKey.keyPair.publicKey).toString("hex")}`);
    console.log("==========================");
    console.log(`Generating did:key`);
    console.log(`Issuer did: ${issuerDidKey.did}`);
});
const main = () => {
    config_1.ISSUER_EDDSA_PRIVATE_KEY ? createDidKeyFromPrivateKey() : createDidKey();
};
main();
//# sourceMappingURL=create-issuer-did-key.js.map