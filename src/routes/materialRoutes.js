const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/materialController');

const materialController = new MaterialController();

router.get('/', materialController.obtenerMateriales);
router.post('/', materialController.crearMaterial);
router.put('/incrementar/:id', materialController.incrementarCantidad);
router.delete('/:id', materialController.eliminarMaterial);

module.exports = router;