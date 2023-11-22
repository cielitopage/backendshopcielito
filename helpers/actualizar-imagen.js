require('dotenv').config();
const fs = require('fs');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const Article = require('../models/article');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const actualizarImagen = async (tipo, id, nombreArchivo, nombreArchivo2) => {

    switch (tipo) {

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }

            if (usuario.img) {
                const nombreArr = usuario.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split('.');
                await cloudinary.uploader.destroy('productos/' + public_id);
            }
          
            usuario.img = nombreArchivo;

            await usuario.save();
            return true;

            break;

        case 'productos':

            const productos = await Producto.findById(id);
            if (!productos) {
                console.log('No es un productos por id');
                return false;
            }       
                  
            if (nombreArchivo) {                   
                if (productos.img) {
                    const nombreArr = productos.img.split('/');
                    const nombre = nombreArr[nombreArr.length - 1];
                    const [public_id] = nombre.split('.');
                    await cloudinary.uploader.destroy('productos/' + public_id);
                }

                productos.img = nombreArchivo;
                await productos.save();
                return true;
            }

            if (nombreArchivo2) {   
                if (productos.img2) {
                    const nombreArr = productos.img2.split('/');
                    const nombre = nombreArr[nombreArr.length - 1];
                    const [public_id] = nombre.split('.');
                    await cloudinary.uploader.destroy('productos/' + public_id);
                }
                
                productos.img2 = nombreArchivo2;
                await productos.save();
                return true;
            }

            return true;

            break;

        case 'categorias':
            const categorias = await Categoria.findById(id);
            if (!categorias) {
                console.log('No es una categoria por id');
                return false;
            }

            if (categorias.img) {
                const nombreArr = categorias.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split('.');
                await cloudinary.uploader.destroy('productos/' + public_id);
            }
            
            categorias.img = nombreArchivo;
            await categorias.save();
            return true;

            break;

        case 'articulos':
            const articulos = await Article.findById(id);
            if (!articulos) {
                console.log('No es un articulos por id');
                return false;
            }
           
            if (articulos.img) {
                const nombreArr = articulos.img.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split('.');
                await cloudinary.uploader.destroy('productos/' + public_id);
            }
            articulos.img = nombreArchivo;
            await articulos.save();
            return true;

            break;

        default:

            break;
    }

}



module.exports = {
    actualizarImagen,

}
