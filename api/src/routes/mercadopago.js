const { Order } = require("../db.js");
const router = require("express").Router();
const axios = require("axios");
const { PROD_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: PROD_ACCESS_TOKEN,
});

router.get("/:orderId/:unit_price", (req, res) => {
  const { orderId, unit_price } = req.params;
  let preference = {
    items: [
      {
        title: "Colaboracion con gastos de viaje",
        unit_price: parseInt(unit_price),
        quantity: 1,
      },
    ],
    external_reference: `${orderId}`,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "atm",
        },
        {
          id: "ticket",
        },
      ],
      installments: 3, //Cantidad máximo de cuotas
    },
    back_urls: {
      success: "http://localhost:3000/temporal",
      failure: "http://localhost:3000/home",
      pending: "http://localhost:3000/home",
    },
  };

  mercadopago.preferences
    .create(preference)

    .then(function (response) {
      let sandbox = response.body.sandbox_init_point;
      res.send(sandbox);
    })
    .catch(function (error) {
      console.log(error);
    });
});

router.get("/pagos", async (req, res) => {
  const payment_id = req.query.payment_id;
  const payment_status = req.query.status;
  const external_reference = req.query.external_reference;
  const merchant_order_id = req.query.merchant_order_id;

  Order.findByPk(external_reference)
    .then((order) => {
      order.payment_id = payment_id;
      order.payment_status = payment_status;
      order.merchant_order_id = merchant_order_id;
      order.status = "completed";
      console.info("Salvando order");
      order
        .save()
        .then((_) => {
          console.info("redirect success");
          return res.redirect("http://localhost:3000/home");
        })
        .catch((err) => {
          console.error("error al salvar", err);
          return res.redirect("http://localhost:3000/home");
        });
    })
    .catch((err) => {
      console.error("error al buscar", err);
      return res.redirect("http://localhost:3000/home");
    });

  //proceso los datos del pago
  //redirijo de nuevo a react con mensaje de exito, falla o pendiente
});

// //Busco información de una orden de pago
router.get("/pagos/:id", (req, res) => {
  const mp = new mercadopago(PROD_ACCESS_TOKEN);
  const id = req.params.id;
  console.info("Buscando el id", id);
  mp.get(`/v1/payments/search`, { status: "pending" }) //{"external_reference":id})
    .then((resultado) => {
      console.info("resultado", resultado);
      res.json({ resultado: resultado });
    })
    .catch((err) => {
      console.error("No se consulto:", err);
      res.json({
        error: err,
      });
    });
});

module.exports = router;
