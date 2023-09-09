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
import { camelCase } from "lodash";
import path from "path";
import { ISSUER_ES256K_PRIVATE_KEY, VC_DIR_PATH, ethrProvider, } from "./config";
import { writeToFile } from "./writer";
function createVc(sk) {
    return __awaiter(this, void 0, void 0, function* () {
        const didEthr = new EthrDIDMethod(ethrProvider);
        const issuerDidWithKeys = yield didEthr.generateFromPrivateKey(ISSUER_ES256K_PRIVATE_KEY);
        const holderDidWithKeys = yield didEthr.generateFromPrivateKey(sk);
        const vcDidwithKey = yield didEthr.create();
        console.log("\n!!!!!! IMPORTANT: SAVE THIS PRIVATE KEY !!!!!!!\n");
        console.log(`\nVC_ES256K_PRIVATE_KEY: ${Buffer.from(vcDidwithKey.keyPair.privateKey).toString("hex")}\n`);
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
        writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(credentialType)}.json`), JSON.stringify(vc, null, 2));
    });
}
;
//# sourceMappingURL=create-vc-did-ethr.js.map