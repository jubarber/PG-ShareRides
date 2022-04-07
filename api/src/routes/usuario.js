const { Router } = require("express");
const router = Router();
const { Usuario, Viaje } = require("../db.js");
const { API_KEY } = process.env;

router.get("/iniciarsesion/:email/:password", async (req, res, next) => {
  try {
    const { email, password } = req.params;
    //console.log("soy email" , email);
    if (email) {
      var dbUsuario = await Usuario.findOne(
        { where: { email: email } },
        { include: Viaje }
      );
      //console.log("soy db usuario", dbUsuario);
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

router.get("/usuarios/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    let usuario = await Usuario.findByPk(email);
<<<<<<< HEAD
    res.send(usuario);
=======
    if (usuario) res.send(usuario);
    else res.send("error");
>>>>>>> develop
  } catch (err) {
    next(err);
  }
});

router.post("/registro", async (req, res, next) => {
  try {
    const { email, nombre, apellido, password } = req.body;
    let nuevoUsuario;
<<<<<<< HEAD
    if (vehiculo) {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password, vehiculo } //vehiculo = patente del auto
      });
    } else {
      nuevoUsuario = await Usuario.findOrCreate({
        where: { email, nombre, apellido, password }
      });
    }
=======
    nuevoUsuario = await Usuario.findOrCreate({
      where: { email, nombre, apellido, password }
    });
>>>>>>> develop
    res.json(nuevoUsuario);

    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(API_KEY);

    const message = {
      to: email,
      from: "pgsharerides@gmail.com",

      subject: "Bienvenide a Share Rides!",
      html: `
      <html>
      <head>
      <h2>
      Hola ${nombre}! 
      </h2>
      </head>
      <body>
      <h4>
      Desde Share Rides queremos darte la bienvenida a nuestra plataforma! Tu registro se ha llevado a cabo con éxito.
      Esperamos que te sientas segure para compartir tu viaje. 
      </h4>
      <h3>Buenas rutas!</h3>
      </body>
      </html>
      `
    };
    sgMail
      .send(message)
      .then((r) => console.log("mail enviado"))
      .catch((err) => console.log(err.message));
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

router.post("/mailnuevapassword", async (req, res, next) => {
  const { nombre, email } = req.body;
  try {
    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(API_KEY);

    const message = {
      to: email,
      from: "pgsharerides@gmail.com",

      subject: "Viaje creado",
      html: `<html>
      <head>
      <h2>
      Hola ${nombre}! 
      </h2>
      </head>
      <body>
      <h4>
      Te informamos que tu contraseña ha sido modificada de manera correcta
      </h4>
      <h3>Buenas rutas!</h3>
      </body>
      </html>
      `
    };
    sgMail
      .send(message)
      .then((r) => console.log("mail enviado"))
      .catch((err) => console.log(err.message));
  } catch (error) {
    next(error);
  }
});

router.put("/modificarperfil", async (req, res, next) => {
  const { email, acercaDeMi, telefono, avatar, dni } = req.body;
  try {
<<<<<<< HEAD
=======
    let usuario = await Usuario.findByPk(email);
    usuario.update({
      acercaDeMi: acercaDeMi,
      telefono: telefono,
      avatar: avatar,
      dni: dni
    });
    usuario.save();
  } catch (err) {
    next(err);
  }
});

router.post("/emailmodificarperfil", async (req, res, next) => {
  const { nombre, email } = req.body;
  try {
    const sgMail = require("@sendgrid/mail");

    sgMail.setApiKey(API_KEY);

    const message = {
      to: email,
      from: "pgsharerides@gmail.com",

      subject: "Viaje creado",
      html: `<html>
      <head>
      <h2>
      Hola ${nombre}! 
      </h2>
      </head>
      <body>
      <h4>
      Te informamos que tu perfil ha sido actualizado de manera correcta
      </h4>
      <h3>Buenas rutas!</h3>
      </body>
      </html>
      `
    };
    sgMail
      .send(message)
      .then((r) => console.log("mail enviado"))
      .catch((err) => console.log(err.message));
  } catch (err) {
    next(err);
  }
});

router.put("/logueado", async (req, res, next) => {
  const { email } = req.body;
  try {
>>>>>>> develop
    let usuario = await Usuario.findByPk(email);
    usuario.update({ logueado: true });
    usuario.save();
    res.send("usuario logueado");
  } catch (err) {
    next(err);
  }
});

router.put("/deslogueado", async (req, res, next) => {
  const { email } = req.body;
  try {
    let usuario = await Usuario.findByPk(email);
    usuario.update({ logueado: false });
    usuario.save();
<<<<<<< HEAD
    res.send("usuario deslogueado")
=======
    res.send("usuario deslogueado");
>>>>>>> develop
  } catch (err) {
    next(err);
  }
});

module.exports = router;
