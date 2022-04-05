const express = require("express");
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
      email,
      dni
    } = req.body;
    let nuevoViaje;
    if (fecha && origen && destino) {
      nuevoViaje = await Viaje.create({
        dni,
        fecha,
        hora,
        origen,
        destino,
        asientosAOcupar,
        formaDePago,
        aceptaFumador,
        aceptaMascota,
        aceptaEquipaje,
        usaBarbijo,
        pagoCompartido,
        status: "conductor"
      });
      await nuevoViaje.addUsuario(email);
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
      email,
      dni
    } = req.body;
    let nuevoViaje;
    if (fecha && origen && destino) {
      nuevoViaje = await Viaje.create({
        dni,
        fecha,
        hora,
        origen,
        destino,
        asientosAOcupar,
        formaDePago,
        aceptaFumador,
        aceptaMascota,
        aceptaEquipaje,
        usaBarbijo,
        pagoCompartido,
        status: "pasajero"
      });
      await nuevoViaje.addUsuario(email);
      res.json(nuevoViaje);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/totalviajes", async (req, res, next) => {
  try {
    let totalViajes = await Viaje.findAll({ include: Usuario });
    res.send(totalViajes);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/filtro/:aceptaFumador/:aceptaMascota/:aceptaEquipaje/:usaBarbijo",
  async (req, res, next) => {
    const { aceptaFumador, aceptaMascota, aceptaEquipaje, usaBarbijo } =
      req.params;
    const { asientosAOcupar } = req.query;
    try {
      let viajesTotal;
      if (asientosAOcupar) {
        viajesTotal = await Viaje.findAll({
          where: {
            aceptaFumador: aceptaFumador,
            aceptaMascota: aceptaMascota,
            aceptaEquipaje: aceptaEquipaje,
            usaBarbijo: usaBarbijo,
            asientosAOcupar: asientosAOcupar
          },
          include: Usuario
        });
      } else {
        viajesTotal = await Viaje.findAll({
          where: {
            aceptaFumador: aceptaFumador,
            aceptaMascota: aceptaMascota,
            aceptaEquipaje: aceptaEquipaje,
            usaBarbijo: usaBarbijo
          },
          include: Usuario
        });
      }
      res.send(viajesTotal);
    } catch (err) {
      next(err);
    }
  }
);

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