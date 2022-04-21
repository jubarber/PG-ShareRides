const express = require("express");
const { Router } = require("express");
const router = Router();
const { Viaje, Usuario, Vehiculo } = require("../db.js");

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
      dni,
      detalles,
      email,
      patente,
      telefono
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
        detalles,
        vehiculoPatente: patente,
        status: "conductor",
        telefono
      });
      await nuevoViaje.addUsuario(email);
      res.json(nuevoViaje);
    }
    // const sgMail = require("@sendgrid/mail");

    // sgMail.setApiKey(API_KEY);

    // const message = {
    //   to: email,
    //   from: "pgsharerides@gmail.com",

    //   subject: "Viaje creado",
    //   html: `<html>
    //   <head>
    //   <h2>
    //   Hola ${nombre}!
    //   </h2>
    //   </head>
    //   <body>
    //   <h4>
    //   Te agradecemos por crear tu viaje. Esperamos que tengas una buena experiencia.
    //   Recorda, que vas a tener la posibilidad de hacer una reseña sobre tu conductore/pasajere.
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
      detalles,
      nombre,
      telefono
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
        detalles,
        status: "pasajero",
        telefono
      });
      await nuevoViaje.addUsuario(email);
    }
    // const sgMail = require("@sendgrid/mail");

    // sgMail.setApiKey(API_KEY);

    // const message = {
    //   to: email,
    //   from: "pgsharerides@gmail.com",

    //   subject: "Viaje creado",
    //   html: `<html>
    //   <head>
    //   <h2>
    //   Hola ${nombre}!
    //   </h2>
    //   </head>
    //   <body>
    //   <h4>
    //   Te agradecemos por crear tu viaje. Esperamos que tengas una buena experiencia.
    //   Recorda, que vas a tener la posibilidad de hacer una reseña sobre tu conductore/pasajere.
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
    res.json(nuevoViaje);
  } catch (error) {
    next(error);
  }
});
router.get("/totalviajes/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    let totalViajes = await Viaje.findAll({
      include: [
        {
          model: Usuario,
          where: {
            email
          }
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
});
router.get(
  "/filtro/:aceptaFumador/:aceptaMascota/:aceptaEquipaje/:usaBarbijo",
  async (req, res, next) => {
    const {
      aceptaFumador,
      aceptaMascota,
      aceptaEquipaje,
      usaBarbijo
    } = req.params;
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
  // console.log(destino);
  try {
    let filtradoDestino;
    if (destino) {
      let viajes = await Viaje.findAll({
        include: [
          {
            model: Usuario
          },
          {
            model: Vehiculo
          }
        ]
      });
      filtradoDestino = await viajes.filter(e => {
        return e.dataValues.destino
          .toLowerCase()
          .includes(destino.toLowerCase());
      });
    }

    res.send(filtradoDestino);
  } catch (error) {
    next(error);
  }
});
router.get("/searchorigen", async (req, res, next) => {
  const { origen } = req.query;

  try {
    let filtradoOrigen;
    if (origen) {
      let viajes = await Viaje.findAll({
        include: [
          {
            model: Usuario
          },
          {
            model: Vehiculo
          }
        ]
      });
      filtradoOrigen = await viajes.filter(e => {
        return e.dataValues.origen.toLowerCase().includes(origen.toLowerCase());
      });
    }

    // console.log(filtradoOrigen);
    res.send(filtradoOrigen);
  } catch (err) {
    next(err);
  }
});
router.get("/:viajeId", async (req, res, next) => {
  const { viajeId } = req.params;
  try {
    let viajeEncontrado = await Viaje.findByPk(viajeId, {
      include: [
        {
          model: Usuario
        },
        {
          model: Vehiculo
        }
      ]
    });
    console.log(viajeEncontrado)
    res.send(viajeEncontrado);
  } catch (err) {
    next(err);
  }
});
router.put("/sumarse", async (req, res, next) => {
  const { email, id } = req.body;
  try {
    const viajeUsuario = await Viaje.findByPk(id, {
      include: [
        {
          model: Usuario
        },
        {
          model: Vehiculo
        }
      ]
    });
    await viajeUsuario.addUsuario(email);
    res.send(viajeUsuario);
  } catch (err) {
    next(err);
  }
});
router.put("/modificarAsiento", async (req, res, next) => {
  const { asientosAOcupar, id } = req.body;
  try {
    let asientos = await Viaje.findByPk(id);
    asientos.update({
      asientosAOcupar: asientosAOcupar - 1
    });
    asientos.save();
    res.send(asientos);
  } catch (err) {
    next(err);
  }
});
router.put("/pausarViaje/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let viaje = await Viaje.findByPk(id, {
      include: [{ model: Usuario }, { model: Vehiculo }]
    });
    viaje.update({ viajeDisponible: false });
    viaje.save();
    res.send(viaje);
  } catch (err) {
    next(err);
  }
});
router.put("/reactivararViaje/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let viaje = await Viaje.findByPk(id, {
      include: [{ model: Usuario }, { model: Vehiculo }]
    });
    viaje.update({ viajeDisponible: true });
    viaje.save();
    res.send(viaje);
  } catch (err) {
    next(err);
  }
});
router.put("/modificarViaje/:id", async (req, res, next) => {
  const { id } = req.params;
  const {fecha, hora, origen, destino, asientosAOcupar, aceptaFumador, aceptaMascota, aceptaEquipaje, usaBarbijo } = req.body;
  let viaje = await Viaje.findByPk(id, {
    include: [{ model: Usuario }, { model: Vehiculo }]
  });
  if(fecha){
    viaje.update({ fecha: fecha });
    viaje.save();
  }
  if(hora){
    viaje.update({ hora: hora });
    viaje.save();
  }
  if(origen){
    viaje.update({ origen: origen });
    viaje.save();
  }
  if(destino){
    viaje.update({ destino: destino });
    viaje.save();
  }
  if(asientosAOcupar){
    viaje.update({ asientosAOcupar: asientosAOcupar });
    viaje.save();
  }
  if(aceptaFumador){
    viaje.update({ aceptaFumador: aceptaFumador });
    viaje.save();
  }
  if(aceptaMascota){
    viaje.update({ aceptaMascota: aceptaMascota });
    viaje.save();
  }
  if(aceptaEquipaje){
    viaje.update({ aceptaEquipaje: aceptaEquipaje });
    viaje.save();
  }
  if(usaBarbijo){
    viaje.update({ usaBarbijo: usaBarbijo });
    viaje.save();
  }
  res.send(viaje)
});

module.exports = router;
