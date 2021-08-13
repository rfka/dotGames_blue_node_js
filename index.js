const express = require('express');
const cors = require('cors');
const dotGamesRoutes = require('./routes/dotGames.routes');

const app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://User_DB:F2YEP1isYctoxn9o@cluster0.pfe3g.mongodb.net/DotGames?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', (req, res)=> {
    res.send('Hola, que tal?');
});

app.use(dotGamesRoutes);

const port = 5000;
app.listen(port, ()=> {
    console.info(`App rodando em: http://localhost:${port}`)
});