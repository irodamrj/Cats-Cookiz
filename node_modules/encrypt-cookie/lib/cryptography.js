"use strict";
/**
 *  Cryptography Functions
 *
 *  Forked from AndiDittrich/AesUtil.js
 *  https://gist.github.com/AndiDittrich/4629e7db04819244e843
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
/**
 * Get encryption/decryption algorithm
 */
function getAlgorithm() {
    return 'aes-256-gcm';
}
/**
 * Get encrypted string prefix
 */
function getEncryptedPrefix() {
    return 'enc::';
}
/**
 * Derive 256 bit encryption key from password, using salt and iterations -> 32 bytes
 * @param password
 * @param salt
 * @param iterations
 */
function deriveKeyFromPassword(password, salt, iterations) {
    return crypto_1.default.pbkdf2Sync(password, salt, iterations, 32, 'sha512');
}
/**
 * Encrypt AES 256 GCM
 * @param plainText
 * @param password
 */
function encryptAesGcm(plainText, password) {
    try {
        if (typeof plainText === 'object') {
            plainText = JSON.stringify(plainText);
        }
        else {
            plainText = String(plainText);
        }
        var algorithm = getAlgorithm();
        // Generate random salt -> 64 bytes
        var salt = crypto_1.default.randomBytes(64);
        // Generate random initialization vector -> 16 bytes
        var iv = crypto_1.default.randomBytes(16);
        // Generate random count of iterations between 10.000 - 99.999 -> 5 bytes
        var iterations = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        // Derive encryption key
        var encryptionKey = deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337));
        // Create cipher
        // @ts-ignore: TS expects the wrong createCipher return type here
        var cipher = crypto_1.default.createCipheriv(algorithm, encryptionKey, iv);
        // Update the cipher with data to be encrypted and close cipher
        var encryptedData = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
        // Get authTag from cipher for decryption // 16 bytes
        var authTag = cipher.getAuthTag();
        // Join all data into single string, include requirements for decryption
        var output = Buffer.concat([salt, iv, authTag, Buffer.from(iterations.toString()), encryptedData]).toString('hex');
        return getEncryptedPrefix() + output;
    }
    catch (error) {
        console.error('Encryption failed!');
        console.error(error);
        return void 0;
    }
}
exports.encryptAesGcm = encryptAesGcm;
/**
 * Decrypt AES 256 GCM
 * @param cipherText
 * @param password
 */
function decryptAesGcm(cipherText, password) {
    try {
        var algorithm = getAlgorithm();
        var cipherTextParts = cipherText.split(getEncryptedPrefix());
        // If it's not encrypted by this, reject with undefined
        if (cipherTextParts.length !== 2) {
            // console.warn('Could not determine the beginning of the cipherText. Maybe not encrypted by this method.');
            return void 0;
        }
        else {
            cipherText = cipherTextParts[1];
        }
        var inputData = Buffer.from(cipherText, 'hex');
        // Split cipherText into partials
        var salt = inputData.slice(0, 64);
        var iv = inputData.slice(64, 80);
        var authTag = inputData.slice(80, 96);
        var iterations = parseInt(inputData.slice(96, 101).toString('utf-8'), 10);
        var encryptedData = inputData.slice(101);
        // Derive key
        var decryptionKey = deriveKeyFromPassword(password, salt, Math.floor(iterations * 0.47 + 1337));
        // Create decipher
        // @ts-ignore: TS expects the wrong createDecipher return type here
        var decipher = crypto_1.default.createDecipheriv(algorithm, decryptionKey, iv);
        decipher.setAuthTag(authTag);
        // Decrypt data
        // @ts-ignore: TS expects the wrong createDecipher return type here
        var decrypted = decipher.update(encryptedData, 'binary', 'utf-8') + decipher.final('utf-8');
        try {
            return JSON.parse(decrypted);
        }
        catch (error) {
            return decrypted;
        }
    }
    catch (error) {
        console.error('Decryption failed!');
        console.error(error);
        return void 0;
    }
}
exports.decryptAesGcm = decryptAesGcm;
