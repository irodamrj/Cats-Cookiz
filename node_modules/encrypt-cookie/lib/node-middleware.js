"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cryptography_1 = require("./cryptography");
/**
 * Middleware function to automatically encrypt and decrypt
 * cookies for HTTP requests on node.js
 */
function encryptCookieNodeMiddleware(password) {
    /**
     * Middleware callback function
     */
    return function (request, response, next) {
        /**
         * Decrypt request cookies
         */
        var cookies = request.cookies || void 0;
        var signedCookies = request.signedCookies || void 0;
        // Iterate cookies and decrypt content
        if (cookies && typeof cookies === 'object') {
            for (var cookie in cookies) {
                cookies[cookie] = cryptography_1.decryptAesGcm(cookies[cookie], password) || cookies[cookie];
            }
        }
        // Iterate signedCookies and decrypt content
        if (signedCookies && typeof signedCookies === 'object') {
            for (var cookie in signedCookies) {
                signedCookies[cookie] = cryptography_1.decryptAesGcm(signedCookies[cookie], password) || signedCookies[cookie];
            }
        }
        /**
         * Override response.cookie method
         */
        var originalResponseCookieMethod = response.cookie;
        response.cookie = function (name, value, options, encrypt) {
            if (options === void 0) { options = {}; }
            if (encrypt === void 0) { encrypt = true; }
            if (!encrypt) {
                return originalResponseCookieMethod.call(response, name, value, options);
            }
            else {
                // Prepare value
                value = typeof value === 'object' ? JSON.stringify(value) : String(value);
                // Encrypt value
                var encryptedValue = cryptography_1.encryptAesGcm(value, password);
                // Call original cookie function with encrypted value
                return originalResponseCookieMethod.call(response, name, encryptedValue, options);
            }
        };
        // Continue
        next();
    };
}
exports.encryptCookieNodeMiddleware = encryptCookieNodeMiddleware;
/**
 * Test functions from commandline
 * module.export.myFun = function () { return "string from function." };
 * $ node -p "require('./myfile.js').myFun()"
 */
