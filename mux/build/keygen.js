var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { KEY_ALG } from "@jpmorganchase/onyx-ssi-sdk";
import * as ed25519 from "@stablelib/ed25519";
import { randomBytes } from "crypto";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { writeToFile } from "./writer";
const KEYS_PATH = "./keys.json";
export const generateEdDSAKeyPair = () => {
    const seed = () => randomBytes(32);
    const key = ed25519.generateKeyPair({
        isAvailable: true,
        randomBytes: seed,
    });
    return {
        algorithm: KEY_ALG.EdDSA,
        publicKey: Buffer.from(key.publicKey).toString("hex"),
        privateKey: Buffer.from(key.secretKey).toString("hex"),
    };
};
export const generateES256KKeyPair = () => __awaiter(void 0, void 0, void 0, function* () {
    const account = ethers.Wallet.createRandom();
    const { privateKey, compressedPublicKey } = account._signingKey();
    return {
        algorithm: KEY_ALG.ES256K,
        publicKey: compressedPublicKey,
        privateKey,
    };
});
export const getEddsaPrivateKey = (type) => {
    let privateKey;
    if (fs.existsSync(path.resolve(KEYS_PATH))) {
        console.log(`\nKeys.json found\n`);
        const keys = require(path.resolve(KEYS_PATH));
        if (keys[type] && !!keys[type]) {
            console.log(`\nPrivate keys for ${type} found\n`);
            privateKey = keys[type];
        }
        else {
            console.log(`\nPrivate key for ${type} not found\n`);
            console.log(`\nGenerating new private key for ${type}\n`);
            privateKey = generateEdDSAKeyPair().privateKey;
            keys[type] = privateKey;
            console.log(`\nSaving private key for ${type}\n`);
            writeToFile(path.resolve(KEYS_PATH), JSON.stringify(keys));
        }
    }
    else {
        console.log(`\nKeys.json not found\n`);
        console.log(`\nGenerating and saving private key for ${type}\n`);
        privateKey = generateEdDSAKeyPair().privateKey;
        const keys = {};
        keys[type] = privateKey;
        writeToFile(path.resolve(KEYS_PATH), JSON.stringify(keys));
    }
    return privateKey;
};
export const getEs256kPrivateKey = (type) => {
    let privateKey;
    if (fs.existsSync(path.resolve(KEYS_PATH))) {
        console.log(`\nKeys.json found\n`);
        const keys = require(path.resolve(KEYS_PATH));
        if (keys[type] && !!keys[type]) {
            console.log(`\nPrivate keys for ${type} found\n`);
            privateKey = keys[type];
        }
        else {
            console.log(`\nPrivate key for ${type} not found\n`);
            console.log(`\nGenerating new private key for ${type}\n`);
            generateES256KKeyPair().then((didWithKeys) => {
                privateKey = didWithKeys.privateKey;
                keys[type] = privateKey;
                console.log(`\nSaving private key for ${type}\n`);
                writeToFile(path.resolve(KEYS_PATH), JSON.stringify(keys));
            });
        }
    }
    else {
        console.log(`\nKeys.json not found\n`);
        console.log(`\nGenerating and saving private key for ${type}\n`);
        generateES256KKeyPair().then((didWithKeys) => {
            const keys = {};
            privateKey = didWithKeys.privateKey;
            keys[type] = privateKey;
            writeToFile(path.resolve(KEYS_PATH), JSON.stringify(keys));
        });
    }
    return privateKey;
};
//# sourceMappingURL=keygen.js.map