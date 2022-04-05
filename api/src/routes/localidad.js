const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Localidad } = require("../db.js");

router.get("/localidades", async (req, res, next) => {
  const { nombre } = req.query;
  try {
    let localidadesFiltradas;
    if (nombre) {
      let localidades = await Localidad.findAll();
      localidadesFiltradas = localidades.filter((e) => {
        return e.dataValues.nombre.toLowerCase().includes(nombre.toLowerCase());
      });
    } else {
      let localidadesDb = await Localidad.findAll();
      let apiLocalidades;
      if (localidadesDb.length === 0) {
        const apiUrl = await axios.get(
          "https://apis.datos.gob.ar/georef/api/localidades?aplanar=true&campos=estandar&max=5000&formato=json"
        );
        if (apiUrl) {
          apiLocalidades = apiUrl.data.localidades.map((e) => {
            return {
              nombre: e.nombre,
              municipio: e.municipio_nombre,
              provincia: e.provincia_nombre
            };
          });
        }
        apiLocalidades.map(async (e) => {
          await Localidad.findOrCreate({
            where: {
              nombre: e.nombre,
              municipio: e.municipio,
              provincia: e.provincia
            }
          });
        });
        res.send(apiLocalidades);
      } else {
        res.send(localidadesDb);
      }
    }
    res.send(localidadesFiltradas);
  } catch (err) {
    next(err);
  }
});


// 

module.exports = router;
