import { NextFunction, Request, Response } from 'express';
import { decryptAesGcm, encryptAesGcm } from './cryptography';
import { Password } from './types';
import { CookieOptions } from 'express-serve-static-core';
import express from 'express';

/**
 * Middleware function to automatically encrypt and decrypt
 * cookies for HTTP requests on node.js
 */
export function encryptCookieNodeMiddleware(password: Password): express.RequestHandler {
   /**
    * Middleware callback function
    */
   return (request: Request, response: Response, next: NextFunction) => {
      /**
       * Decrypt request cookies
       */
      let cookies = request.cookies || void 0;
      let signedCookies = request.signedCookies || void 0;

      // Iterate cookies and decrypt content
      if (cookies && typeof cookies === 'object') {
         for (const cookie in cookies) {
            cookies[cookie] = decryptAesGcm(cookies[cookie], password) || cookies[cookie];
         }
      }

      // Iterate signedCookies and decrypt content
      if (signedCookies && typeof signedCookies === 'object') {
         for (const cookie in signedCookies) {
            signedCookies[cookie] = decryptAesGcm(signedCookies[cookie], password) || signedCookies[cookie];
         }
      }

      /**
       * Override response.cookie method
       */
      const originalResponseCookieMethod = response.cookie;

      response.cookie = (name: string, value: string, options: CookieOptions = {}, encrypt: boolean = true): Response => {
         if (!encrypt) {
            return originalResponseCookieMethod.call(response, name, value, options);
         } else {
            // Prepare value
            value = typeof value === 'object' ? JSON.stringify(value) : String(value);

            // Encrypt value
            const encryptedValue = encryptAesGcm(value, password);

            // Call original cookie function with encrypted value
            return originalResponseCookieMethod.call(response, name, encryptedValue, options);
         }
      };

      // Continue
      next();
   };
}

/**
 * Test functions from commandline
 * module.export.myFun = function () { return "string from function." };
 * $ node -p "require('./myfile.js').myFun()"
 */
