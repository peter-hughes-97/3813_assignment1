const express = require('express')
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const io = require('socket.io')(http);
const sockets = require('./socket.js');

var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use (bodyParser.json());

const url = "mongodb+srv://karma:amtf88@karma-g8nlc.mongodb.net/test?w=majority"; 

MongoClient.connect(url, {poolSize:10,useNewUrlParser: true, useUnifiedTopology: true},function(err, client) {
    if (err) {return console.log(err)}
        const dbName = 'users';
        const db = client.db(dbName);
        sockets.connect(app, io,db);
        require('./routes/api-add.js')(db,app);
        require('./routes/api-prodcount.js')(db,app);
        require('./routes/api-validid.js')(db,app);
        require('./routes/api-getlist.js')(db,app);
        require('./routes/api-getitem.js')(db,app,ObjectID);
        require('./routes/api-update.js')(db,app,ObjectID);
        require('./routes/api-deleteitem.js')(db,app,ObjectID);

    require('./listen.js')(http);
});