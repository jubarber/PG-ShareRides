const router = require("express").Router();
const { Order, Order_detail } = require("../db.js");

router.post("/", async (req, res, next) => {
  try {
    const { usuarioId } = req.body;
    console.log(usuarioId);
    const newOrder = await Order.findOrCreate({
      where: { usuarioId: usuarioId }
    });
    res.send(newOrder);
  } catch (err) {
    next(err);
  }
});

router.get("/detalle/:id", async (req, res, next) => {
  const id = req.params.id;
  Order.findOne({
    where: { id: id },
    include: {
      model: Order_detail,
      where: { orderId: id }
    }
  }).then((obj) => res.send(obj));
});

module.exports = router;
