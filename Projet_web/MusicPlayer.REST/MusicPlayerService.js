
//Import pour faire fonctionner le service REST avec Node js///////////////////

var express    = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors       = require('cors');
var mysql      = require('mysql');
var Track      = require('./Track');
var User      = require('./User');


var app = express();
app.use(bodyParser.json());
app.use( cors() );
app.use(session({secret: 'session'}));


var lastSongLaunchTime = 0;

var currentTrack = null;

var proposedTracks = [];

///////////////////////////////////////////////////////////////////////////////


//Lancement du server node js//
var server = app.listen(3000, function () {
    console.log('Listening at http://localhost:%s', server.address().port);
});

// Credentials pour connexion db mysql !
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        //password : 'cegelec11',
        //password : 'root',
        database : 'musicplayer'
 });

connection.connect();

////////////////////////////////  Traitement des appels au service REST  ////////////////////////////////////////////////////////////////////////////

/* Recuperation de la piste courante -- GET --- /playlist/proposedTrack */
app.get('/playlist/currentTrack', function (request, response) {
    
   // console.log("Recu GET /playlist/currentTrack" );


    // mise à jour de la position de lecture de la piste
    if (currentTrack != null) {
        currentTrack.position = (Date.now() - lastSongLaunchTime) / 1000;
    }

    response.json(currentTrack);

});

/* Recuperation des pistes proposees -- GET --- /playlist/proposedTrack*/
app.get('/playlist/proposedTracks', function (request, response) {

   // console.log("Recu GET /playlist/proposedTracks" );

    response.json(proposedTracks);

});

/* Consultation du catalogue -- GET --- /catalog */
app.get('/catalog', function (request, response) {
    
    // console.log("Recu GET /catalog" );

    connection.query('SELECT * FROM tracks ORDER BY titre', function(err, rows, fields) {

        if (err) {
            console.error(err);
            response.json(-1);
        }
        else {
            response.json(rows);
        }

    });

});

/* Proposition d'une piste -- PUT --- /playlist/proposedTrack/:idTrack */
app.put('/playlist/proposedTracks/:idTrack', function (request, response) {

    var idTrack = request.params.idTrack;

    console.log("Recu PUT /playlist/proposedTracks - Track = " + idTrack);

    var track = new Track();

    var callback = function(track) {

        // si c'est la premiere piste proposee
        if (currentTrack == null) {

            currentTrack = track;

            // on lance la boucle qui vérifiera quand changer de chanson
            lastSongLaunchTime = Date.now();

            // pour les chansons de moins de 10 sec, on s'assure de faire le changement de chanson avant
            var interval = (currentTrack.duration < 10)?(currentTrack.duration * 1000):10000;

            boucleChanson(interval);

        }
        // sinon on l'ajoute à proposedTracks
        else {
            proposedTracks.push(track);
        }

    }

    // si la piste n'est pas deja dans proposedTracks ou currentTrack
    var alreadyProposed = false;
    if (currentTrack != null && idTrack == currentTrack.id) {
        alreadyProposed = true;
    }
    else {
        for (var i = 0; i < proposedTracks.length; i++) {
            if (idTrack == proposedTracks[i].id) {
                alreadyProposed = true;
            }
        }
    }

    if (!alreadyProposed) {

        track.getInfosFromDB(idTrack, callback);
        response.json(1);

    }
    else {
        response.json(-1);
    }

});

/* Vote pour une musique -- PUT --- /playlist/vote/id */
app.put('/playlist/voteTrack/:idTrack', function (request, response) {

    var idTrack = request.params.idTrack;

    console.log("Recu PUT /playlist/vote/ - Track = " +idTrack);

    for (var i = 0; i < proposedTracks.length; i++) {

        // si c'est l'item recherche
        if (idTrack == proposedTracks[i].id) {

            // on prend en compte le vote
            proposedTracks[i].nbVotes++;

            // on remonte dans le tableau jusqu'à trouver un nb de votes plus important ou egal
            for (var j = i - 1; j >= 0 && proposedTracks[j].nbVotes < proposedTracks[i].nbVotes; j--) {}

            // on remonte l'item à cette position dans la tableau
            proposedTracks.splice(j + 1, 0, proposedTracks.splice(i, 1)[0]);

        }

    }

    response.json(1);

});

