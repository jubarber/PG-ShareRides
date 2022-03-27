const { Router } = require("express");
const router = Router();
const {Viaje} = require("../db.js")


router.post("/", async (req, res,next) => {
    try {
        const {fecha, hora, origen, destino, asientosDisponibles,formaDePago,pagoCompartido,aceptaFumador, aceptaMascota,usaBarbijo, aceptaEquipaje, viajeDisponible} = req.body
    let nuevoViaje
     if(fecha&&origen&&destino){
         nuevoViaje = await Viaje.findOrCreate({
             where:{
                 fecha, hora, origen, destino, asientosDisponibles,formaDePago,pagoCompartido,aceptaEquipaje,aceptaFumador,aceptaMascota,usaBarbijo,viajeDisponible
             }
         })
        res.json(nuevoViaje)
    }
 } catch (error) {
        next(error)
    }
})
module.exports = router;