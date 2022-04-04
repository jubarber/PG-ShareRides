const { Router } = require("express");
const router = Router();
const { Vehiculo, Usuario } = require("../db.js");

router.post("/", async (req, res, next) => {
  try {
    const { patente, marca, modelo, dni, email } = req.body;
    let nuevoVehiculo;
    if (patente) {
      const usuarioAuto = await Usuario.findByPk(email);
      nuevoVehiculo = await Vehiculo.findOrCreate({
        where: { patente, marca, modelo, dni }
      });
      usuarioAuto.update({ vehiculo: patente });
      usuarioAuto.update({ dni: dni });
      usuarioAuto.save();
    }

    res.json(nuevoVehiculo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
