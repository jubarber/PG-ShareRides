const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usuarioRouter = require('./usuario.js');
const vehiculoRouter = require('./vehiculo.js');
const viajeRouter = require('./viaje.js');
const provinciaRouter = require('./provincia.js');
const localidadRouter = require('./localidad.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/usuario", usuarioRouter);
router.use("/vehiculo", vehiculoRouter);
router.use("/viaje", viajeRouter);
router.use("/provincia", provinciaRouter);
router.use('/localidad', localidadRouter)


module.exports = router;

