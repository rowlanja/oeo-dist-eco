var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EthrDIDMethod, JWTService, KeyDIDMethod, createCredential, } from "@jpmorganchase/onyx-ssi-sdk";
import { camelCase, includes } from "lodash";
import path from "path";
import { HOLDER_EDDSA_PRIVATE_KEY, ISSUER_EDDSA_PRIVATE_KEY, ISSUER_ES256K_PRIVATE_KEY, VC, VC_DIR_PATH, ethrProvider, } from "./config";
import { privateKeyBufferFromString } from "./conversions";
import { writeToFile } from "./writer";
const didKey = new KeyDIDMethod();
const jwtService = new JWTService();
const issuerDidWithKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield didKey.generateFromPrivateKey(privateKeyBufferFromString(ISSUER_EDDSA_PRIVATE_KEY));
});
const createVc = () => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log(`\nGenerating ${credentialType} Verifiable Credentials\n`);
    return createCredential((yield issuerDidWithKeys()).did, holderDidWithKeys.did, subjectData, [credentialType], additionalParams);
});
const signVc = (issuerDidWithKeys, vc) => __awaiter(void 0, void 0, void 0, function* () {
    return jwtService.signVC(issuerDidWithKeys, vc);
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (VC_DIR_PATH && VC) {
        console.log("\nReading an existing verifiable credential\n");
        const vc = require(path.resolve(VC_DIR_PATH, VC));
        console.log(JSON.stringify(vc, null, 2));
        //verify vc did
        if (includes(vc.id, "ethr")) {
            console.log("VC did method: did:ethr");
            const didEthr = new EthrDIDMethod(ethrProvider);
            const didWithKeys = yield didEthr.generateFromPrivateKey(ISSUER_ES256K_PRIVATE_KEY);
            if (didWithKeys.did === vc.issuer.id) {
                console.log("\nSinging the VC\n");
                const jwt = yield signVc(didWithKeys, vc);
                console.log(jwt);
                writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(vc.type[1])}.jwt`), jwt);
            }
            else {
                console.log("ISSUER_ES256K_PRIVATE_KEY cannot sign this verifiable credentail\n");
            }
        }
        else if (includes(vc.id, "key")) {
            console.log("\nVC did method: did:key\n");
            const didWithKeys = yield didKey.generateFromPrivateKey(privateKeyBufferFromString(ISSUER_EDDSA_PRIVATE_KEY));
            if (didWithKeys.did === vc.issuer.id) {
                console.log("\nSinging the VC\n");
                const jwt = yield signVc(didWithKeys, vc);
                console.log(jwt);
                writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(vc.type[1])}.jwt`), jwt);
            }
            else {
                console.log("\nISSUER_EDDSA_PRIVATE_KEY cannot sign this verifiable credentail\n");
            }
        }
    }
    else {
        const vc = yield createVc();
        console.log(JSON.stringify(vc, null, 2));
        console.log("\nSaving VC JSON\n");
        writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(vc.type[1])}.json`), JSON.stringify(vc, null, 2));
        console.log("\nSinging the VC\n");
        const jwt = yield signVc(yield issuerDidWithKeys(), vc);
        console.log(jwt);
        console.log("\nSaving signed VC JWT\n");
        writeToFile(path.resolve(VC_DIR_PATH, `${camelCase(vc.type[1])}.jwt`), jwt);
    }
});
main();
//# sourceMappingURL=sign-vc.js.map