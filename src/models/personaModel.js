class Persona {
  constructor(cedula, nombre, rol) {
    this.cedula = cedula;
    this.nombre = nombre;
    this.rol = rol;
  }

  static fromDatabase(row) {
    return new Persona(row.cedula, row.nombre, row.rol);
  }

  static validar(cedula, nombre, rol) {
    if (!cedula || !nombre || !rol) {
      throw new Error('Faltan datos obligatorios');
    }
  }
}

module.exports = Persona;
