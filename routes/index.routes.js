import ejemplo from './ejemplo.routes.js';
import { Router } from 'express';
import kdramaR from './KDrama.routes.js';
const indexRoutes = Router();

indexRoutes.use('/ejemplo', ejemplo);
indexRoutes.use('/Kdrama', kdramaR)
//indexRoutes.use('/datospersonales', datospersonales);

export default indexRoutes;
