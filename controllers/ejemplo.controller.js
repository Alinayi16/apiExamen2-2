import Ejemplo from '../models/ejemplo.model.js';
import mongoose from 'mongoose';
import express from 'express';

export const getAllEjemplos = async (req, res) => {
    console.log('obtiene todos los ejemplos');

    try {
        const ejemplos = await Ejemplo.find({}, { _v: 0 });

        if (ejemplos.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron ejemplos'
            });
        }

        return res.status(200).json({
            ejemplos
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los ejemplos'
        });
    }
};

export const getEjemploById = async (req, res) => {
    console.log('EJEMPLO POR ID'); // Mensaje de registro para seguimiento

    const id = req.params.id; // Obtiene el ID del ejemplo desde los parámetros de la solicitud

    try {
        // Valida si el ID es válido utilizando Mongoose
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const ejemplo = await Ejemplo.findById(id);

        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }

        return res.status(200).json({
            ejemplo
        });

    } catch (error) {
        // Captura cualquier error que pueda ocurrir durante la búsqueda
        return res.status(500).json({
            msg: 'Error al obtener el ejemplo'
        });
    }
};

export const postEjemplo = async (req, res) => {
    console.log('POST EJEMPLO'); // Imprime un mensaje en la consola para indicar que se está creando un nuevo ejemplo

    const body = req.body; // Obtiene los datos enviados en el cuerpo de la solicitud HTTP

    const ejemplo = new Ejemplo(body); // Crea una nueva instancia del modelo Ejemplo con los datos recibidos

    try {
        const validationError = ejemplo.validateSync(); // Valida los datos del nuevo ejemplo
        // Si hay errores de validación, validationError contendrá un objeto con los detalles
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(error => error.message);
            return res.status(400).json({   
        
                error: errorMessages
            });
        }
        
        await ejemplo.save();
        return res.status(201).json({
            ejemplo
        });
    } catch (error) {
        // Si ocurre un error durante la validación o al guardar en la base de datos
        return res.status(500).json({
            msg: 'Error al guardar el ejemplo'
        });
    }
};

export const putEjemplo = async (req, res) => {
    const id = req.params.id; // Obtiene el ID del ejemplo a actualizar desde los parámetros de la solicitud
    const body = req.body; // Obtiene los nuevos datos para actualizar el ejemplo desde el cuerpo de la solicitud

    try {
        // Valida si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        // Busca y actualiza el ejemplo con los nuevos datos
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        // Si no se encontró el ejemplo a actualizar, devuelve un error 404
        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }

        return res.status(200).json({
            ejemplo
        });

    } catch (error) {
        // Si ocurre algún error durante la actualización, devuelve un error 500
        return res.status(500).json({
            msg: 'Error al actualizar el ejemplo'
        });
    }
};

export const deleteEjemplo = async (req, res) => {
    console.log('DELETE EJEMPLO'); // Imprime un mensaje en la consola para indicar que se está eliminando un ejemplo

    const id = req.params.id; // Obtiene el ID del ejemplo a eliminar desde los parámetros de la solicitud

    try {
        // Valida si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        // Busca y elimina el ejemplo por su ID
        const ejemplo = await Ejemplo.findByIdAndDelete(id);

        if (!ejemplo) {
            return res.status(404).json({
                msg: 'Ejemplo no encontrado'
            });
        }
        
        return res.status(200).json({
            msg: 'Ejemplo eliminado',
            ejemplo
        });

    } catch (error) {
        // Si ocurre algún error durante la eliminación, devuelve un error 500
        return res.status(500).json({
            msg: 'Error al eliminar el ejemplo'
        });
    }
};