const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Función para autenticar a un usuario
async function authenticateUser(email, password) {
  // Consulta a la base de datos para verificar si el usuario existe y la contraseña es correcta
  const user = await db.getUserByEmailAndPassword(email, password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  return user;
}

// Ruta para autenticar a un usuario y generar un token secreto
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

module.exports = router;