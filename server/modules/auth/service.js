import { BadRequest } from '../../errors/bad-request.js';
import { Unauthorized } from '../../errors/unauthorized.js';

export class AuthService {

  #prisma;
  #authRepository;
  #employeeRepository;
  #tokenService;
  #passwordService;
  #maxRefreshAge = Number( process.env.COOKIE_REFRESH_TIME );

  constructor( prisma, authRepository, employeeRepository, tokenService, passwordService ) {
    this.#prisma = prisma;
    this.#authRepository = authRepository;
    this.#employeeRepository = employeeRepository;
    this.#tokenService = tokenService;
    this.#passwordService = passwordService;
  }

  #generateTokens( payload ) {
    const accessToken = this.#tokenService.generateAccessToken( payload );
    const refreshToken = this.#tokenService.generateRefreshToken();
    const hashedRefreshToken = this.#tokenService.hashRefreshToken( refreshToken );

    return { accessToken, refreshToken, hashedRefreshToken };
  }

  async createUser( { name, role, email, password } ) {
    return await this.#prisma.$transaction( async tx => {
      const candidate = await this.#authRepository.findByEmail( email, tx );
      if ( candidate ) throw new BadRequest( [ { name: 'email', message: 'Email is already exist' } ] );

      const hash = this.#passwordService.hash( password );
      const user = await this.#authRepository.create( { email, password: hash }, tx );
      const employee = await this.#employeeRepository.create( { userId: user.id, name, role }, tx );

      return { id: user.id, email: user.email, role: employee.role, employeeId: employee.id };
    } );
  };

  async refreshToken( token ) {
    return await this.#prisma.$transaction( async tx => {
      const hashedRefreshToken = this.#tokenService.hashRefreshToken( token );
      const user = await this.#authRepository.findByToken( hashedRefreshToken, tx );

      if ( !user ) throw new Unauthorized( [ { name: 'token', message: 'Invalid or reused token' } ] );
      if ( Number( user.expiredAt ) < Date.now() ) throw new Unauthorized( [ { name: 'token', message: 'Token has expired' } ] );

      const employee = await this.#employeeRepository.findByUserId( user.id, tx );
      const { accessToken: newAccessToken, refreshToken: newRefreshToken, hashedRefreshToken: newHashedRefreshToken } = this.#generateTokens( { id: user.id, email: user.email, role: employee.role, employeeId: employee.id } );
      const updatedUser = await this.#authRepository.update( { id: user.id, refreshToken: hashedRefreshToken }, { refreshToken: newHashedRefreshToken, expiredAt: Date.now() + this.#maxRefreshAge }, tx );

      if ( !updatedUser ) throw new Unauthorized( [ { message: 'Token already rotated' } ] );
      return { id: user.id, email: user.email, role: employee.role, employeeId: employee.id, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } );
  };

  async signIn( { email, password } ) {
    return await this.#prisma.$transaction( async tx => {
      const user = await this.#authRepository.findByEmail( email, tx );
      if ( !user ) throw new BadRequest( [ { name: 'email', message: 'Email is not exist' } ] );

      const isValid = this.#passwordService.compare( password, user.password );
      if ( !isValid ) throw new BadRequest( [ { name: 'password', message: 'Incorrect password' } ] );

      const employee = await this.#employeeRepository.findByUserId( user.id, tx );
      const { accessToken, refreshToken, hashedRefreshToken } = this.#generateTokens( { id: user.id, email: user.email, role: employee.role, employeeId: employee.id } );
      await this.#authRepository.update( { id: user.id }, { refreshToken: hashedRefreshToken, expiredAt: Date.now() + this.#maxRefreshAge }, tx );

      return { id: user.id, email: user.email, role: employee.role, employeeId: employee.id, accessToken, refreshToken };
    } );
  };

  async signUp ( { name, email, password } ) {
    return await this.#prisma.$transaction( async tx => {
      const candidate = await this.#authRepository.findByEmail( email, tx );
      if ( candidate ) throw new BadRequest( [ { name: 'email', message: 'Email is already exist' } ] );

      const hash = this.#passwordService.hash( password );
      const user = await this.#authRepository.create( { email, password: hash }, tx );
      const employee = await this.#employeeRepository.create( { userId: user.id, name }, tx );

      const { accessToken, refreshToken, hashedRefreshToken } = this.#generateTokens( { id: user.id, email: user.email, role: employee.role, employeeId: employee.id } );
      await this.#authRepository.update( { id: user.id }, { refreshToken: hashedRefreshToken, expiredAt: Date.now() + this.#maxRefreshAge }, tx );

      return { id: user.id, email: user.email, role: employee.role, employeeId: employee.id, accessToken, refreshToken };
    } );
  };

}
