const { Router } = require("express");
const router = Router();
const { Viaje, Usuario } = require("../db.js");

router.post("/", async (req, res, next) => {
  try {
    const {
      fecha,
      hora,
      origen,
      destino,
      asientosDisponibles,
      formaDePago,
      pagoCompartido,
      aceptaFumador,
      aceptaMascota,
      usaBarbijo,
      aceptaEquipaje,
      viajeDisponible,
      dni
    } = req.body;

    if (fecha && origen && destino) {
      const usuarioConductor = await Usuario.findByPk(dni);
      var nuevoViaje = await Viaje.create({
        fecha,
        hora,
        origen,
        destino,
        asientosDisponibles,
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

router.get("/", async (req, res, next) => {
  try {
    let viajesTotal = await Viaje.findAll({ include: Usuario });
    res.send(viajesTotal);
  } catch (err) {
    next(err);
  }
});

router.get("/:viajeId", async (req, re, next) => {
  const { viajeId } = req.params;
  try {
    let viajeEncontrado = await Viaje.findByPk(viajeId, { include: Usuario });
    re.send(viajeEncontrado);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
