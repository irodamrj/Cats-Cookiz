"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cryptography_1 = require("./cryptography");
var cookie_1 = __importDefault(require("cookie"));
var cookie_parser_1 = require("cookie-parser");
/**
 * Middleware function to automatically encrypt and decrypt
 * cookies for HTTP requests on node.js
 */
function decryptCookieSocketMiddleware(signatureSecret, encryptionSecret) {
    /**
     * Middleware callback function
     */
    return function (socket, next) {
        var cookieStr = socket.handshake.headers.cookie;
        // If no cookies set
        if (!cookieStr) {
            return next();
        }
        // Parse unsigned cookies
        var cookies = cookie_1.default.parse(cookieStr);
        // Parse signed cookies
        var signedCookies = cookie_parser_1.signedCookies(cookies, signatureSecret);
        // Parse unsigned JSON cookies
        cookies = cookie_parser_1.JSONCookies(cookies);
        // Parse signed JSON Cookies
        signedCookies = cookie_parser_1.JSONCookies(signedCookies);
        // Iterate cookies and decrypt content
        if (cookies && typeof cookies === 'object') {
            for (var cookie_2 in cookies) {
                cookies[cookie_2] = cryptography_1.decryptAesGcm(cookies[cookie_2], encryptionSecret) || cookies[cookie_2];
            }
        }
        // Iterate signedCookies and decrypt content
        if (signedCookies && typeof signedCookies === 'object') {
            for (var cookie_3 in signedCookies) {
                signedCookies[cookie_3] = cryptography_1.decryptAesGcm(signedCookies[cookie_3], encryptionSecret) || signedCookies[cookie_3];
            }
        }
        // Attach decrypted cookies to handshake object
        // @ts-ignore
        socket.handshake.cookies = cookies;
        // @ts-ignore
        socket.handshake.signedCookies = signedCookies;
        // Continue
        next();
    };
}
exports.decryptCookieSocketMiddleware = decryptCookieSocketMiddleware;
