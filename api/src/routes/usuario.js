const { Router } = require("express");
const router = Router();
const { Usuario, Viaje } = require("../db.js");

router.get("/iniciarsesion", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email) {
      var dbUsuario = await Usuario.findOne(
        { where: { email: email } },
        { include: Viaje }
      );
      if (dbUsuario) {
        dbUsuario.password === password
          ? res.send(dbUsuario)
          : res.send("contraseña incorrecta");
      } else {
        res.send("usuario no encontrado");
      }
    } //aca termina el if dni
  } catch (err) {
    next(err);
  }
});

router.get("/usuarios", async (req, res, next) => {
  try {
    let usuarios = await Usuario.findAll();
    res.send(usuarios);
  } catch (err) {
    next(err);
  }
});

router.post("/registro", async (req, res, next) => {
  try {
    const { email, nombre, apellido, password, vehiculo } = req.body;
    let nuevoUsuario;
    if (vehiculo) {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password, vehiculo } //vehiculo = patente del auto
      });
    } else {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password }
      });
    }
    res.json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
});

router.put("/cambiopassword", async (req, res, next) => {
  const { password, dni } = req.body;
  try {
    let usuario = await Usuario.findByPk(dni);
    usuario.update({ password: password });
    usuario.save();
    res.send("contraseña cambiada");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
