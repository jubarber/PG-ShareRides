const { Router } = require("express");
const router = Router();
const { Vehiculo, Usuario } = require("../db.js");

router.post("/", async (req, res, next) => {
  try {
    const { patente, marca, modelo, dni, email } = req.body;
    let nuevoVehiculo;
    if(patente){
      nuevoVehiculo = await Vehiculo.create({
        patente: patente,
        marca: marca,
        modelo: modelo,
        dni: dni
      })
      nuevoVehiculo.addUsuario(email)
    }
    res.json(nuevoVehiculo)
  } catch (err) {
    next(err);
  }
});

router.get("/:email", async (req, res, next) => {
  try{
    const {email} = req.params;
    let vehiculos;
    if(email){
      vehiculos = await Vehiculo.findAll({include:{
        model: Usuario,
        where: {
          email: email
        }}
      })
    }
    if(vehiculos.length!==0) res.json(vehiculos)
    else res.send("No hay vehiculos")
  }catch(err){
    next(err)
  }
})

module.exports = router;
