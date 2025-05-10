class PersonaRepository {
  constructor(db) {
    this.db = db; 
  }


  async obtenerPersonas() {
    try {
      const [rows] = await this.db.query('SELECT * FROM persona');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener las personas');
    }
  }

async crearPersona(persona) {
  const { cedula, nombre, rol } = persona;
  try {
    const [result] = await this.db.query(
      'INSERT INTO persona (cedula, nombre, rol) VALUES (?, ?, ?)',
      [cedula, nombre, rol]
    );
    return { cedula, nombre, rol };
  } catch (error) {
    throw new Error('Error al crear la persona');
  }
}

  async actualizarPersona(cedula, persona) {
  const { nombre, rol } = persona;
  try {
    await this.db.query(
      'UPDATE persona SET nombre = ?, rol = ? WHERE cedula = ?',
      [nombre, rol, cedula]
    );
    return { cedula, ...persona };
  } catch (error) {
    throw new Error('Error al actualizar la persona');
  }
}

async eliminarPersona(cedula) {
  try {
    const [result] = await this.db.query('DELETE FROM persona WHERE cedula = ?', [cedula]);

    if (result.affectedRows === 0) {
      throw new Error('Persona no encontrada');
    }

    return result;
  } catch (error) {
    console.error('Error al eliminar la persona:', error);
    throw new Error('Error al eliminar la persona: ' + error.message);
  }
}
}

module.exports = PersonaRepository;
