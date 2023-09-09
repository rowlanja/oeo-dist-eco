import { KeyDIDMethod, createAndSignCredentialJWT } from "@jpmorganchase/onyx-ssi-sdk";
import { camelCase } from "lodash";
import path from "path";
import {
  ISSUER_EDDSA_PRIVATE_KEY,
  VC_DIR_PATH,
} from "./config";
import { privateKeyBufferFromString } from "./conversions";
import { writeToFile } from "./writer";

export async function createVc(sk): Promise<string> {
  console.log("using sk ", sk, " with : ", ISSUER_EDDSA_PRIVATE_KEY)
  const didKey = new KeyDIDMethod();

  const holderDidWithKeys = await didKey.generateFromPrivateKey(
    privateKeyBufferFromString(sk)
  );

  const issuerDidWithKeys = await didKey.generateFromPrivateKey(
    privateKeyBufferFromString(ISSUER_EDDSA_PRIVATE_KEY)
  );

  const vcDidKey = (await didKey.create()).did;

  const credentialType = "PROOF_OF_NAME";

  const subjectData = {
    name: "Jessie Doe",
  };

  //vc id, expirationDate, credentialStatus, credentialSchema, etc
  const additionalParams = {
    id: vcDidKey,
  };

  console.log(
    `\nGenerating a signed verifiable Credential of type ${credentialType}\n`
  );

  const signedVc = await createAndSignCredentialJWT(
    issuerDidWithKeys,
    holderDidWithKeys.did,
    subjectData,
    [credentialType],
    additionalParams
  );

  console.log(signedVc);

  console.log("\nSaving signed VC JWT\n");
  return signedVc
  // writeToFile(
  //   path.resolve(VC_DIR_PATH, `${camelCase(credentialType)}.jwt`),
  //   signedVc
  // );
};