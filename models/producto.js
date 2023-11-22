const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
    },   
    precio: {
        type: Number,
        default: 0
    },  
    porcentajeoff: {
        type: Number,
        default: 0
    },  
    descripcion: {
        type: String
    },
    linkdepago: {
        type: String
    },
    img: {
            type: String,
        }
    ,
    img2: {
        type: String,
    }
,
    nuevo : {
        type: Boolean,
        default: false,       
    },
    destacado : {
        type: Boolean,
        default: false,      
    },
    edad: {
        type: [String],
        default: '4',
        enum: ['4', '6', '8', '10', '12', '14', '16'],
    },
    cuotascant: {
        type: Number,
        default: 0
    }, 
    cuotasvalorsininteres: {
        type: Number,
        default: 0
    },
    cuotasDecripcion: {
        type: String,
    },
    compra3x2: {
        type: Boolean,
        default: false
    },
    envio: {
        type: String,   
        default: 'gratis',
        enum: ['gratis', 'pago'],   
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
});

// Sobreescribir el método toJSON

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSchema);

// Path: routes\productos.js