const express = require("express");
const { Router } = require("express");
const router = Router();
const { Usuario, Comentarios } = require("../db.js");

router.post("/postComentarios", async (req, res, next) => {
  try {
    const { email, calificacion, comentarios } = req.body;
    let nuevoComentario;
    nuevoComentario = await Comentarios.create({
      calificacion,
      comentarios,
    });
    await nuevoComentario.addUsuario(email);
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
