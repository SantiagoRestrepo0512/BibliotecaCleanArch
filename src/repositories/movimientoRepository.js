class MovimientoRepository {
  constructor(db) {
    this.db = db;
  }

  // Obtener todos los movimientos
  async obtenerMovimientos() {
    try {
      const [rows] = await this.db.query('SELECT * FROM movimiento');
      return rows;
    } catch (err) {
      throw new Error(`Error al obtener movimientos: ${err.message}`);
    }
  }

  // Obtener los préstamos activos de una persona
  async obtenerPrestamosActivos(cedula_persona) {
    try {
      const query = `
        SELECT SUM(pendientes) AS prestamosActivos FROM (
          SELECT 
            id_material,
            COUNT(CASE WHEN tipo = 'prestamo' THEN 1 END) - 
            COUNT(CASE WHEN tipo = 'devolucion' THEN 1 END) AS pendientes
          FROM movimiento
          WHERE cedula_persona = ?
          GROUP BY id_material
        ) AS subconsulta
        WHERE pendientes > 0;
      `;
      const [results] = await this.db.query(query, [cedula_persona]);
      return results[0].prestamosActivos || 0;
    } catch (err) {
      throw new Error(`Error al obtener préstamos activos: ${err.message}`);
    }
  }

  // Registrar un préstamo
  async registrarPrestamo(cedula_persona, id_material, fecha) {
    try {
      const [personas] = await this.db.query('SELECT rol FROM persona WHERE cedula = ?', [cedula_persona]);
      if (personas.length === 0) throw new Error('Persona no registrada');
      
      const rol = personas[0].rol;
      let maxPrestamos;
      
      // Establecer el límite de préstamos según el rol
      switch (rol) {
        case 'estudiante':
          maxPrestamos = 5;
          break;
        case 'profesor':
          maxPrestamos = 3;
          break;
        case 'administrativo':
          maxPrestamos = 1;
          break;
        default:
          throw new Error('Rol no válido');
      }

      const prestamosActivos = await this.obtenerPrestamosActivos(cedula_persona);
      if (prestamosActivos >= maxPrestamos) {
        throw new Error(`El máximo de préstamos para este rol es ${maxPrestamos}`);
      }

      // Registrar el préstamo
      const query = 'INSERT INTO movimiento (cedula_persona, id_material, tipo, fecha) VALUES (?, ?, "prestamo", ?)';
      await this.db.query(query, [cedula_persona, id_material, fecha]);

      // Reducir la cantidad total del material cuando se hace un préstamo
      const updateQuery = 'UPDATE material SET cantidad_actual = cantidad_actual - 1 WHERE id = ?';
      await this.db.query(updateQuery, [id_material]);

    } catch (err) {
      throw new Error(`Error al registrar préstamo: ${err.message}`);
    }
  }

  // Registrar una devolución
  async registrarDevolucion(cedula_persona, id_material, fecha) {
    try {
      const [personas] = await this.db.query('SELECT * FROM persona WHERE cedula = ?', [cedula_persona]);
      if (personas.length === 0) throw new Error('Persona no registrada');

      const consulta = `
        SELECT 
          (SELECT COUNT(*) FROM movimiento WHERE cedula_persona = ? AND id_material = ? AND tipo = 'prestamo') - 
          (SELECT COUNT(*) FROM movimiento WHERE cedula_persona = ? AND id_material = ? AND tipo = 'devolucion') 
          AS prestamosPendientes
      `;

      const [res2] = await this.db.query(consulta, [cedula_persona, id_material, cedula_persona, id_material]);
      const pendientes = res2[0].prestamosPendientes || 0;

      if (pendientes <= 0) throw new Error('No hay préstamos pendientes de este material para devolver');

      // Insertar movimiento de devolución
      const query = 'INSERT INTO movimiento (tipo, fecha, cedula_persona, id_material) VALUES (?, ?, ?, ?)';
      await this.db.query(query, ['devolucion', fecha, cedula_persona, id_material]);

      // Sumar 1 a la cantidad actual del material
      const actualizar = 'UPDATE material SET cantidad_actual = cantidad_actual + 1 WHERE id = ?';
      await this.db.query(actualizar, [id_material]);

    } catch (err) {
      throw new Error(`Error al registrar devolución: ${err.message}`);
    }
  }
}

module.exports = MovimientoRepository;
