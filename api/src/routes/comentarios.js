const express = require("express");
const { Router } = require("express");
// const { where } = require("sequelize/types");
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
    await nuevoComentario.addUsuario(emailRecibido);
    const usuarioActualizado = await Usuario.findByPk(email, {
      include: Comentarios,
    });
    let num = 0;
    let div = usuarioActualizado.comentarios.length;
    // console.log("numero: ",num,"divisor: ", div,"total :", num/div)
    await emailRecibido.update({ puntuacion: Math.round(num / div) });
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

router.get("/comentarios/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let comentarioById = await Comentarios.findByPk(id, { include: Usuario });

    if (comentarioById) {
      res.send(comentarioById);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/eliminarComentarios", async (req, res, next) => {
  const { id } = req.body;
  try {
    let comentarioEliminado = await Comentarios.findByPk(id);
    comentarioEliminado.update({
      disponible: false,
    });
    comentarioEliminado.save();
    res.send(comentarioEliminado);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
