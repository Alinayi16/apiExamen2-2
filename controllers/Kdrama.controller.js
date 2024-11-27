import mongoose from "mongoose";
import KDrama from "../models/Kdrama.models.js";

export const getAllKDram = async(req, res) => {
    console.log('Mostrar todos los Kdramas')
    try {
        const kdrama = await KDrama.find({},{__V:0})
        if(kdrama.length === 0){
            return res.status(404).json({
                msg: 'No se encontraron Kdramas'
            });
        }

        return res.status(200).json({
            kdrama
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al mostrar los Kdramas'
        });
    }
}

export const getIDKdrama = async(req, res) =>{
    console.log('Mosatrar el Kdrama por id')
    const id = req.params.id
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const kdram = await KDrama.findById(id)
        if(!kdram){
            return res.status(404).json({
                msg: 'Kdrama no encontrado'
            });
        }

        return res.status(200).json({
            kdram
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los Kdramas'
        });
    }
}

export const postKdrama = async(req, res) =>{
    console.log('Agregando Kdramas')
    const body = req.body
    const kdrama = new KDrama(body)

    try {
        const validacion = kdrama.validateSync()
        if(validacion){
            const mensajesError = Object.values(validacion.errors).map(err => err.message)
            return res.status(404).json({
                mensajesError
            })
        }
        await kdrama.save()
        return res.status(200).json({
            kdrama
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los Kdramas'
        });
    }
}

export const putKdramas = async(req, res) =>{
    console.log('actualizando Kdramas')
    const id = req.params.id
    const body = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const kdrama = await KDrama.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        if(!kdrama){
            return res.status(404).json({
                msg: 'Kdrama no encontrado'
            });
        }

        return res.status(200).json({
            msg: 'KDrama Actualizado',
            kdrama
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los Kdramas'
        });
    }
}

export const deleteKDramas = async(req, res) => {
    console.log('Eliminando Kdrama')
    const id = req.params.id
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }

        const kdrama = await KDrama.findByIdAndDelete(id)

        if(!KDrama){
            return res.status(404).json({
                msg: 'Kdrama no encontrado'
            });
        }

        return res.status(200).json({
            msg: 'KDrama eliminado'
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener los Kdramas'
        });
    }
}
