class PersonaService {
  constructor(personaRepository) {
    this.personaRepository = personaRepository;
  }

  async obtenerPersonas() {
    return await this.personaRepository.obtenerPersonas();
  }

  async crearPersona(persona) {
    if (!persona.nombre || !persona.rol) {
      throw new Error('Nombre y rol son obligatorios');
    }
    return await this.personaRepository.crearPersona(persona);
  }

  async actualizarPersona(id, persona) {
    if (!persona.nombre || !persona.rol) {
      throw new Error('Nombre y rol son obligatorios');
    }
    return await this.personaRepository.actualizarPersona(id, persona);
  }

  async eliminarPersona(id) {
    return await this.personaRepository.eliminarPersona(id);
  }
}

module.exports = PersonaService;
