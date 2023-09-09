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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const onyx_ssi_sdk_1 = require("@jpmorganchase/onyx-ssi-sdk");
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const conversions_1 = require("./conversions");
const writer_1 = require("./writer");
const didKey = new onyx_ssi_sdk_1.KeyDIDMethod();
const jwtService = new onyx_ssi_sdk_1.JWTService();
const issuerDidWithKeys = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield didKey.generateFromPrivateKey((0, conversions_1.privateKeyBufferFromString)(config_1.ISSUER_EDDSA_PRIVATE_KEY));
});
const createVc = () => __awaiter(void 0, void 0, void 0, function* () {
    const holderDidWithKeys = yield didKey.generateFromPrivateKey((0, conversions_1.privateKeyBufferFromString)(config_1.HOLDER_EDDSA_PRIVATE_KEY));
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
    return (0, onyx_ssi_sdk_1.createCredential)((yield issuerDidWithKeys()).did, holderDidWithKeys.did, subjectData, [credentialType], additionalParams);
});
const signVc = (issuerDidWithKeys, vc) => __awaiter(void 0, void 0, void 0, function* () {
    return jwtService.signVC(issuerDidWithKeys, vc);
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (config_1.VC_DIR_PATH && config_1.VC) {
        console.log("\nReading an existing verifiable credential\n");
        const vc = require(path_1.default.resolve(config_1.VC_DIR_PATH, config_1.VC));
        console.log(JSON.stringify(vc, null, 2));
        //verify vc did
        if ((0, lodash_1.includes)(vc.id, "ethr")) {
            console.log("VC did method: did:ethr");
            const didEthr = new onyx_ssi_sdk_1.EthrDIDMethod(config_1.ethrProvider);
            const didWithKeys = yield didEthr.generateFromPrivateKey(config_1.ISSUER_ES256K_PRIVATE_KEY);
            if (didWithKeys.did === vc.issuer.id) {
                console.log("\nSinging the VC\n");
                const jwt = yield signVc(didWithKeys, vc);
                console.log(jwt);
                (0, writer_1.writeToFile)(path_1.default.resolve(config_1.VC_DIR_PATH, `${(0, lodash_1.camelCase)(vc.type[1])}.jwt`), jwt);
            }
            else {
                console.log("ISSUER_ES256K_PRIVATE_KEY cannot sign this verifiable credentail\n");
            }
        }
        else if ((0, lodash_1.includes)(vc.id, "key")) {
            console.log("\nVC did method: did:key\n");
            const didWithKeys = yield didKey.generateFromPrivateKey((0, conversions_1.privateKeyBufferFromString)(config_1.ISSUER_EDDSA_PRIVATE_KEY));
            if (didWithKeys.did === vc.issuer.id) {
                console.log("\nSinging the VC\n");
                const jwt = yield signVc(didWithKeys, vc);
                console.log(jwt);
                (0, writer_1.writeToFile)(path_1.default.resolve(config_1.VC_DIR_PATH, `${(0, lodash_1.camelCase)(vc.type[1])}.jwt`), jwt);
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
        (0, writer_1.writeToFile)(path_1.default.resolve(config_1.VC_DIR_PATH, `${(0, lodash_1.camelCase)(vc.type[1])}.json`), JSON.stringify(vc, null, 2));
        console.log("\nSinging the VC\n");
        const jwt = yield signVc(yield issuerDidWithKeys(), vc);
        console.log(jwt);
        console.log("\nSaving signed VC JWT\n");
        (0, writer_1.writeToFile)(path_1.default.resolve(config_1.VC_DIR_PATH, `${(0, lodash_1.camelCase)(vc.type[1])}.jwt`), jwt);
    }
});
main();
//# sourceMappingURL=sign-vc.js.map