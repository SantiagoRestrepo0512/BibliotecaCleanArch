class MaterialRepository {
  constructor(db) {
    this.db = db;
  }


  async obtenerMateriales() {
    try {
      const [materiales] = await this.db.query('SELECT * FROM material');
      return materiales;
    } catch (error) {
      throw new Error('Error al obtener los materiales');
    }
  }

 
 async crearMaterial(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual) {
  try {
    const query = `
      INSERT INTO material (titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await this.db.query(query, [titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual]);
    return result;
  } catch (error) {
    throw new Error('Error al crear el material: ' + error.message);
  }
}

  async eliminarMaterial(id) {
    try {
      const result = await this.db.query('DELETE FROM material WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw new Error('Error al eliminar el material');
    }
  }


  async incrementarCantidad(id, cantidad) {
  try {
    const result = await this.db.query('UPDATE material SET cantidad_actual = cantidad_actual + ? WHERE id = ?', [cantidad, id]);
    return result;
  } catch (error) {
    throw new Error('Error al incrementar la cantidad del material: ' + error.message);
  }
}
}

module.exports = MaterialRepository;
