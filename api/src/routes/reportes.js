const express = require("express");
const { Router } = require("express");
const router = Router();
const {
  Usuario,
  Reportados,
  Viaje,
  Comentarios,
  Vehiculo,
  Colaboracion,
} = require("../db.js");

router.post("/postReporte", async (req, res, next) => {
  try {
    const {email, reportes, justificacion, nombre, apellido, emailReportado } =
      req.body;
      //console.log("ENTRA", email, reportes, justificacion, nombre, apellido, emailReportado )
    let usuarioReportado = await Usuario.findByPk(emailReportado);
    let nuevoReporte;
    nuevoReporte = await Reportados.create({
      reportes,
      justificacion,
      nombre,
      apellido,
      email
    });
    await nuevoReporte.addUsuario(emailReportado);
    if (usuarioReportado) {
      usuarioReportado.update({ reportado: true });
      usuarioReportado.save();
    }
    res.json(nuevoReporte);
  } catch (error) {
    next(error);
  }
});
router.get("/reportes", async (req, res, next) => {
  try {
    let reportes = await Reportados.findAll({ include: Usuario });
    res.send(reportes);
  } catch (error) {
    next(error);
  }
});
router.get("/usuariosReportados", async (req, res, next) => {
  try {
    let usuariosReportados = await Usuario.findAll({
      where: { reportado: true },
      include: [
        { model: Viaje },
        { model: Reportados },
        { model: Comentarios },
        { model: Vehiculo },
      ],
    });
    if (usuariosReportados) {
      res.send(usuariosReportados);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
