const DotGamesService = require('../services/dotGamesServices.js');
const mongoose = require('mongoose');

const dotGamesService = new DotGamesService();

class DotGamesController {
    async getJogos(req, res){
        const jogos = await dotGamesService.findAll();
        res.send(jogos);
    }

    async getJogosById(req, res) {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)){
            res.status(404).send('ID inválido.');
            return;
        }

        const jogos = await dotGamesService.findById(id);
        if (!jogos) {
            res.status(404).send('Jogo não encontrado.');
            return;
        }

        res.send(jogos);
    }

    async createJogo(req, res) {
        const jogos = req.body;

        if(!jogos || !jogos.nome || !jogos.imagemUrl || !jogos.categoria || !jogos.classificacao) {
            res.status(400).send({
                message: 'Jogo Inválido!!! Certifique que foram digitados os valores para "NOME", "URL IMAGEM", "CATEGORIA" e "CLASSIFICAÇÃO".'
            });
            return;
        }

        const jogosSalvo = await dotGamesService.createGame(jogos);
        res.send(jogosSalvo);
    }

    async updateJogo(req, res) {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.send('Código Inválido!!');
            return;
        }

        const jogos = await dotGamesService.findById(id);

        if (!jogos) {
            res.status(404).send('Jogo não Encontrado!!');
            return;
        }

        const novoJogo = req.body;
        if (!Object.keys(novoJogo).length) {
            res.status(400).send({message: 'O campo da requisição está vazio!!'});
            return;
        }

        if (!novoJogo || !novoJogo.nome || !novoJogo.imagemUrl || !novoJogo.categoria || !novoJogo.classificacao){
            res.status(400).send({message:'Jogo Inválido!!! Certifique que foram digitados os valores para "NOME", "URL IMAGEM", "CATEGORIA" e "CLASSIFICAÇÃO".'})
            return;
        }

        dotGamesService.updateJogo(novoJogo, id);

        const dotJogoAtualizado = await dotGamesService.findById(id);
        res.send(dotJogoAtualizado);
    }

    async deleteJogo(req, res) {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)){
            res.status(422).send('Código Inválido!!');
            return;
        }

        const jogos = await dotGamesService.findById(id);

        if (!jogos) {
            res.status(404).send('Jogo não Encontrado!!');
            return;
        }

        await dotGamesService.delete(id);
        res.send({message: "Jogo Excluido com Sucesso!"});
    }
}

module.exports = DotGamesController;