const connection = require('./libs/connection');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const bodyParser = require ('body-parser');
const cors = require('cors');

const Hour = 1000 * 60 * 60

const app = express();

app.use(cors({
    origin: "http://localhost:8081",
    optionsSuccessStatus: 200,
    credentials: true
}));

var sessionStore = new MySQLStore({}, connection);

app.use(session({
	name: "libraryCookie",
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
	cookie:{
		maxAge: Hour * 2,
		sameSite: true
	}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'applicationlication/json' }));

require("./routes/app.routes")(app);

var server = app.listen(8080, '127.0.0.1', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
})
