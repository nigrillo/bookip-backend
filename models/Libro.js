import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'Falta el userId'],
  },
  titulo: {
    type: String,
    required: [true, 'Falta el título'],
    trim: true,
  },
  autor: String,
  fecha: String,
  tipo: String,
  puntuacion: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  comentario: String,
  portada: String,
  estado: {
    type: String,
    enum: ['leído', 'por leer', 'abandonado'],
    default: 'leído',
  }
});

const Libro = mongoose.model('Libro', libroSchema);

export default Libro;
