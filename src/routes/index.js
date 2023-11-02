const express = require('express');
const router = express.Router();

// Ruta para la página de bienvenida
router.get('/', (req, res) => {
    res.render('libros/bienvenida', { title: 'Bienvenida a la Biblioteca' });
});

router.get('/Nosotros', (req, res) => {
    res.render('libros/Nosotros', { title: 'Bienvenida a la Biblioteca' });
});

module.exports = router;
