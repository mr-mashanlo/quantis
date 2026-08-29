import { prisma } from '../../config/db.js';
import { employeeRepository } from '../employee/index.js';
import { AuthController } from './controller.js';
import { PasswordService } from './libs/password-service.js';
import { TokenService } from './libs/token-service.js';
import { AuthRepository } from './repository.js';
import { AuthService } from './service.js';

const passwordService = new PasswordService();
export const tokenService = new TokenService();
const authRepository = new AuthRepository( prisma );
export const authService = new AuthService( prisma, authRepository, employeeRepository, tokenService, passwordService );
export const authController = new AuthController( authService );
