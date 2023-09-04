"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getEs256kPrivateKey = exports.getEddsaPrivateKey = exports.generateES256KKeyPair = exports.generateEdDSAKeyPair = void 0;
const onyx_ssi_sdk_1 = require("@jpmorganchase/onyx-ssi-sdk");
const ed25519 = __importStar(require("@stablelib/ed25519"));
const crypto_1 = require("crypto");
const ethers_1 = require("ethers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const writer_1 = require("./writer");
const KEYS_PATH = "./keys.json";
const generateEdDSAKeyPair = () => {
    const seed = () => (0, crypto_1.randomBytes)(32);
    const key = ed25519.generateKeyPair({
        isAvailable: true,
        randomBytes: seed,
    });
    return {
        algorithm: onyx_ssi_sdk_1.KEY_ALG.EdDSA,
        publicKey: Buffer.from(key.publicKey).toString("hex"),
        privateKey: Buffer.from(key.secretKey).toString("hex"),
    };
};
exports.generateEdDSAKeyPair = generateEdDSAKeyPair;
const generateES256KKeyPair = () => __awaiter(void 0, void 0, void 0, function* () {
    const account = ethers_1.ethers.Wallet.createRandom();
    const { privateKey, compressedPublicKey } = account._signingKey();
    return {
        algorithm: onyx_ssi_sdk_1.KEY_ALG.ES256K,
        publicKey: compressedPublicKey,
        privateKey,
    };
});
exports.generateES256KKeyPair = generateES256KKeyPair;
const getEddsaPrivateKey = (type) => {
    let privateKey;
    if (fs_1.default.existsSync(path_1.default.resolve(KEYS_PATH))) {
        console.log(`\nKeys.json found\n`);
        const keys = require(path_1.default.resolve(KEYS_PATH));
        if (keys[type] && !!keys[type]) {
            console.log(`\nPrivate keys for ${type} found\n`);
            privateKey = keys[type];
        }
        else {
            console.log(`\nPrivate key for ${type} not found\n`);
            console.log(`\nGenerating new private key for ${type}\n`);
            privateKey = (0, exports.generateEdDSAKeyPair)().privateKey;
            keys[type] = privateKey;
            console.log(`\nSaving private key for ${type}\n`);
            (0, writer_1.writeToFile)(path_1.default.resolve(KEYS_PATH), JSON.stringify(keys));
        }
    }
    else {
        console.log(`\nKeys.json not found\n`);
        console.log(`\nGenerating and saving private key for ${type}\n`);
        privateKey = (0, exports.generateEdDSAKeyPair)().privateKey;
        const keys = {};
        keys[type] = privateKey;
        (0, writer_1.writeToFile)(path_1.default.resolve(KEYS_PATH), JSON.stringify(keys));
    }
    return privateKey;
};
exports.getEddsaPrivateKey = getEddsaPrivateKey;
const getEs256kPrivateKey = (type) => {
    let privateKey;
    if (fs_1.default.existsSync(path_1.default.resolve(KEYS_PATH))) {
        console.log(`\nKeys.json found\n`);
        const keys = require(path_1.default.resolve(KEYS_PATH));
        if (keys[type] && !!keys[type]) {
            console.log(`\nPrivate keys for ${type} found\n`);
            privateKey = keys[type];
        }
        else {
            console.log(`\nPrivate key for ${type} not found\n`);
            console.log(`\nGenerating new private key for ${type}\n`);
            (0, exports.generateES256KKeyPair)().then((didWithKeys) => {
                privateKey = didWithKeys.privateKey;
                keys[type] = privateKey;
                console.log(`\nSaving private key for ${type}\n`);
                (0, writer_1.writeToFile)(path_1.default.resolve(KEYS_PATH), JSON.stringify(keys));
            });
        }
    }
    else {
        console.log(`\nKeys.json not found\n`);
        console.log(`\nGenerating and saving private key for ${type}\n`);
        (0, exports.generateES256KKeyPair)().then((didWithKeys) => {
            const keys = {};
            privateKey = didWithKeys.privateKey;
            keys[type] = privateKey;
            (0, writer_1.writeToFile)(path_1.default.resolve(KEYS_PATH), JSON.stringify(keys));
        });
    }
    return privateKey;
};
exports.getEs256kPrivateKey = getEs256kPrivateKey;
//# sourceMappingURL=keygen.js.map