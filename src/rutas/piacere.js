const express = require('express')
const rutas = express.Router()
const multer = require('multer')
const cargaImagenes = multer({
    dest: 'src/public/img'
})

const piaceriControlador = require('../controladores/piacere')

rutas.get('/',piaceriControlador.zona_inicio )
rutas.get('/historia',piaceriControlador.zona_historia)
rutas.get('/iniciar',piaceriControlador.zona_iniciar)
rutas.get('/registrarse',piaceriControlador.zona_registrar)
rutas.get('/mision',piaceriControlador.zona_mision_vision)
rutas.get('/combos',piaceriControlador.zona_combos)
rutas.get('/comerciales',piaceriControlador.zona_comerciales)
rutas.get('/comprar',piaceriControlador.zona_compras)

rutas.post('/crear_compra',piaceriControlador.crear_compra)

/*rutas.get('/crear', piaceriControlador.zona_crear)
rutas.post('/crear_dulce', cargaImagenes.single('imagen'), piaceriControlador.guardar)
rutas.get('/actualizar/:id', piaceriControlador.zona_editar)
rutas.post('/actualizar_dulce/:id', cargaImagenes.single('imagen'), piaceriControlador.actualizar)
rutas.get('/eliminar/:id', piaceriControlador.eliminar)*/

module.exports = rutas