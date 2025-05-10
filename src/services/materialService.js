class MaterialService {
  constructor(materialRepository) {
    this.materialRepository = materialRepository;  
  }


  async obtenerMateriales() {
    try {
      return await this.materialRepository.obtenerMateriales();
    } catch (error) {
      throw new Error('Error al obtener los materiales');
    }
  }

  
  async crearMaterial(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual) {
  try {
    return await this.materialRepository.crearMaterial(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual);
  } catch (error) {
    throw new Error('Error al crear el material: ' + error.message);
  }
}

  async incrementarCantidad(id, cantidad) {
  try {
    return await this.materialRepository.incrementarCantidad(id, cantidad);
  } catch (error) {
    throw new Error('Error al incrementar la cantidad del material: ' + error.message);
  }
}

  async eliminarMaterial(id) {
    try {
      return await this.materialRepository.eliminarMaterial(id);
    } catch (error) {
      throw new Error('Error al eliminar el material');
    }
  }
}

module.exports = MaterialService;