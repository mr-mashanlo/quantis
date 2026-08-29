import crypto from 'node:crypto';

import jwt from 'jsonwebtoken';

export class TokenService {

  #accessKey = process.env.ACCESS_KEY;
  #refreshKey = process.env.REFRESH_KEY;
  #maxAccessAge = process.env.JWT_ACCESS_TIME;

  generateAccessToken = payload => {
    return jwt.sign( payload, this.#accessKey, { expiresIn: this.#maxAccessAge } );
  };

  verifyAccessToken = token => {
    return jwt.verify( token, this.#accessKey );
  };

  generateRefreshToken = () => {
    return crypto.randomBytes( 64 ).toString( 'hex' );
  };

  hashRefreshToken = token => {
    return crypto.createHmac( 'sha256', this.#refreshKey ).update( token ).digest( 'hex' );
  };

}
