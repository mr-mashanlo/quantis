import 'dotenv/config';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { slowDown } from 'express-slow-down';

import { errorHandler } from './middlewares/error-handler.js';
import { authRouter } from './modules/auth/router.js';
import { departmentRouter } from './modules/department/router.js';
import { employeeRouter } from './modules/employee/router.js';
import { medicationRouter } from './modules/medication/router.js';
import { patientRouter } from './modules/patient/router.js';
import { transactionRouter } from './modules/transaction/router.js';

const app = express();

const apiLimiter = rateLimit( {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true
} );

const speedLimiter = slowDown( {
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: hits => ( hits - 50 ) * 500
} );

app.use( cors( { credentials: true, origin: process.env.FRONT_URL } ) );
app.use( cookieParser() );
app.use( express.json() );

app.use( apiLimiter );
app.use( speedLimiter );

app.use( '/api', authRouter );
app.use( '/api', employeeRouter );
app.use( '/api', patientRouter );
app.use( '/api', departmentRouter );
app.use( '/api', medicationRouter );
app.use( '/api', transactionRouter );

app.use( errorHandler );

app.listen( process.env.APP_PORT, () => {
  console.log( `Server flying at http://localhost:${process.env.APP_PORT}` );
} );