////////////////////////////////  Gestionnaire de sessions////////////////////////////////////////////////////////////

/* Création d'un user -- PUT --- /users/login=""&password=""*/
app.put('/users', function (request, response) {

    console.log("Recu PUT /users"+request.query.login+request.query.password);
    
    connection.query("INSERT INTO `musicplayer`.`users` (`login`, `password`)" + "VALUES (" + connection.escape(request.query.login) + "," + " " + connection.escape(request.query.password)  + ")", function(err,rows) {
            if (err) {
                console.error(err);
            }

     });
    response.json("ok");

});

/* Connexion d'un user, on verifie si le user existe et si le password est correct -- GET --- /users/login=""&password=""*/
app.get('/users/connection', function (request, response) {

   console.log("Recu GET /users/connection"+request.query.login+request.query.password);
 
   var newUser= new User();
   connection.query("SELECT * FROM users WHERE login=\"" + request.query.login+"\" and password=\""+request.query.password+"\"", function(err,rows) {
            if (err) {
                console.error(err);
            }
            else {
                if (rows.length !== 0){
                    newUser.id = rows[0].id;
                    newUser.login = rows[0].login;
                    newUser.password = rows[0].password;
                    //on met en session le user
                    request.session.user = newUser;
                    response.json(1);
                }else{
                   response.json(-1);
                }
            }
        });


});


function boucleChanson(interval) {

    setTimeout(function() {

        var continuer = true;

        // calcul du temps restant dans la chanson (en ms)
        var tempsRestant = currentTrack.duration * 1000 - (Date.now() - lastSongLaunchTime);

        console.log(((Date.now() - lastSongLaunchTime) / 1000) + " sec passées sur " + currentTrack.title);

        // si la chanson se termine (à 100ms près)
        if (tempsRestant <= 100) {

            console.log(currentTrack.title + " terminée");

            lastSongLaunchTime = Date.now();

            // on passe à la chanson suivante
            if (proposedTracks.length != 0) {
                currentTrack = proposedTracks.shift();
                console.log("Lancement de " + currentTrack.title);

                tempsRestant = currentTrack.duration * 1000 - (Date.now() - lastSongLaunchTime);
            }
            else {
                currentTrack = null;
                continuer = false;
                console.log("Plus rien à lire");
            }

        }

        if (continuer) {

            var interv = (tempsRestant < 10000)?tempsRestant:10000;

            boucleChanson(interv);

        }

    }, interval);

}

////////////////////////////////// Playlist non terminé //////////////////////////////////

/* récupére liste playlists d'un user -- get --- /users/:login/tracklists */

/*app.get('/users/:login/playlists', function (request, response) {
    response.json("ok");

});

/* ajout d'une playlist d'un user -- put --- /users/:login/playlists/:name */

/*app.put('/users/:login/playlists/:name', function (request, response) {
    
    response.json("ok");


});*/


/* supression d'une playlist d'un user -- delete --- /users/:login/playlists/:name */

/*app.delete('/users/:login/playlists/:id', function (request, response) {

    response.json("ok");

});*/


/* ajout d'une track à une playlist -- put --- /users/:login/playlists/:name */

/*app.put('/users/:login/playlists/:playlistId/tracks/:trackId', function (request, response) {

    response.json("ok");

});*/


/* supression d'une track d'une playlist -- delete --- /users/:login/playlists/:name */

/*app.delete('/users/:login/playlists/:playlistId/tracks/:trackId', function (request, response) {

    response.json("ok");

});*/
