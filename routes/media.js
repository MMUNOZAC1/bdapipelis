const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('modelo', 'invalid.modelo').not().isEmpty(),
    check('descripcion', 'invalid.descripcion').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('imagenPortada', 'invalid.imagenPortada').not().isEmpty(),
    check('fechaCreacion', 'invalid.fechaCreacion').not().isEmpty(),
    check('fechaActualizacion', 'invalid.fechaActualizacion').not().isEmpty(),
    check('añoEstreno', 'invalid.añoEstreno').not().isEmpty(),
    check('generoPrincipal', 'invalid.generoPrincipal').not().isEmpty(),
    check('directorPrincipal', 'invalid.directorPrincipal').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        const mediaExist = await Media.findOne({ email: req.body.email });
        if (mediaExist) {
            return res.status(400).send('Exist email');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.modelo = req.body.modelo;
        media.descripcion = req.body.descripcion;
        media.color = req.body.color;
        media.imagenPortada = req.body.imagenPortada;
        media.fechaCreacion = req.body.fechaCreacion;
        media.fechaActualizacion = req.body.fechaActualizacion;
        media.añoEstreno = req.body.añoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;
        media.createdAt = new Date();
        media.updatedAt = new Date();

        media = await media.save();
        res.send(media)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async (req, res) => {
  try {
    const medias = await Media.find()
    res.send(medias)
  } catch (error) {
    console.log(error)
    res.status(500).send('error en el servidor')
    }
});


module.exports = router;