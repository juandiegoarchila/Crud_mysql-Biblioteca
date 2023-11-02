
module.exports = {

bienvenida: function (req, res) {
    res.render('bienvenida', { title: 'Bienvenida a la Biblioteca' });
},
Nosotros: function (req, res) {
    res.render('Nosotros', { title: 'Bienvenida a la Biblioteca' });
},
}