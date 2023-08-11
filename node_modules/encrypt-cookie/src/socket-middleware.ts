import { NextFunction } from 'express';
import { decryptAesGcm } from './cryptography';
import SocketIO from 'socket.io';
import cookie from 'cookie';
import { JSONCookies, signedCookies as parseSignedCookies } from 'cookie-parser';
import { Password } from './types';

/**
 * Middleware function to automatically encrypt and decrypt
 * cookies for HTTP requests on node.js
 */
export function decryptCookieSocketMiddleware(signatureSecret: string, encryptionSecret: Password): any {
   /**
    * Middleware callback function
    */
   return (socket: SocketIO.Socket, next: NextFunction) => {
      const cookieStr = socket.handshake.headers.cookie;

      // If no cookies set
      if (!cookieStr) {
         return next();
      }

      // Parse unsigned cookies
      let cookies: any = cookie.parse(cookieStr);

      // Parse signed cookies
      let signedCookies: any = parseSignedCookies(cookies, signatureSecret);

      // Parse unsigned JSON cookies
      cookies = JSONCookies(cookies);

      // Parse signed JSON Cookies
      signedCookies = JSONCookies(signedCookies);

      // Iterate cookies and decrypt content
      if (cookies && typeof cookies === 'object') {
         for (const cookie in cookies) {
            cookies[cookie] = decryptAesGcm(cookies[cookie], encryptionSecret) || cookies[cookie];
         }
      }

      // Iterate signedCookies and decrypt content
      if (signedCookies && typeof signedCookies === 'object') {
         for (const cookie in signedCookies) {
            signedCookies[cookie] = decryptAesGcm(signedCookies[cookie], encryptionSecret) || signedCookies[cookie];
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
