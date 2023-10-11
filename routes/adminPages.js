const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/admin/mediaController');

/* Media controller routes */
router.get('/mediaplayercasino/:type/:token', mediaController.mediaplayerCasino);
router.get('/mediaplayergame/:gameID/:ip', mediaController.mediaplayerGame)
router.get('/mediaplayervirtual/:gameID/:ip', mediaController.mediaplayerVirtual)
module.exports = router;