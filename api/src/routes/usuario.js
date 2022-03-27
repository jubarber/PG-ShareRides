const { Router } = require("express");
const router = Router();
const { Usuario, Viaje } = require("../db.js");

router.get("/", async (req, res, next) => {
  try {
    const { dni, password } = req.body;
    if (dni) {
      var dbUsuario = await Usuario.findOne(
        { where: { dni: dni } },
        { include: Viaje }
      );
      if (dbUsuario) {
        dbUsuario.password === password
          ? res.send(dbUsuario)
          : res.send("contraseña incorrecta");
      } else {
        res.send('usuario no encontrado')
      }
    } //aca termina el if dni
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { dni, nombre, apellido, password, vehiculo } = req.body;
    let nuevoUsuario;
    if (vehiculo) {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { dni: dni, nombre, apellido, password, vehiculo } //vehiculo = patente del auto
      });
    } else {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { dni: dni, nombre, apellido, password }
      });
    }
    res.json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
});




module.exports = router;
