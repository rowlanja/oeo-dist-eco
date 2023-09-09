var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KeyDIDMethod } from "@jpmorganchase/onyx-ssi-sdk";
import { ISSUER_EDDSA_PRIVATE_KEY } from "./config";
import { privateKeyBufferFromString } from "./conversions";
const createDidKeyFromPrivateKey = () => __awaiter(void 0, void 0, void 0, function* () {
    const didKey = new KeyDIDMethod();
    const issuerDidKey = yield didKey.generateFromPrivateKey(privateKeyBufferFromString(ISSUER_EDDSA_PRIVATE_KEY));
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
    const didKey = new KeyDIDMethod();
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
    ISSUER_EDDSA_PRIVATE_KEY ? createDidKeyFromPrivateKey() : createDidKey();
};
main();
//# sourceMappingURL=create-issuer-did-key.js.map