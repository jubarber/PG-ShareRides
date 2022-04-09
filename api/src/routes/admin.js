const { Router } = require("express");
const router = Router();
const { Usuario } = require("../db.js");

router.post("/sesionadmin", async (req, res, next) => {
    console.log(req.body.email)
    if (
      req.body.email === "pgsharerides@gmail.com" &&
      req.body.password === "piedra123"
    ) {
      res.cookie("admin", "true")
      res.send("Admin inicia sesion")
    } else {
      res.send("Usuario o contraseña incorrecto")
    }
  });
  
  router.get("/adminusuarios", async (req, res, next) => {
    if (req.cookies.admin){
        let usuarios = await Usuario.findAll();
        res.send(usuarios);
    } else {
      res.send("Acceso denegado, debes iniciar sesión")
    }
  })

  router.delete("/sesionadmin", async (req, res, next)=> {
    res.clearCookie("admin")
    res.send("cookie borrada")
  })
  
  module.exports = router;