import { Unauthorized } from '../errors/unauthorized.js';
import { authService, tokenService } from '../modules/auth/index.js';

const maxAccessAge = Number( process.env.COOKIE_ACCESS_TIME );
const maxRefreshAge = Number( process.env.COOKIE_REFRESH_TIME );

const setCookies = ( res, accessToken, refreshToken ) => {
  res.cookie( 'accessToken', accessToken, { maxAge: maxAccessAge, httpOnly: true, sameSite: 'none', secure: true } );
  res.cookie( 'refreshToken', refreshToken, { maxAge: maxRefreshAge, httpOnly: true, sameSite: 'none', secure: true } );
};

export const isAuth = async ( req, res, next ) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    if ( !accessToken && refreshToken ) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken, ...user } = await authService.refreshToken( req.cookies.refreshToken );
      setCookies( res, newAccessToken, newRefreshToken );
      req.user = user;
      return next();
    }

    const user = tokenService.verifyAccessToken( accessToken );
    req.user = user;
    next();
  } catch {
    res.clearCookie( 'accessToken' );
    res.clearCookie( 'refreshToken' );
    next( new Unauthorized( [ { name: 'token', message: 'Token not provided' } ] ) );
  }
};
