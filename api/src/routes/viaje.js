const e = require("express");
const { Router } = require("express");
const router = Router();
const { Viaje, Usuario } = require("../db.js");

router.post("/conductor", async (req, res, next) => {
  try {
    const {
      fecha,
      hora,
      origen,
      destino,
      asientosAOcupar,
      formaDePago,
      pagoCompartido,
      aceptaFumador,
      aceptaMascota,
      usaBarbijo,
      aceptaEquipaje,
      viajeDisponible,
      dni
    } = req.body;
    let nuevoViaje;
    if (fecha && origen && destino) {
      const usuarioConductor = await Usuario.findByPk(dni);
      nuevoViaje = await Viaje.create({
        fecha,
        hora,
        origen,
        destino,
        asientosAOcupar,
        formaDePago,
        pagoCompartido,
        aceptaEquipaje,
        aceptaFumador,
        aceptaMascota,
        usaBarbijo,
        viajeDisponible
      });
      await nuevoViaje.addUsuario(dni);
      usuarioConductor.update({ conductor: true });
      usuarioConductor.save();
      res.json(nuevoViaje);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/pasajero", async (req, res, next) => {
  try {
    const {
      fecha,
      hora,
      origen,
      destino,
      asientosAOcupar,
      formaDePago,
      pagoCompartido,
      aceptaFumador,
      aceptaMascota,
      usaBarbijo,
      aceptaEquipaje,
      viajeDisponible,
      dni,
    } = req.body;
    let nuevoViaje;
    if (fecha && origen && destino) {
      nuevoViaje = await Viaje.create({
        fecha,
        hora,
        origen,
        destino,
        asientosAOcupar,
        formaDePago,
        pagoCompartido,
        aceptaEquipaje,
        aceptaFumador,
        aceptaMascota,
        usaBarbijo,
        viajeDisponible,
      });
      await nuevoViaje.addUsuario(dni);
      res.json(nuevoViaje);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/viajestotal", async (req, res, next) => {
  try {
    let viajesTotal = await Viaje.findAll({ include: Usuario });
    res.send(viajesTotal);
  } catch (err) {
    next(err);
  }
});

router.get("/:viajeId", async (req, res, next) => {
  const { viajeId } = req.params;
  try {
    let viajeEncontrado = await Viaje.findByPk(viajeId, { include: Usuario });
    res.send(viajeEncontrado);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
