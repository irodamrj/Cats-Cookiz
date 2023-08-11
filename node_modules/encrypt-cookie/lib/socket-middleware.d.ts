import { Password } from './types';
/**
 * Middleware function to automatically encrypt and decrypt
 * cookies for HTTP requests on node.js
 */
export declare function decryptCookieSocketMiddleware(signatureSecret: string, encryptionSecret: Password): any;
