import express from 'express';

const router = express.Router();

// Ruta con un Hola Mundo
router.get('/', (req, res) => {
  res.send('Hola mundo');
});

export default router;
