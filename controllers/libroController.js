// controllers/libroController.js
import Libro from '../models/Libro.js';

export const crearLibro = async (req, res) => {
  try {
    console.log('📦 Recibido en backend:', req.body);
    const nuevoLibro = new Libro(req.body);
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar el libro' });
  }
};

export const obtenerLibros = async (req, res) => {
  const { usuarioId, q, estado } = req.query;
  const filtro = { userId: usuarioId };

  if (q) {
    filtro.$or = [
      { titulo: { $regex: q, $options: 'i' } },
      { autor: { $regex: q, $options: 'i' } }
    ];
  }

  if (estado && ['leído', 'por leer', 'abandonado'].includes(estado)) {
    filtro.estado = estado;
  }

  try {
    const libros = await Libro.find(filtro).sort({ _id: -1 });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener libros' });
  }
};

export const eliminarLibro = async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el libro' });
  }
};

export const actualizarLibro = async (req, res) => {
  try {
    const libroActualizado = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(libroActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el libro' });
  }
};
