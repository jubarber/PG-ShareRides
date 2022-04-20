const { Router } = require("express");
const router = Router();
const { Usuario, Comentarios, Viaje } = require("../db.js");

router.post("/sesionadmin", async (req, res, next) => {
    // console.log(req.body.email)
    if (
      req.body.email === "pgsharerides@gmail.com" &&
      req.body.password === "piedra123"
    ) {
      //res.cookie("admin", "true")
      res.send("Admin inicia sesion")
    } else {
      res.send("Usuario o contraseña incorrecto")
    }
});
  
  router.get("/adminusuarios", async (req, res, next) => {
    let usuarios = await Usuario.findAll();
        res.send(usuarios);
})

  /* router.delete("/sesionadmin", async (req, res, next)=> {
    res.clearCookie("admin")
    res.send("cookie borrada")
  }) */

router.put("/delete/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const usuario = await Usuario.findOne({ where: { email } });
    console.log(usuario.email);
    if (usuario) {
      const eliminado = await Usuario.update(
        { eliminado: true },
        { where: { email: usuario.email } }
      );
      usuario.save();
      res.send("usuario eliminado");
    } else {
      return res.status(404).send("Usuario no encontrado");
    }
    // const sgMail = require("@sendgrid/mail");

    // sgMail.setApiKey(API_KEY);

    // const message = {
    //   to: email,
    //   from: "pgsharerides@gmail.com",

    //   subject: "Información importante!",
    //   html: `
    //   <html>
    //   <head>
    //   <h2>
    //   Hola ${usuario}!
    //   </h2>
    //   </head>
    //   <body>
    //   <h4>
    //   Desde Share Rides consideramos la seguridad y el respeto como pilar. Nuestres usuaries han reportado tu perfil/comentarios en varias oportunidades por lo que no podrás ingresar nuevamente. Si crees que es un error, por favor comunicate con nosotres para ver la solucíon y restituír tu cuenta.
    //   </h4>
    //   <h3>Buenas rutas!</h3>
    //   </body>
    //   </html>
    //   `,
    // };
    // sgMail
    //   .send(message)
    //   .then((r) => console.log("mail enviado"))
    //   .catch((err) => console.log(err.message));
  } catch (error) {
    res.status(400).send("No se pudo eliminar el usuario");
  }
});

router.delete("/deleteviaje/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedViaje = await Viaje.destroy({
      where: { id },
    });
    // const sgMail = require("@sendgrid/mail");

    // sgMail.setApiKey(API_KEY);

    // const message = {
    //   to: email,
    //   from: "pgsharerides@gmail.com",

    //   subject: "Información importante!",
    //   html: `
    //   <html>
    //   <head>
    //   <h2>
    //   Hola ${nombre}!
    //   </h2>
    //   </head>
    //   <body>
    //   <h4>
    //   Tu viaje se ha eliminado. Por favor contáctate con nosotres si concideras ésto un error.
    //   </h4>
    //   <h3>Buenas rutas!</h3>
    //   </body>
    //   </html>
    //   `,
    // };
    // sgMail
    //   .send(message)
    //   .then((r) => console.log("mail enviado"))
    //   .catch((err) => console.log(err.message));
    res.send('Viaje eliminado con éxito');
  } catch (error) {
    res.status(400).send("No se pudo eliminar el viaje");
  }
});

router.delete("/deletecomentario/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComentario = await Comentarios.destroy({
      where: { id },
    });
    // const sgMail = require("@sendgrid/mail");

    // sgMail.setApiKey(API_KEY);

    // const message = {
    //   to: email,
    //   from: "pgsharerides@gmail.com",

    //   subject: "Información importante!",
    //   html: `
    //   <html>
    //   <head>
    //   <h2>
    //   Hola ${nombre}!
    //   </h2>
    //   </head>
    //   <body>
    //   <h4>
    //   Desde Share Rides consideramos la seguridad y el respeto como pilar. Nuestres usuaries han reportado tu comentario y hemos detectado que infringes las normas por lo que ha sido eliminado. Te recordamos que puedes quedar fuera de la plataforma si continúas infringiendo las normas y tu perfil será eliminado.
    //   </h4>
    //   <h3>Buenas rutas!</h3>
    //   </body>
    //   </html>
    //   `,
    // };
    // sgMail
    //   .send(message)
    //   .then((r) => console.log("mail enviado"))
    //   .catch((err) => console.log(err.message));
    res.send('Comentario eliminado con éxito');
  } catch (error) {
    res.status(400).send("No se pudo eliminar el comentario");
  }
});

router.get("/totalviajes", async (req, res, next) => {
  try {
    let totalViajes = await Viaje.findAll({
      include: [
        {
          model: Usuario
        },
        {
          model: Vehiculo
        }
      ]
    });
    res.send(totalViajes);
  } catch (error) {
    next(error);
  }
})
  
  module.exports = router;