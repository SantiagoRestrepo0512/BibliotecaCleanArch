class Material {
  constructor(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual) {
    this.titulo = titulo;
    this.tipo = tipo;
    this.fecha_registro = fecha_registro;
    this.cantidad_registrada = cantidad_registrada;
    this.cantidad_actual = cantidad_actual;
  }

  static fromDatabase(row) {
    return new Material(row.titulo, row.tipo, row.fecha_registro, row.cantidad_registrada, row.cantidad_actual);
  }

  static validar(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual) {
    if (!titulo || !tipo || !fecha_registro || cantidad_registrada == null || cantidad_actual == null) {
      throw new Error('Faltan datos obligatorios');
    }
  }
}

module.exports = Material;