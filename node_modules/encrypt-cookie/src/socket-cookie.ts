import { parse, serialize } from 'cookie';
import SocketIO from 'socket.io';
import express from 'express';
import cookieSignature from 'cookie-signature';
import { encryptAesGcm } from './cryptography';

/**
 * Set new encrypted and signed cookie via socket connection
 */
export function setSocketCookie(
   socket: SocketIO.Socket,
   signaturePassword: string,
   cookieName: string,
   cookieValue: any,
   cookieOptions: express.CookieOptions
): void {
   // Encrypt cookie value using password
   cookieValue = encryptAesGcm(cookieValue, signaturePassword);

   // If cookie should be signed
   if (cookieOptions.signed) {
      cookieValue = 's:' + cookieSignature.sign(cookieValue, signaturePassword);
   }

   /**
    * Information about maxAge etc. is not included with socket handshake, so we can ignore this
    * to have only the key value pairs.
    * The cookie will only be valid while socket connection, on reconnect, the information
    * from HTTP response/browser cache will be used again.
    */
   const newCookieString = serialize(cookieName, cookieValue);

   // Get old cookies
   const cookieHeader = socket.handshake.headers.cookie;
   const oldCookies = parse(cookieHeader) || {};

   // Remove our cookie from cookies
   if (oldCookies[cookieName]) {
      delete oldCookies[cookieName];
   }

   // Build new cookie header
   const newCookies = [];

   // Add our cookie
   newCookies.push(newCookieString);

   // Add other old cookies
   for (const oldCookie in oldCookies) {
      newCookies.push(serialize(oldCookie, oldCookies[oldCookie]));
   }

   // Replace old cookie header with new one
   socket.handshake.headers.cookie = newCookies.join('; ');
}
