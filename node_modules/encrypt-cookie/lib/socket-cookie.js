"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_1 = require("cookie");
var cookie_signature_1 = __importDefault(require("cookie-signature"));
var cryptography_1 = require("./cryptography");
/**
 * Set new encrypted and signed cookie via socket connection
 */
function setSocketCookie(socket, signaturePassword, cookieName, cookieValue, cookieOptions) {
    // Encrypt cookie value using password
    cookieValue = cryptography_1.encryptAesGcm(cookieValue, signaturePassword);
    // If cookie should be signed
    if (cookieOptions.signed) {
        cookieValue = 's:' + cookie_signature_1.default.sign(cookieValue, signaturePassword);
    }
    /**
     * Information about maxAge etc. is not included with socket handshake, so we can ignore this
     * to have only the key value pairs.
     * The cookie will only be valid while socket connection, on reconnect, the information
     * from HTTP response/browser cache will be used again.
     */
    var newCookieString = cookie_1.serialize(cookieName, cookieValue);
    // Get old cookies
    var cookieHeader = socket.handshake.headers.cookie;
    var oldCookies = cookie_1.parse(cookieHeader) || {};
    // Remove our cookie from cookies
    if (oldCookies[cookieName]) {
        delete oldCookies[cookieName];
    }
    // Build new cookie header
    var newCookies = [];
    // Add our cookie
    newCookies.push(newCookieString);
    // Add other old cookies
    for (var oldCookie in oldCookies) {
        newCookies.push(cookie_1.serialize(oldCookie, oldCookies[oldCookie]));
    }
    // Replace old cookie header with new one
    socket.handshake.headers.cookie = newCookies.join('; ');
}
exports.setSocketCookie = setSocketCookie;
