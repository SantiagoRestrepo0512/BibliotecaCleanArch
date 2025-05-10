class MovimientoService {
  constructor(movimientoRepository) {
    this.movimientoRepository = movimientoRepository;
  }

  async obtenerMovimientos() {
    try {
      const movimientos = await this.movimientoRepository.obtenerMovimientos();
      return movimientos;
    } catch (error) {
      throw new Error(`Error al obtener movimientos: ${error.message}`);
    }
  }

  async registrarPrestamo(cedula_persona, id_material, fecha) {
    try {
      await this.movimientoRepository.registrarPrestamo(cedula_persona, id_material, fecha);
      return { mensaje: 'Préstamo registrado exitosamente' };
    } catch (error) {
      throw new Error(`Error al registrar préstamo: ${error.message}`);
    }
  }

  async registrarDevolucion(cedula_persona, id_material, fecha) {
    try {
      await this.movimientoRepository.registrarDevolucion(cedula_persona, id_material, fecha);
      return { mensaje: 'Devolución registrada exitosamente' };
    } catch (error) {
      throw new Error(`Error al registrar devolución: ${error.message}`);
    }
  }
}

module.exports = MovimientoService;

