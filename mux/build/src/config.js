"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ethrProvider = exports.provider = exports.VP = exports.VP_DIR_PATH = exports.VC_ES256K_PRIVATE_KEY = exports.VC = exports.VC_DIR_PATH = exports.VC_SCHEMA_URL = exports.HOLDER_ES256K_PRIVATE_KEY = exports.HOLDER_EDDSA_PRIVATE_KEY = exports.ISSUER_ES256K_PRIVATE_KEY = exports.ISSUER_EDDSA_PRIVATE_KEY = exports.REGISTRY_CONTRACT_ADDRESS = exports.NETWORK_NAME = exports.CHAIN_ID = exports.NETWORK_RPC_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const keygen_1 = require("./keygen");
dotenv_1.default.config();
const getParam = (name) => {
    const param = process.env[name];
    if (!param) {
        console.error(`\nConfig param '${name}' missing\n`);
        return null;
    }
    return param;
};
//Provider configs
exports.NETWORK_RPC_URL = getParam("NETWORK_RPC_URL");
exports.CHAIN_ID = parseInt(getParam("CHAIN_ID"));
exports.NETWORK_NAME = getParam("NETWORK_NAME");
exports.REGISTRY_CONTRACT_ADDRESS = getParam("REGISTRY_CONTRACT_ADDRESS");
//Keys
exports.ISSUER_EDDSA_PRIVATE_KEY = getParam("ISSUER_EDDSA_PRIVATE_KEY") ||
    (0, keygen_1.getEddsaPrivateKey)("ISSUER_EDDSA_PRIVATE_KEY");
exports.ISSUER_ES256K_PRIVATE_KEY = getParam("ISSUER_ES256K_PRIVATE_KEY") ||
    (0, keygen_1.getEs256kPrivateKey)("ISSUER_ES256K_PRIVATE_KEY");
exports.HOLDER_EDDSA_PRIVATE_KEY = getParam("HOLDER_EDDSA_PRIVATE_KEY") ||
    (0, keygen_1.getEddsaPrivateKey)("HOLDER_EDDSA_PRIVATE_KEY");
exports.HOLDER_ES256K_PRIVATE_KEY = getParam("HOLDER_ES256K_PRIVATE_KEY") ||
    (0, keygen_1.getEs256kPrivateKey)("HOLDER_ES256K_PRIVATE_KEY");
//VC configs
exports.VC_SCHEMA_URL = getParam("VC_SCHEMA_URL");
exports.VC_DIR_PATH = getParam("VC_DIR_PATH") || "./src/verifiable_credentials";
exports.VC = getParam("VC");
exports.VC_ES256K_PRIVATE_KEY = getParam("VC_ES256K_PRIVATE_KEY");
//VP configs
exports.VP_DIR_PATH = getParam("VP_DIR_PATH") || "./src/verifiable_presentation";
exports.VP = getParam("VP");
exports.provider = new ethers_1.ethers.providers.JsonRpcProvider(exports.NETWORK_RPC_URL);
exports.ethrProvider = {
    name: exports.NETWORK_NAME,
    chainId: exports.CHAIN_ID,
    rpcUrl: exports.NETWORK_RPC_URL,
    registry: exports.REGISTRY_CONTRACT_ADDRESS,
    gasSource: "",
};
//# sourceMappingURL=config.js.map