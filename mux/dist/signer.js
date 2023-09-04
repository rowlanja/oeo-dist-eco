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
const createVc = () => __awaiter(void 0, void 0, void 0, function* () {
    const didKey = new onyx_ssi_sdk_1.KeyDIDMethod();
    const issuerDidWithKeys = yield didKey.generateFromPrivateKey((0, conversions_1.privateKeyBufferFromString)(config_1.ISSUER_EDDSA_PRIVATE_KEY));
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
    console.log(`\nGenerating a signed verifiable Credential of type ${credentialType}\n`);
    const signedVc = yield (0, onyx_ssi_sdk_1.createAndSignCredentialJWT)(issuerDidWithKeys, holderDidWithKeys.did, subjectData, [credentialType], additionalParams);
    console.log(signedVc);
    console.log("\nSaving signed VC JWT\n");
    (0, writer_1.writeToFile)(path_1.default.resolve(config_1.VC_DIR_PATH, `${(0, lodash_1.camelCase)(credentialType)}.jwt`), signedVc);
});
createVc();
//# sourceMappingURL=signer.js.map