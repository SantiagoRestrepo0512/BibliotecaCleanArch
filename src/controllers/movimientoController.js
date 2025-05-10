const MovimientoRepository = require('../repositories/MovimientoRepository');
const MovimientoService = require('../services/MovimientoService');
const db = require('../db');

const movimientoRepo = new MovimientoRepository(db);
const movimientoService = new MovimientoService(movimientoRepo);

class MovimientoController {
  async obtenerMovimientos(req, res) {
    try {
      const movimientos = await movimientoService.obtenerMovimientos();
      res.json(movimientos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async registrarPrestamo(req, res) {
    const { cedula_persona, id_material, fecha } = req.body;
    try {
      const resultado = await movimientoService.registrarPrestamo(cedula_persona, id_material, fecha);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async registrarDevolucion(req, res) {
    const { cedula_persona, id_material, fecha } = req.body;
    try {
      const resultado = await movimientoService.registrarDevolucion(cedula_persona, id_material, fecha);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = MovimientoController;
