import SocketIO from 'socket.io';
import express from 'express';
/**
 * Set new encrypted and signed cookie via socket connection
 */
export declare function setSocketCookie(socket: SocketIO.Socket, signaturePassword: string, cookieName: string, cookieValue: any, cookieOptions: express.CookieOptions): void;
