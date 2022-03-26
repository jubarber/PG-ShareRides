const { Router } = require("express");
const router = Router();
const { Vehiculo, Usuario } = require("../db.js");

router.post("/", async (req, res, next) => {
  try {
    const { patente, marca, modelo, usuario } = req.body;
    let nuevoVehiculo;
    if (patente) {
      const usuarioAuto = await Usuario.findByPk(usuario);
      nuevoVehiculo = await Vehiculo.findOrCreate({
        where: { patente, marca, modelo, usuario }
      });
      usuarioAuto.update({vehiculo: patente});
      usuarioAuto.save();
    }

    res.json(nuevoVehiculo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
