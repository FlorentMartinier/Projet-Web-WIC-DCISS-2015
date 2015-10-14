var httpClient = require('./HttpClient');
var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var http = new httpClient();

var connection = mysql.createConnection({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    //password : 'd974bbac',
    password : '',
    //password : 'cegelec11',
    //database : 'catalogue_musique',
    database : 'musicplayer'
});

var Track = module.exports = function () {

    var DEEZER_URL = 'http://api.deezer.com';

    this.id = 0;

    this.nbVotes = 0;

    this.title = "";
    this.artistName = "";
    this.albumName = "";
    this.cover = "";
    this.preview = "";
    this.genres = "";
    this.release = "";

    this.duration = 0;
    this.position = 0;

    this.setID = function(id) {
        this.id = id;
    };

    // comparaison de deux Tracks : deux tracks sont identiques si l'id est identique
    this.equals = function(otherTrack) {
        return (otherTrack.id == this.id);
    };

    this.getInfosFromDZ = function(id, callback, insert) {

        this.setID(id);

        http.GET(DEEZER_URL + "/track/" + id, this, function (response, track) {

            var body = JSON.parse(response.body);

            track.title = body.title;
            track.artistName = body.artist.name;
            track.cover = body.album.cover;
            track.albumName = body.album.title;
            track.preview = body.preview;
            track.duration = body.duration;

            track.genres = "";

            http.GET(DEEZER_URL + "/album/" + body.album.id, track, function (response2, track) {

                var body2 = JSON.parse(response2.body);

                track.release = body2.release_date;

                for (var i = 0; i < body2.genres.data.length; i++) {

                    track.genres += body2.genres.data[i].name;
                    if (i < body2.genres.data.length - 1) track.genres += ", ";

                }

                if (insert) {
                    track.insert();
                }

                if (callback != null) {
                    callback(track);
                }

            });

        });

    };

    this.getInfosFromDB = function(id, callback) {

        this.setID(id);

        var track = this;

        connection.query("SELECT * FROM tracks WHERE id = " + this.id, function(err,rows) {

            if (err) {
                console.error(err);
            }
            else {
                if (rows.length !== 0){

                    track.title = rows[0].titre;
                    track.artistName = rows[0].artiste;
                    track.cover = rows[0].cover;
                    track.albumName = rows[0].album;
                    track.preview = rows[0].preview;
                    track.duration = rows[0].duration;
                    track.genres = rows[0].genres;
                    track.release = rows[0].releaseDate;

                    if (callback != null) {
                        callback(track);
                    }

                }
                else {

                    // on récupère les infos sur deezer
                    track.getInfosFromDZ(track.id, callback, true);

                }
            }

        });

    };

    this.insert = function() {

        connection.query("INSERT INTO `musicplayer`.`tracks` (`id`, `titre`, `artiste`, `album`, `cover`, `preview`, `genres`, `releaseDate`, `duration`)" +
                            "VALUES (" + this.id + "," +
        " " + connection.escape(this.title) + "," +
        " " + connection.escape(this.artistName) + "," +
        " " + connection.escape(this.albumName) + "," +
        " " + connection.escape(this.cover) + "," +
        " " + connection.escape(this.preview) + "," +
        " " + connection.escape(this.genres) + "," +
        " " + connection.escape(this.release) + "," +
        " " + connection.escape(this.duration) + ")", function(err,rows) {

            if (err) {
                console.error(err);
            }

        });

    };

}