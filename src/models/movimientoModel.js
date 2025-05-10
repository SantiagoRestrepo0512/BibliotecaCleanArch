class Movimiento {
  constructor(cedula_persona, id_material, fecha, tipo) {
    this.cedula_persona = cedula_persona;
    this.id_material = id_material;
    this.fecha = fecha;
    this.tipo = tipo;
  }

  static fromDatabase(row) {
    return new Movimiento(row.cedula_persona, row.id_material, row.fecha, row.tipo);
  }

  static validar(cedula_persona, id_material, fecha, tipo) {
    if (!cedula_persona || !id_material || !fecha || !tipo) {
      throw new Error('Faltan datos obligatorios');
    }
    if (tipo !== 'prestamo' && tipo !== 'devolucion') {
      throw new Error('Tipo inválido');
    }
  }
}

module.exports = Movimiento;
