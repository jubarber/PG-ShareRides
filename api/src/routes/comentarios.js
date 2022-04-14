const express = require("express");
const { Router } = require("express");
const router = Router();
const { Usuario, Comentarios } = require("../db.js");

router.post("/postComentarios", async (req, res, next) => {
  try {
    const { email, calificacion, comentarios, nombre, apellido } = req.body;
    let nuevoComentario;
    nuevoComentario = await Comentarios.create({
      calificacion,
      comentarios,
      nombre,
      apellido,
    });
    const emailRecibido = await Usuario.findByPk(email);
    console.log(emailRecibido);
    await nuevoComentario.addUsuario(emailRecibido);
    res.json(nuevoComentario);
  } catch (error) {
    next(error);
  }
});

router.get("/comentarios", async (req, res, next) => {
  try {
    let comentarios = await Comentarios.findAll({ include: Usuario });
    res.send(comentarios);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
