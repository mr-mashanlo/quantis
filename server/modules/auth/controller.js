export class AuthController {

  #authService;
  #maxAccessAge = Number( process.env.COOKIE_ACCESS_TIME );
  #maxRefreshAge = Number( process.env.COOKIE_REFRESH_TIME );

  constructor( authService ) {
    this.#authService = authService;
  };

  #setCookies( res, accessToken, refreshToken ) {
    res.cookie( 'accessToken', accessToken, { maxAge: this.#maxAccessAge, httpOnly: true, sameSite: 'none', secure: true } );
    res.cookie( 'refreshToken', refreshToken, { maxAge: this.#maxRefreshAge, httpOnly: true, sameSite: 'none', secure: true } );
  };

  async createUser( req, res, next ) {
    try {
      const { id, role } = await this.#authService.createUser( { id: req.params.id, ...req.body } );
      res.json( { id, role } );
    } catch ( error ) {
      next( error );
    }
  };

  async signIn( req, res, next ) {
    try {
      const { id, role,  accessToken, refreshToken } = await this.#authService.signIn( req.body );
      this.#setCookies( res, accessToken, refreshToken );
      res.json( { id, role } );
    } catch ( error ) {
      next( error );
    }
  };

  async signUp( req, res, next ) {
    try {
      const { id, role, accessToken, refreshToken } = await this.#authService.signUp( req.body );
      this.#setCookies( res, accessToken, refreshToken );
      res.json( { id, role } );
    } catch ( error ) {
      next( error );
    }
  };

};
