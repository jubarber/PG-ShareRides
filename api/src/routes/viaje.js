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
      dni,
      nombre
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
      Te agradecemos por crear tu viaje. Esperamos que tengas una buena experiencia. 
      Recorda, que vas a tener la posibilidad de hacer una reseña sobre tu conductore/pasajere.
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
      dni,
      nombre
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
      
    }
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
      Te agradecemos por crear tu viaje. Esperamos que tengas una buena experiencia. 
      Recorda, que vas a tener la posibilidad de hacer una reseña sobre tu conductore/pasajere.
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
      res.json(nuevoViaje);
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

router.get("/searchdestino", async (req, res, next) => {
  const { destino } = req.query;
  console.log(destino);
  try {
    let filtradoDestino;
    if (destino) {
      let viajes = await Viaje.findAll({ include: Usuario });
      filtradoDestino = await viajes.filter((e) => {
        return e.dataValues.destino
          .toLowerCase()
          .includes(destino.toLowerCase());
      });
    }
    console.log(filtradoDestino);
    res.send(filtradoDestino);
  } catch (error) {
    next(error);
  }
});

router.get("/searchorigen", async (req, res, next) => {
  const { origen } = req.query;
  console.log("back", origen);
  try {
    let filtradoOrigen;
    if (origen) {
      let viajes = await Viaje.findAll({ include: Usuario });
      filtradoOrigen = await viajes.filter((e) => {
        return e.dataValues.origen.toLowerCase().includes(origen.toLowerCase());
      });
    }
    console.log(filtradoOrigen);
    res.send(filtradoOrigen);
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
