const { Router } = require("express");
const router = Router();
const { Usuario, Viaje } = require("../db.js");

router.get("/iniciarsesion/:email/:password", async (req, res, next) => {
  try {
    const { email, password } = req.params;
    if (email) {
      var dbUsuario = await Usuario.findOne(
        { where: { email: email } },
        { include: Viaje }
      );
      if (dbUsuario) {
        dbUsuario.password === password
          ? res.send("ok")
          : res.send("contraseña incorrecta");
      } else res.send("usuario no encontrado");
    }
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
    const { email, nombre, apellido, password, vehiculo, dni } = req.body;
    let nuevoUsuario;
    if (vehiculo) {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password, vehiculo, dni} //vehiculo = patente del auto
      });
    } else {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password, dni }
      });
    }
    res.json(nuevoUsuario);
  } catch (err) {
    next(err);
  }
});

router.put("/cambiopassword", async (req, res, next) => {
  const { password, email } = req.body;
  try {
    let usuario = await Usuario.findByPk(email);
    usuario.update({ password: password });
    usuario.save();
    res.send("contraseña cambiada");
  } catch (err) {
    next(err);
  }
});

router.put("/logueado", async (req, res, next) => {
  const { email } = req.body;
  try{
    let usuario = await Usuario.findByPk(email);
    usuario.update({logueado: true});
    usuario.save();
  }catch(err){
    next(err);
  }
});

module.exports = router;
