import { prisma } from '../../config/db.js';
import { EmployeeController } from './controller.js';
import { EmployeeRepository } from './repository.js';
import { EmployeeService } from './service.js';

export const employeeRepository = new EmployeeRepository( prisma );
export const employeeService = new EmployeeService( employeeRepository );
export const employeeController = new EmployeeController( employeeService );
