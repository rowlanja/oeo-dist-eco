var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KeyDIDMethod, SchemaManager, createCredentialFromSchema, } from "@jpmorganchase/onyx-ssi-sdk";
import { camelCase } from "lodash";
import path from "path";
import { HOLDER_EDDSA_PRIVATE_KEY, ISSUER_EDDSA_PRIVATE_KEY, VC_DIR_PATH, VC_SCHEMA_URL, } from "./config";
import { privateKeyBufferFromString } from "./conversions";
import { writeToFile } from "./writer";
const createVcWithAdditonalParams = (VC_SCHEMA_URL) => __awaiter(void 0, void 0, void 0, function* () {
    const didKey = new KeyDIDMethod();
    const issuerDidWithKeys = yield didKey.generateFromPrivateKey(privateKeyBufferFromString(ISSUER_EDDSA_PRIVATE_KEY));
    const holderDidWithKeys = yield didKey.generateFromPrivateKey(privateKeyBufferFromString(HOLDER_EDDSA_PRIVATE_KEY));
    const vcDidKey = (yield didKey.create()).did;
    const credentialType = "PROOF_OF_ADDRESS";
    const subjectData = {
        name: "Jessie Doe",
        address: "1234 Mockingbird Lane",
        city: "Anytown",
        state: "Anystate",
        country: "USA",
        zip: "012345",
    };
    //Setting an expiration data parameter for the VC
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(new Date().getFullYear() + 1);
    const expirationDate = oneYearFromNow.toISOString();
    const additionalParams = {
        id: vcDidKey,
        expirationDate: expirationDate,
    };
    //Schema validation
    const proofOfAddressSchema = yield SchemaManager.getSchemaRemote(VC_SCHEMA_URL);
    const validation = yield SchemaManager.validateCredentialSubject(subjectData, proofOfAddressSchema);
    if (validation) {
        console.log(`\nGenerating Verifiable Credential of type ${credentialType}\n`);
        const vc = yield createCredentialFromSchema(VC_SCHEMA_URL, issuerDidWithKeys.did, holderDidWithKeys.did, subjectData, credentialType, additionalParams);
        console.log(JSON.stringify(vc, null, 2));
        writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(credentialType)}.json`), JSON.stringify(vc, null, 2));
    }
    else {
        console.log(validation.errors);
    }
});
const main = () => {
    VC_SCHEMA_URL
        ? createVcWithAdditonalParams(VC_SCHEMA_URL)
        : console.log("Could not find a remote URL for the VC Schema, please review the VC_SCHEMA_URL field in your .env file");
};
main();
//# sourceMappingURL=create-vc-with-additional-params.js.map