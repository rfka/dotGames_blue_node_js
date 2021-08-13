const express = require('express');
const router = express.Router();

const DotGamesController = require('../controllers/dotGames.controller');

const dotGamesController = new DotGamesController();

router.get('/jogos', dotGamesController.getJogos);
router.get('/jogos/:id', dotGamesController.getJogosById);
router.post('/jogos', dotGamesController.createJogo);
router.put('/jogos/:id', dotGamesController.updateJogo);
router.delete('/jogos/:id', dotGamesController.deleteJogo);

module.exports = router;