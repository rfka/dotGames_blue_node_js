const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dotgamesSchema = new Schema({
    nome: {type: String, required: true},
    imagemUrl: {type: String, required: true},
    categoria: {type: String, required: true},
    classificacao: {type: String, required: true}
});

const dotGames = mongoose.model('DotGames', dotgamesSchema);

module.exports = dotGames;