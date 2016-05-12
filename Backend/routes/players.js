var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Using use will make sure that every requests that hits this controller will pass through these functions.
router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for players
//this will be accessible from http://127.0.0.1:3000/players if the default route for / is left unchanged
router.route('/')
    //GET all players
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Player').find({}, function (err, players) {
              if (err) {
                  return console.error(err);
              } else {
                  //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
                  res.format({
                      //HTML response will render the index.jade file in the views/players folder. We are also setting "players" to be an accessible variable in our jade view
                    html: function(){
                        res.render('players/index', {
                              title: 'All my forms',
                              "players" : players
                          });
                    },
                    //JSON response will show all players in JSON format
                    json: function(){
                        res.json(players);//JVILATA -- ponía infophotos ?==
                    }
                });
              }
        });
    })
    //POST a new blob
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        var id = req.body.id;
        var nombre = req.body.nombre;
        var responsable = req.body.responsable;
        var fechaentrev = req.body.fechaentrev;
        var fechaentrada = req.body.fechaentrada;
        var seleccionado = req.body.seleccionado;
        var dni = req.body.dni;
        var fechanac = req.body.fechanac;
        var sexo = req.body.sexo;
        var puntualidad = req.body.puntualidad;
        var presentacion = req.body.presentacion;
        var puestoaprop = req.body.puestoaprop;
        var adestacar = req.body.adestacar;
        var nividiomas = req.body.nividiomas;
        var fechadisp = req.body.fechadisp;
        //call the create function for our database
        mongoose.model('Player').create({
		        id: id,
            nombre : nombre,
            responsable : responsable,
            fechaentrev : fechaentrev,
            fechaentrada : fechaentrada,
            seleccionado : seleccionado,
            dni : dni,
            fechanac : fechanac,
            sexo : sexo,
            puntualidad : puntualidad,
            presentacion : presentacion,
            puestoaprop : puestoaprop,
            adestacar : adestacar,
            nividiomas : nividiomas,
            fechadisp : fechadisp
        }, function (err, player) {
              if (err) {
                  res.send("There was a problem adding the information to the database.");
              } else {
                  //Blob has been created
                  console.log('POST creating new player: ' + player);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("players");
                        // And forward to success page
                        res.redirect("/players");
                    },
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(player);
                    }
                });
              }
        })
    });

/* GET New Player page. */
router.get('/new', function(req, res) {
    res.render('players/new', { title: 'Add New Form' });
});

// route middleware to validate :id exist  in db
router.param('id', function(req, res, next, id) {
    //console.log('validating ' + id + ' exists');
    //find the ID in the Database
    mongoose.model('Player').findById(id, function (err, player) {
        //if it isn't found, we are going to repond with 404
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        //if it is found we continue on
        } else {
            //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
            //console.log(player);
            // once validation is done save the new item in the req
            req.id = id;
            // go to the next thing
            next();
        }
    });
});

//Now we need to GET an individual player to display it.
router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Player').findById(req.id, function (err, player) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + player._id);
 //       var blobdob = blob.dob.toISOString();
 //       blobdob = blobdob.substring(0, blobdob.indexOf('T'))
        res.format({
          html: function(){
                res.render('players/show', {
         //       "blobdob" : blobdob,
                "player" : player
              });
          },
          json: function(){
              res.json(player);
          }
        });
      }
    });
  })

      // Get our REST or form values. These rely on the "name" attributes
  .put(function(req, res) {
	var id = req.body.id;
    var nombre = req.body.nombre;
    var responsable = req.body.responsable;
    var fechaentrev = req.body.fechaentrev;
    var fechaentrada = req.body.fechaentrada;
    var seleccionado = req.body.seleccionado;
    var dni = req.body.dni;
    var fechanac = req.body.fechanac;
    var sexo = req.body.sexo;
    var puntualidad = req.body.puntualidad;
    var presentacion = req.body.presentacion;
    var puestoaprop = req.body.puestoaprop;
    var adestacar = req.body.adestacar;
    var nividiomas = req.body.nividiomas;
    var fechadisp = req.body.fechadisp;

   //find the document by ID
        mongoose.model('Player').findById(req.id, function (err, player) {
            //update it
            player.update({
			    id: id,
                nombre : nombre,
                responsable : responsable,
                fechaentrev : fechaentrev,
                fechaentrada : fechaentrada,
                seleccionado : seleccionado,
                dni : dni,
                fechanac : fechanac,
                sexo : sexo,
                puntualidad : puntualidad,
                presentacion : presentacion,
                puestoaprop : puestoaprop,
                adestacar : adestacar,
                nividiomas : nividiomas,
                fechadisp : fechadisp
            }, function (err, blobID) {
              if (err) {
                  res.send("There was a problem updating the information to the database: " + err);
              }
              else {
                      //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
                      res.format({
                          html: function(){
                               res.redirect("/players/" + player._id);
                         },
                         //JSON responds showing the updated values
                        json: function(){
                               res.json(player);
                         }
                      });
               }
            })
        });
  })

  //DELETE a player by ID
  .delete(function (req, res){
    //find player by ID
    mongoose.model('Player').findById(req.id, function (err, player) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            player.remove(function (err, player) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + player._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/players");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : player
                               });
                         }
                      });
                }
            });
        }
    });
})


module.exports = router;
