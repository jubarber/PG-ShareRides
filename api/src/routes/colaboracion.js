const router = require("express").Router();
const { Colaboracion } = require("../db.js");

router.post("/nuevaColaboracion", async (req, res, next) => {
  try {
    const {
      unit_price,
      usuarioPagador,
      title,
      quantity,
      orderId,
      usuarioCobrador,
      viajeId
    } = req.body;
    console.log(unit_price, orderId)
    let nuevaColaboracion;
    let colabSinPagar = await Colaboracion.findAll({
        where: { usuarioPagador: usuarioPagador, abonado: false }
      });
      if (colabSinPagar.length!==0) {res.send(colabSinPagar);}
      else {
        nuevaColaboracion = await Colaboracion.create({
          unit_price: parseInt(unit_price),
          usuarioPagador: usuarioPagador,
          title: title,
          quantity: quantity,
          orderId: orderId,
          usuarioCobrador: usuarioCobrador,
          viajeId: viajeId
        });
      }
    res.send(nuevaColaboracion);
  } catch (err) {
    next(err);
  }
});

router.get("/colaboraciones/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    let colaboraciones = await Colaboracion.findAll({
      where: { usuarioPagador: email }
    });
  res.send(colaboraciones)
  } catch (err) {
    next(err);
  }
});

router.put("/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log(email)
    let colaboracion;
     colaboracion = await Colaboracion.findOne({
      where: { usuarioPagador: email, abonado: false }
    });
    if (colaboracion?.length!==0) {
      colaboracion?.update({ abonado: true });
      colaboracion?.save()
      colaboracion && res.send(colaboracion);
    } else res.status(404).send("no hay colaboracion");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
