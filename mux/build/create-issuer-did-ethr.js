var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EthrDIDMethod } from "@jpmorganchase/onyx-ssi-sdk";
import { ISSUER_ES256K_PRIVATE_KEY, ethrProvider } from "./config";
const createDidEthrFromPrivateKey = () => __awaiter(void 0, void 0, void 0, function* () {
    const didEthr = new EthrDIDMethod(ethrProvider);
    const issuerDidKey = yield didEthr.generateFromPrivateKey(ISSUER_ES256K_PRIVATE_KEY);
    console.log("Restoring from a private key pair");
    console.log("==========================");
    console.log("key pair generated");
    console.log(`Algorithm: ${issuerDidKey.keyPair.algorithm}`);
    console.log(`Public Key: ${Buffer.from(issuerDidKey.keyPair.publicKey).toString("hex")}`);
    console.log("==========================");
    console.log(`Generating did:key`);
    console.log(`Issuer did: ${issuerDidKey.did}`);
});
const createDidEthr = () => __awaiter(void 0, void 0, void 0, function* () {
    const didEthr = new EthrDIDMethod(ethrProvider);
    const issuerEthrDid = yield didEthr.create();
    console.log("Creating a key pair");
    console.log("==========================");
    console.log("key pair generated");
    console.log(`Algorithm: ${issuerEthrDid.keyPair.algorithm}`);
    console.log(`Private Key: ${Buffer.from(issuerEthrDid.keyPair.privateKey).toString("hex")}`);
    console.log(`Public Key: ${Buffer.from(issuerEthrDid.keyPair.publicKey).toString("hex")}`);
    console.log("==========================");
    console.log(`Generating did:key`);
    console.log(`Issuer did: ${issuerEthrDid.did}`);
});
const injectPkCreateDidEthr = (pk, sk) => __awaiter(void 0, void 0, void 0, function* () {
    const didEthr = new EthrDIDMethod(ethrProvider);
    const issuerEthrDid = yield didEthr.create();
    console.log("Creating a key pair");
    console.log("==========================");
    console.log("key pair generated");
    console.log(`Algorithm: ${issuerEthrDid.keyPair.algorithm}`);
    console.log(`Private Key: ${Buffer.from(issuerEthrDid.keyPair.privateKey).toString("hex")}`);
    console.log(`Public Key: ${Buffer.from(issuerEthrDid.keyPair.publicKey).toString("hex")}`);
    console.log("==========================");
    console.log(`Generating did:key`);
    console.log(`Issuer did: ${issuerEthrDid.did}`);
});
// const main = () => {
//   ISSUER_ES256K_PRIVATE_KEY ? createDidEthrFromPrivateKey() : createDidEthr();
// };
// main();
//# sourceMappingURL=create-issuer-did-ethr.js.map