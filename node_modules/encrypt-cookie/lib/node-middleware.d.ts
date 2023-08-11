import { Password } from './types';
import express from 'express';
/**
 * Middleware function to automatically encrypt and decrypt
 * cookies for HTTP requests on node.js
 */
export declare function encryptCookieNodeMiddleware(password: Password): express.RequestHandler;
/**
 * Test functions from commandline
 * module.export.myFun = function () { return "string from function." };
 * $ node -p "require('./myfile.js').myFun()"
 */
