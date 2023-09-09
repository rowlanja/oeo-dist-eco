var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EthrDIDMethod, createCredential } from "@jpmorganchase/onyx-ssi-sdk";
import { HOLDER_ES256K_PRIVATE_KEY, ISSUER_ES256K_PRIVATE_KEY, VC_ES256K_PRIVATE_KEY, ethrProvider, } from "./config";
const didEthr = new EthrDIDMethod(ethrProvider);
const createVc = () => __awaiter(void 0, void 0, void 0, function* () {
    const issuerDidWithKeys = yield didEthr.generateFromPrivateKey(ISSUER_ES256K_PRIVATE_KEY);
    const holderDidWithKeys = yield didEthr.generateFromPrivateKey(HOLDER_ES256K_PRIVATE_KEY);
    const vcDidwithKey = yield didEthr.create();
    console.log("\nVC did private key\n");
    console.log(vcDidwithKey.keyPair.privateKey);
    const vcDidKey = vcDidwithKey.did;
    const credentialType = "PROOF_OF_NAME";
    const subjectData = {
        name: "Jessie Doe",
    };
    //vc id, expirationDate, credentialStatus, credentialSchema, etc
    const additionalParams = {
        id: vcDidKey,
    };
    console.log(`\nGenerating Verifiable Credential of type ${credentialType}\n`);
    const vc = createCredential(issuerDidWithKeys.did, holderDidWithKeys.did, subjectData, [credentialType], additionalParams);
    console.log(JSON.stringify(vc, null, 2));
    return vcDidwithKey;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (VC_ES256K_PRIVATE_KEY) {
        const didWithKeys = yield didEthr.generateFromPrivateKey(VC_ES256K_PRIVATE_KEY);
        console.log(`\nDeactivating ${didWithKeys.did}\n`);
        yield didEthr.deactivate(didWithKeys);
        console.log("Deactivation Successful");
    }
    else {
        console.log("\nVC_ES256K_PRIVATE_KEY not found\n");
        console.log("\nVC_ES256K_PRIVATE_KEY not found\n");
        const vcDidwithKey = yield createVc();
        console.log(`\nDeactivating ${vcDidwithKey.did}\n`);
        yield didEthr.deactivate(vcDidwithKey);
        console.log("Deactivation Successful");
    }
});
main();
//# sourceMappingURL=deactivate-vc.js.map