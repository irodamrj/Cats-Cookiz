# encrypt-cookie
[![npm](https://img.shields.io/npm/v/encrypt-cookie.svg)](https://www.npmjs.com/package/encrypt-cookie)
[![npm](https://img.shields.io/npm/dm/encrypt-cookie.svg)](https://www.npmjs.com/package/encrypt-cookie)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.png?v=101)](https://www.typescriptlang.org/)
### Easy to use cookie encryption middleware for express and socket.io
- **Requires:** [`cookie-parser`](https://www.npmjs.com/package/cookie-parser) middleware for usage with node.js

### Installation
```sh
npm install --save encrypt-cookie
```
```sh
yarn add encrypt-cookie
```


### Features
- Strong encryption AES 256 GCM
- Derive unique encryption key for each cookie from master
- Node.js middleware
- Socket.io middleware

### Node Express middleware
The express middleware automatically encrypts and decrypts the cookies.

```js
import express from 'express';
import cookieParser from 'cookie-parser';
import { encryptCookieNodeMiddleware } from 'encrypt-cookie';

const expressApp = express();
expressApp.use(cookieParser(signatureSecret));
expressApp.use(encryptCookieNodeMiddleware(encryptionSecret));

// Set new cookie as usual
response.cookie(cookieName, cookieValue, cookieOptions);
```

### Socket.io middleware
The middleware for socket.io just parses and decrypts the cookies. 
Since there exist no HTTP response you can not set any headers to submit
new cookie values to the browser. The socket handshake includes the cookie
values that exist when the handshake is created. To include newer cookies,
you need to reset the socket connection. (Any workaround?)
```js
import socketIO from 'socket.io';
import { decryptCookieSocketMiddleware } from 'encrypt-cookie';

this.httpServer = http.createServer(this.expressApp);
this.socketServer = socketIO(this.httpServer); // often defined as `io`
this.socketServer.use(decryptCookieSocketMiddleware(signatureSecret, encryptionSecret));


```
### Set cookie with socket.io
The new cookie value only remains in the current handshake. 
It will not be submitted to the browsers cookie cache. The value will be deleted
when the handshake is recreated.

`cookieOptions` will be mostly ignored, because the socked does not include any meta
information about the cookies. Currently the only noticed value for 
`cookieOptions` is `{sign: true}` to sign the cookie.
```ts
import { setSocketCookie } from 'encrypt-cookie';

const cookieOptions = {sign: true};
setSocketCookie(socket: SocketIO.Socket, signaturePassword: string, cookieName: string, cookieValue: any, cookieOptions: express.CookieOptions): void
```

### Encryption/Decryption methods
You can access the encryption methods to use it anywhere
```ts
import { decryptAesGcm, encryptAesGcm } from 'encrypt-cookie';

type Password = string | Buffer | NodeJS.TypedArray | DataView;

decryptAesGcm(cipherText: string, password: Password): string | undefined
encryptAesGcm(plainText: string | object, password: Password): string | undefined

```
