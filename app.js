var koa = require('koa');
var route = require('koa-route');
var app = module.exports = koa();
var serve = require('koa-static');

// app config
app.use(serve(__dirname + '/public'));

// routes
var homeRoutes =require('./routes/homeRoutes');
app.use(route.get('/', homeRoutes.showHome));

var questionRoutes = require('./routes/questionRoutes');
app.use(route.get('/question', questionRoutes.showNewQuestion));
app.use(route.post('/question', questionRoutes.addQuestion));

// start the app
app.listen(4000);
console.log('the app is listening on port 4000');