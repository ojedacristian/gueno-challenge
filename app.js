const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index');

// config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req, res, next) =>{
    console.log(`${req.url} - ${req.method}`);
    next();
})

// Routes
app.use(routes);

//static
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=> {
    console.log('Server en ', app.get('port'));
});
