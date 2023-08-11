/**
 *  Cryptography Functions
 *
 *  Forked from AndiDittrich/AesUtil.js
 *  https://gist.github.com/AndiDittrich/4629e7db04819244e843
 */
import { Password } from './types';
/**
 * Encrypt AES 256 GCM
 * @param plainText
 * @param password
 */
export declare function encryptAesGcm(plainText: string | object, password: Password): string | undefined;
/**
 * Decrypt AES 256 GCM
 * @param cipherText
 * @param password
 */
export declare function decryptAesGcm(cipherText: string, password: Password): string | undefined;
