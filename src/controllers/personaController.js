const PersonaService = require('../services/personaService');
const PersonaRepository = require('../repositories/personaRepository');
const db = require('../db');


const personaRepository = new PersonaRepository(db);


const personaService = new PersonaService(personaRepository);

class PersonaController {
  
  constructor() {
    this.obtenerPersonas = this.obtenerPersonas.bind(this);
    this.crearPersona = this.crearPersona.bind(this);
    this.actualizarPersona = this.actualizarPersona.bind(this);
    this.eliminarPersona = this.eliminarPersona.bind(this);
  }

  async obtenerPersonas(req, res) {
    try {
      const personas = await personaService.obtenerPersonas();
      res.json(personas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async crearPersona(req, res) {
  const { cedula, nombre, rol } = req.body;
  try {
    const result = await personaService.crearPersona({ cedula, nombre, rol });
    res.status(201).json({ message: 'Persona creada correctamente', cedula });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

 
async actualizarPersona(req, res) {
  const { cedula } = req.params;
  const { nombre, rol } = req.body;
  try {
    await personaService.actualizarPersona(cedula, { nombre, rol });
    res.json({ message: 'Persona actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


  async eliminarPersona(req, res) {
    const { cedula } = req.params;
    try {
     await personaService.eliminarPersona(cedula);
     res.json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
  }
  }
}
module.exports = PersonaController;