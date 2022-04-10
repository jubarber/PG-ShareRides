const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const usuarioRouter = require('./usuario.js');
const vehiculoRouter = require('./vehiculo.js');
const viajeRouter = require('./viaje.js');
const localidadRouter = require('./localidad.js');
const adminRouter = require('./admin.js');
const comentariosRouter = require("./comentarios.js");
const orderRouter = require("./order.js");
const colaboracionRouter = require("./colaboracion.js");
const mercadopagoRouter = require("./mercadopago.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/usuario", usuarioRouter);
router.use("/vehiculo", vehiculoRouter);
router.use("/viaje", viajeRouter);
router.use('/admin', adminRouter);
router.use("/localidad", localidadRouter);
router.use("/comentarios", comentariosRouter);
router.use("/order", orderRouter);
router.use("/colaboracion", colaboracionRouter);
router.use("/mercadopago", mercadopagoRouter);

module.exports = router;
