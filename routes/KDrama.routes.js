import { Router } from "express";
import { getAllKDram, getIDKdrama, putKdramas, postKdrama, deleteKDramas } from "../controllers/Kdrama.controller.js";

const kdramaR = Router()

kdramaR.get('/', getAllKDram)
kdramaR.get('/:id', getIDKdrama)
kdramaR.post('/', postKdrama)
kdramaR.put('/:id', putKdramas)
kdramaR.delete('/:id', deleteKDramas)

export default kdramaR