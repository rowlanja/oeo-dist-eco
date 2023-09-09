var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KeyDIDMethod, createAndSignCredentialJWT } from "@jpmorganchase/onyx-ssi-sdk";
import { camelCase } from "lodash";
import path from "path";
import { HOLDER_EDDSA_PRIVATE_KEY, ISSUER_EDDSA_PRIVATE_KEY, VC_DIR_PATH, } from "./config";
import { privateKeyBufferFromString } from "./conversions";
import { writeToFile } from "./writer";
const createVc = () => __awaiter(void 0, void 0, void 0, function* () {
    const didKey = new KeyDIDMethod();
    const issuerDidWithKeys = yield didKey.generateFromPrivateKey(privateKeyBufferFromString(ISSUER_EDDSA_PRIVATE_KEY));
    const holderDidWithKeys = yield didKey.generateFromPrivateKey(privateKeyBufferFromString(HOLDER_EDDSA_PRIVATE_KEY));
    const vcDidKey = (yield didKey.create()).did;
    const credentialType = "PROOF_OF_NAME";
    const subjectData = {
        name: "Jessie Doe",
    };
    //vc id, expirationDate, credentialStatus, credentialSchema, etc
    const additionalParams = {
        id: vcDidKey,
    };
    console.log(`\nGenerating a signed verifiable Credential of type ${credentialType}\n`);
    const signedVc = yield createAndSignCredentialJWT(issuerDidWithKeys, holderDidWithKeys.did, subjectData, [credentialType], additionalParams);
    console.log(signedVc);
    console.log("\nSaving signed VC JWT\n");
    writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(credentialType)}.jwt`), signedVc);
});
createVc();
//# sourceMappingURL=create-and-sign-vc.js.map