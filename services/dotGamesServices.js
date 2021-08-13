const fileModel = require('../models/dotGames.js');

class DotGamesService {
    async findAll(){
        return await fileModel.find();
    }
    async findById(id){
        return await fileModel.findById(id);
    }
    async createGame(game) {
        return await new fileModel(game).save();
    }
    async updateJogo(game, id) {
        return await fileModel.findOneAndUpdate({_id: id}, game);
    }
    async delete(id) {
        return await fileModel.findByIdAndDelete(id);
    }
}

module.exports = DotGamesService;