const MaterialService = require('../services/materialService');
const MaterialRepository = require('../repositories/materialRepository');
const db = require('../db');


const materialRepository = new MaterialRepository(db);


const materialService = new MaterialService(materialRepository);

class MaterialController {
  
  constructor() {
    this.obtenerMateriales = this.obtenerMateriales.bind(this);
    this.crearMaterial = this.crearMaterial.bind(this);
    this.actualizarMaterial = this.incrementarCantidad.bind(this);
    this.eliminarMaterial = this.eliminarMaterial.bind(this);
  }

  async obtenerMateriales(req, res) {
    try {
      const materiales = await materialService.obtenerMateriales();
      res.json(materiales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // materialController.js
async crearMaterial(req, res) {
  const { titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual } = req.body;

  try {
    const result = await materialService.crearMaterial(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual);
    
    // Verificar el resultado
    console.log('Resultado de la creación del material:', result);

    res.status(201).json({ message: 'Material creado correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al crear el material:', error);
    res.status(500).json({ error: error.message });
  }
}

  async incrementarCantidad(req, res) {
  const { id } = req.params;
  const { cantidad } = req.body; // Obtener la cantidad del cuerpo de la solicitud
  if (!cantidad) {
    return res.status(400).json({ error: 'Debe proporcionar la cantidad a incrementar' });
  }

  try {
    const result = await materialService.incrementarCantidad(id, cantidad);
    res.json({ message: 'Cantidad incrementada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

  async eliminarMaterial(req, res) {
    const { id } = req.params;
    try {
      await materialService.eliminarMaterial(id);
      res.json({ message: 'Material eliminado correctamente' });
    } catch (error) { 
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MaterialController;