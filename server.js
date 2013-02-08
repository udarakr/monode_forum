var express = require('express'),
forums = require('./includes/sample');
 
var app = express();

app.configure(function () {
app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
});
 
app.get('/forums', forums.findAll);
app.get('/forums/:id', forums.findById);
app.post('/forums', forums.addForum);
app.put('/forums/:id', forums.updateForum);
app.delete('/forums/:id', forums.deleteForum);
 
app.listen(3000);
console.log('Listening on port 3000...');
