const express = require('express');
const router = express.Router();
const {
  getMedias,
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  getMediasByGenero,
  getMediasByDirector,
  getMediasByProductora,
  getMediasByTipo,
} = require('../controllers/mediaController');

router.route('/').get(getMedias).post(createMedia);
router.route('/:id').get(getMedia).put(updateMedia).delete(deleteMedia);
router.route('/genero/:generoId').get(getMediasByGenero);
router.route('/director/:directorId').get(getMediasByDirector);
router.route('/productora/:productoraId').get(getMediasByProductora);
router.route('/tipo/:tipoId').get(getMediasByTipo);

module.exports = router;