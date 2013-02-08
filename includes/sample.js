var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('real', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'real' database");
        db.collection('forums', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'forums' collection doesn't exist. Creating it without data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving forum: ' + id);
    db.collection('forums', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('forums', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addForum = function(req, res) {
    var forum = req.body;
    console.log('Adding forum: ' + JSON.stringify(forum));
    db.collection('forums', function(err, collection) {
        collection.insert(forum, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateForum = function(req, res) {
    var id = req.params.id;
    var forum = req.body;
    console.log('Updating forum: ' + id);
    console.log(JSON.stringify(forum));
    db.collection('forums', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, forum, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating forum: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(forum);
            }
        });
    });
}

exports.deleteForum = function(req, res) {
    var id = req.params.id;
    console.log('Deleting forum: ' + id);
    db.collection('forums', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


var populateDB = function() {
 
var forums = [
{
name: "CHATEAU DE SAINT COSME",
year: "2009",
grapes: "Grenache / Syrah",
country: "France",
region: "Southern Rhone",
description: "The aromas of fruit and spice...",
picture: "saint_cosme.jpg"
},
{
name: "LAN RIOJA CRIANZA",
year: "2006",
grapes: "Tempranillo",
country: "Spain",
region: "Rioja",
description: "A resurgence of interest in boutique vineyards...",
picture: "lan_rioja.jpg"
}];
 
db.collection('forums', function(err, collection) {
collection.insert(forums, {safe:true}, function(err, result) {});
});
 
};
