const { Router } = require("express");
const router = Router();

const { Provincia } = require("../db.js");

router.get("/", async (req, res, next) => {
  try {
    const provinciasArray = [
      "Tierra del Fuego",
      "Santa Cruz",
      "Chubut",
      "Río Negro",
      "Neuquen",
      "La Pampa",
      "Mendoza",
      "San Juan",
      "San Luis",
      "Córdoba",
      "Buenos Aires",
      "La Rioja",
      "Catamarca",
      "Tucumán",
      "Santiago del Estero",
      "Santa Fe",
      "Entre Ríos",
      "Corrientes",
      "Misiones",
      "Chaco",
      "Formosa",
      "Salta",
      "Jujuy"
    ];

    provinciasArray.forEach((e, index) => {
      e &&
        Provincia.findOrCreate({
          where: { nombre: e, id: index + 1 }
        });
    });
    const provincias = await Provincia.findAll({});
    res.send(provincias);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
