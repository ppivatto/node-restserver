const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario').Usuario;
const Producto = require('../models/producto').Producto;

const fs = require('fs');
const path = require('path');

app.use( fileUpload({ useTempFiles: true }) );

app.put('/upload/:tipo/:id', (req, res) => {
    
    let tipo = req.params.tipo;
    let id = req.params.id;
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({
                ok: false, 
                err: {
                    message: 'No se ha seleccionado ningún archivo'
                }
            });
    }
    
    //Validar Tipo
    let tiposValidos = ['productos', 'usuarios'];
    
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `Los tipos válidos son: ${tiposValidos.join(', ')}`,
                tipo
            }
        })
    } 
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    
    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    
    if (extensionesValidas.indexOf( extension ) < 0 ) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `Las extensiones válidas son: ${extensionesValidas.join(', ')}`,
                ext: extension
            }
        })
    }
    
    //Cambiar Nombre al Archivo
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension}`;
        
    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err) {
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }
        //Aqui, imagen cargada
        
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }
        
    });
    
});

const imagenUsuario = (id, res, nombreArchivo) => {
    
    Usuario.findById(id, (err, usuarioDB) => {
        
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }
    
        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            
            return res.status(400)
                .json({
                    ok: false,
                    err: {
                        message: 'Usuario no existe'
                    }
                });
        }
    
        borraArchivo(usuarioDB.img, 'usuarios');
        
        usuarioDB.img = nombreArchivo;
        
        usuarioDB.save( (err, usuarioGuardado) => {
           
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
            
        });
        
    })
    
};

const imagenProducto = (id, res, nombreArchivo ) => {
    Producto.findById(id, (err, productoDB) => {
        
        if (err) {
            borraArchivo(nombreArchivo, 'productos');
            
            return res.status(500)
                .json({
                    ok: false,
                    err
                });
        }
        
        if (!productoDB) {
            borraArchivo(nombreArchivo, 'productos');
            
            return res.status(400)
                .json({
                    ok: false,
                    err: {
                        message: 'Producto no existe'
                    }
                });
        }
    
        borraArchivo(productoDB.img, 'productos');
    
        productoDB.img = nombreArchivo;
    
        productoDB.save( (err, productoGuardado) => {
            
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            })
            
        });
        
    })
};

const borraArchivo = ( nombreImagen, tipo) => {
    
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}` );
    
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
};

module.exports = app;