const router = require("express").Router();
const { Colaboracion } = require("../db.js");

router.post("/nuevaColaboracion", async (req, res, next) => {
  try {
    const { unit_price, usuarioPagador, title, quantity, orderId } = req.body;
    let nuevaColaboracion;
    if (orderId && quantity && title && usuarioPagador && unit_price) {
      nuevaColaboracion = await Colaboracion?.create({
        unit_price: parseInt(unit_price),
        usuarioPagador: usuarioPagador,
        title: title,
        quantity: quantity,
        orderId: orderId
      });
    }
    // console.log("pago", nuevaColaboracion);
    res.send(nuevaColaboracion);
  } catch (err) {
    next(err);
  }
});

router.get("/colaboraciones", async (req, res, next) => {
  try {
    const colaboracion = await Colaboracion?.findAll({ where: { abonado: false } });
    if(colaboracion)res.send(colaboracion)
    else res.send("no hay colaboraciones")
  } catch (err) {
    next(err);
  }
});

router.get("/usuario/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const colaboracion = await Colaboracion?.findOne({
      where: { usuarioPagador: email, abonado: false }
    });
    if (colaboracion) res.send(colaboracion);
    else res.send("no hay colaboracion");
  } catch (err) {
    next(err);
  }
});



module.exports = router;
