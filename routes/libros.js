import express from 'express';
import {
  crearLibro,
  obtenerLibros,
  eliminarLibro,
  actualizarLibro
} from '../controllers/libroController.js';

const router = express.Router();

router.get('/', obtenerLibros);
router.post('/', crearLibro);
router.delete('/:id', eliminarLibro);
router.put('/:id', actualizarLibro);

export default router;
