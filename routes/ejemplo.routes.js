import { Router } from 'express';
import { getEjemploById,
          postEjemplo,
          putEjemplo,
          deleteEjemplo,
     getAllEjemplos } from '../controllers/ejemplo.controller.js';

const ejemplo = Router();

ejemplo.get('/', getAllEjemplos);


ejemplo.get('/:id',getEjemploById );//obtener
    

ejemplo.put('/:id', putEjemplo); //modificar

ejemplo.post('/',postEjemplo);//agregar

ejemplo.delete('/:id',deleteEjemplo);

export default ejemplo;