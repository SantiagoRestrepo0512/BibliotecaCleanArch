const express = require('express');
const app = express();

const personaRoutes = require('./routes/personaRoutes');
const materialRoutes = require('./routes/materialRoutes');
const movimientoRoutes = require('./routes/movimientoRoutes');

app.use(express.json());

app.use('/persona', personaRoutes);
app.use('/material', materialRoutes);
app.use('/movimiento', movimientoRoutes);


app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Biblioteca');
});


app.use((err, req, res, next) => {
  console.error(err);  
  if (err instanceof SyntaxError) {
   
    return res.status(400).json({ error: 'Datos no válidos' });
  }
  res.status(500).json({ error: 'Algo salió mal' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
