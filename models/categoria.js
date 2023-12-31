const { Schema, model } = require('mongoose');



const CategoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true        
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    

});

// Sobreescribir el método toJSON

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...categoria } = this.toObject();
    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);

// Path: models\categoria.js