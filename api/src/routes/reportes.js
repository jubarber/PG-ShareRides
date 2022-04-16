const express = require("express");
const { Router } = require("express");
const router = Router();
const { Usuario, Reportados } = require("../db.js");

router.post("/postReporte", async (req, res, next) => {
  try {
    const { email, reportes, justificacion, nombre, apellido } = req.body;
    let nuevoReporte;
    nuevoReporte = await Reportados.create({
      reportes,
      justificacion,
      nombre,
      apellido,
    });
    const reporteRecibido = await Usuario.findByPk(email);
    console.log(reporteRecibido);
    await nuevoReporte.addUsuario(reporteRecibido);
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

module.exports = router;
