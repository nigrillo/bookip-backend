import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';


export const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'Ese mail ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({ nombre, email, password: hash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.status(401).json({ mensaje: 'Usuario no encontrado' });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
  }

  res.json({ _id: usuario._id, email: usuario.email });
};
