const mongoose = require('mongoose');
const express = require('express');
let cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const charactersData = require('./getCharactersData');
const gamesData = require('./getGamesData');
const armorData = require('./getArmorData');
const weaponsData = require('./getWeaponsData');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute =
    'mongodb+srv://new_user:2233@cluster0.91ibjzw.mongodb.net/DSwikiDB?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('Подключение к БД успешно'));

db.on('error', console.error.bind(console, 'Подключение к БД не удалось:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getArmorData', (req, res) => {
    armorData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getArmorData/:title', (req, res) => {
    armorData.findOne({title:((req.params?.title).replace(':', '')).split('_').join(' ')}, (err, data) => {
        // console.log(req.params?.id.replace(':', '').replace('_', ' '));
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getWeaponsData', (req, res) => {
    weaponsData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getWeaponsData/:title', (req, res) => {
    weaponsData.findOne({title:((req.params?.title).replace(':', '')).split('_').join(' ')}, (err, data) => {
        // console.log(req.params?.id.replace(':', '').replace('_', ' '));
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getCharactersData', (req, res) => {
    charactersData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getCharactersData/:name', (req, res) => {
    charactersData.findOne({name:((req.params?.name).replace(':', '')).split('_').join(' ')}, (err, data) => {
        // console.log(req.params?.id.replace(':', '').replace('_', ' '));
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getGamesData', (req, res) => {
    gamesData.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.get('/getGamesData/:title', (req, res) => {
    gamesData.findOne({title:((req.params?.title).replace(':', '')).split('_').join(' ')}, (err, data) => {
        // console.log(req.params?.id.replace(':', '').replace('_', ' '));
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Прослушивается порт ${API_PORT}`));