const express = require('express');
const router = express.Router();
const MovimientoController = require('../controllers/movimientoController'); // Usa M mayúscula para la clase

const movimientoController = new MovimientoController(); // Crea la instancia correctamente

router.get('/', movimientoController.obtenerMovimientos);
router.post('/prestamo', movimientoController.registrarPrestamo);
router.put('/devolucion', movimientoController.registrarDevolucion);

module.exports = router;
