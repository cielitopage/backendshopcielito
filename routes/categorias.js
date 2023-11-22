const { Router} = require('express');
const { check } = require('express-validator');
const { validarcampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jws');

const { getCategorias,  getCategoria, crearCategoria, actualizarCategoria, borrarCategoria ,activarCategoria} = require('../controllers/categorias');


const router = Router();

// Obtener todas las categorias - publico
router.get('/',validarJWT, getCategorias);

// Obtener una categoria por id - publico
 router.get('/:id', getCategoria);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarcampos
], crearCategoria); 


// Actualizar - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarcampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', validarJWT, borrarCategoria);

router.put('/activar/:id', validarJWT, activarCategoria);





module.exports = router;
