const Categoria = require('../models/categoria');
const { response } = require('express');



const getCategorias = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    await Promise.all([
        Categoria.countDocuments(),
        Categoria.find().populate('usuario', 'nombre img')
            .skip(desde)
            .limit(10)
    ])
        .then(respuestas => {
            res.json({
                ok: true,
                categorias: respuestas[1],
                total: respuestas[0]
            });

        });
}


const getCategoria = async (req, res = response) => {
    const uid = req.params.id;
    const categoria = await Categoria.findById(uid).populate('usuario', 'nombre img');

    res.json({
        ok: true,
        categoria
    });
}


const crearCategoria = async (req, res = response) => {
    const categoria = new Categoria({
        usuario: req.uid,
        ...req.body
    });

    if (categoria.nombre) {
        const existeNombre = await Categoria.findOne({ nombre: categoria.nombre });
        if (existeNombre) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una categoria con ese nombre'
            });
        }
    }
    try {
        const categoriaDB = await categoria.save();

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const actualizarCategoria = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const categoriaDB = await Categoria.findById(uid);

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }

        // Actualizaciones

        const { nombre, ...campos } = req.body;

        if (categoriaDB.nombre !== nombre) {
            const existeNombre = await Categoria.findOne({ nombre });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con ese nombre'
                });
            }
        }

        campos.nombre = nombre;

        const categoriaActualizada = await Categoria.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            categoria: categoriaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}




const borrarCategoria = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(uid);

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }
        const categoriaBorrada = await Categoria.findByIdAndUpdate(uid, { estado: false }, { new: true });
        res.json({
            ok: true,
            msg: 'Categoria eliminada',
            categoria: categoriaBorrada

        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const activarCategoria = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(uid);

        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }
        const categoriaBorrada = await Categoria.findByIdAndUpdate(uid, { estado: true }, { new: true });
        res.json({
            ok: true,
            msg: 'Categoria eliminada',
            categoria: categoriaBorrada

        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    getCategorias,
    getCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria,
    activarCategoria
}
// Compare this snippet from routes\categorias.js:
