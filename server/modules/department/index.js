import { prisma } from '../../config/db.js';
import { DepartmentController } from './controller.js';
import { DepartmentRepository } from './repository.js';
import { DepartmentService } from './service.js';

export const departmentRepository = new DepartmentRepository( prisma );
export const departmentService = new DepartmentService( departmentRepository );
export const departmentController = new DepartmentController( departmentService );
