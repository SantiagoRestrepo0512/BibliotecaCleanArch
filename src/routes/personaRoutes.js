const express = require('express');
const router = express.Router();
const PersonaController = require('../controllers/personaController');

const personaController = new PersonaController();


router.get('/', personaController.obtenerPersonas);
router.post('/', personaController.crearPersona);
router.put('/:cedula', personaController.actualizarPersona);
router.delete('/:cedula', personaController.eliminarPersona);

module.exports = router;

