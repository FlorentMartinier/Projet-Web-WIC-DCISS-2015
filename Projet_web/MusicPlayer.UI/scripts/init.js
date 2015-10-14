var cont =  new MusicPlayerController();
var view = new MusicPlayerView();

var listeVotes = [];

$(document).ready(function() {

    var user = $.cookie("user");

    if (user != null ) {
     $("#btnCreate").hide();
     $("#btnConnexion").hide();
     $("#welcomeMessage").html("<p>Vous êtes connecté en tant que "+user+" </p>");  
     $("#welcomeMessage").show();
    }
    else {
          $("#welcomeMessage").hide();
          $("#btnDeconnexion").hide();
    }
  
    // réglage du volume
    var startVolume = $.cookie('volume');

    if (startVolume == null) {
        startVolume = 75;
    }

    $("#sliderVolume").slider({
        orientation: "vertical",
        value: startVolume,
        min: 0,
        max: 100,
        change: function(event, ui ) {

            $.cookie('volume', ui.value);

            changeIconeVolume();

            DZ.player.setVolume(ui.value);

        }
    });

    // player invisible
    DZ.init({
        appId : '155481',
        channelUrl : 'http://YOUR_DOMAIN/channel.html',
        player : {
            //container: 'dz-player',
            //width : 800,
            //height : 300,
            onload : function(){

                changeIconeVolume();

                DZ.player.setVolume(startVolume);

                // init du contrôleur
                cont.updatePlaylist();

            }
        }
    });


    DZ.Event.subscribe('current_track', function(evt_name){
        cont.currentTrackEnded = true;
    });

    DZ.Event.subscribe('track_end', function(evt_name){
        cont.currentTrackEnded = true;
    });

    // choix du design
    view.design.initElements();

    var design = $.cookie('design');

    if (design == "design1") {
        view.design.design1();
    }
    else if (design == "design2") {
        view.design.design2();
    }
    else {
        view.design.design3();
    }

});

function changeIconeVolume() {

    var value = $("#sliderVolume").slider("option", "value");

    if (value < 33) {
        $("#iconeVolume").html('<i class="fa fa-volume-off fa-2x"></i>');
    }
    else if (value < 66) {
        $("#iconeVolume").html('<i class="fa fa-volume-down fa-2x"></i>');
    }
    else {
        $("#iconeVolume").html('<i class="fa fa-volume-up fa-2x"></i>');
    }

}