function MusicPlayerView() {

    this.design = new Design();

    this.refreshCurrentTrack = function(track) {

        this.loadingCurrentTrack();

        if (track == null && $("#currentTrack #idCurrentTrack").text() != "" ) {

            $("#CTCover, #CTArtistName, #CTTitle, #CTAlbumName, #CTRelease, #CTGenre").fadeOut(250, function() {

                $("#currentTrack #idCurrentTrack").text("");

                $("#currentTrack #CTCover").html("");
                $("#currentTrack #CTArtistName").html("");
                $("#currentTrack #CTTitle").html("La radio ne diffuse pas de musique pour le moment...");
                $("#currentTrack #CTAlbumName").html("Vous pouvez être le premier à proposer une ou plusieurs chansons à partir du catalogue ou de la recherche !");
                $("#currentTrack #CTRelease").html("");
                $("#currentTrack #CTGenre").html("");

                $("#progressBarInfo").html("");

                $("#CTCover, #CTArtistName, #CTTitle, #CTAlbumName, #CTRelease, #CTGenre").fadeIn(250);

            });

        }
        else if (track.id != $("#currentTrack #idCurrentTrack").text()) {

            var date = track.release.split("-")

            $("#CTCover, #CTArtistName, #CTTitle, #CTAlbumName, #CTRelease, #CTGenre").fadeOut(250, function() {

                $("#currentTrack #idCurrentTrack").text(track.id);


                $("#currentTrack #CTCover").html("<img class=\"cover\" src=\"" + track.cover + "\" />");
                $("#currentTrack #CTArtistName").html(track.artistName);
                $("#currentTrack #CTTitle").html(track.title);
                $("#currentTrack #CTAlbumName").html(" Album : " + track.albumName);

                $("#currentTrack #CTRelease").html("(" + date[0] + ")");
                $("#currentTrack #CTGenre").html("Genre : " + track.genres);

                $("#CTCover, #CTArtistName, #CTTitle, #CTAlbumName, #CTRelease, #CTGenre").fadeIn(250);

            });

        }

        $("#currentTrack .loading").hide();

    };

    this.refreshProposedTracks = function(tracks, oldTracks, firstLoading) {

        $("#proposedTracks table").html("<tr><th></th><th>Artiste</th><th>Titre</th><th class=\"tdDuree\">Durée</th><th class=\"tdVotes\">Votes</th><th class=\"tdVoter\">Voter</th></tr>");

        var button;
        var min;
        var sec;
        var oldPos;

        for (var i = 0; tracks != null && i < tracks.length; i++) {

            if ($.inArray(parseInt(tracks[i].id), listeVotes) == -1) {
                button = "<td class=\"tdVoter addButton center\"><i onClick=\"cont.vote(" + tracks[i].id + ", this);\" class=\"fa fa-thumbs-o-up fa-2x\"></i></td>";
            }
            else {
                button = "<td class=\"tdVoter center\"><i class=\"fa fa-check fa-2x\"></i></td>";
            }

            min = ("0" + (Math.trunc(tracks[i].duration/60))).slice(-2);
            sec = ("0" + (tracks[i].duration - (min*60))).slice(-2);

            $("#proposedTracks table").append(
            "<tr>" +
                "<td class=\"center tdCover\"><img class=\"cover\" src=\"" + tracks[i].cover + "\" /></td>" +
                "<td>" + tracks[i].artistName + "</td>" +
                "<td class=\"tdTitre\"> " + tracks[i].title + " <i class=\"up fa fa-arrow-circle-up fa-lg\"></i><i class=\"plus fa fa-plus-circle fa-lg\"></i></td>" +
                "<td class=\"tdDuree center\"> " + min + ":" + sec + "</td>" +
                "<td class=\"tdVotes center\"> " + tracks[i].nbVotes + "</td>" +
                button +
            "</tr>");

            // animation si une piste est montée ou a été ajoutée
            if (!firstLoading) {

                oldPos = $.inArray(tracks[i].id, oldTracks);

                if (oldPos == -1) { // piste ajoutée
                    this.animateTrackAdded($("#proposedTracks table tr").last());
                }
                else if (oldPos > i && oldTracks.length <= tracks.length)  { // piste montée
                    this.animateTrackVoted($("#proposedTracks table tr").last());
                }

            }

        }

        this.endLoadProposedTrack();

    };

    this.animateTrackAdded = function(trackTr) {

        trackTr.children("td").css("background-color", "#AEE5A9");
        trackTr.children("td").children(".plus").show();

        setTimeout(function() {
            trackTr.children("td").animate({ backgroundColor: trackTr.css("background-color")}, 1700);
            trackTr.children("td").children(".plus").fadeOut(1700);
        }, 4000);

    };

    this.animateTrackVoted = function(trackTr) {

        trackTr.children("td").css("background-color", "#B4D5E8");
        trackTr.children("td").children(".up").show();

        setTimeout(function() {
            trackTr.children("td").animate({ backgroundColor: trackTr.css("background-color")}, 1700);
            trackTr.children("td").children(".up").fadeOut(1700);
        }, 4000);

    };

    this.loadingCurrentTrack = function() {
        $("#currentTrack .loading").show();
    };

    this.loadingProposedTracks = function() {
        $("#playlist .loading").show();
    };

    this.endLoadProposedTrack = function() {
        $("#playlist .loading").hide();
    };

    this.loadingSearch = function() {
        $("#modalContentSearch .loading").show();
        $("#modalContentSearch .result").hide();
    };

    this.loadingCatalog = function() {
        $("#modalContentCatalog .loading").show();
        $("#modalContentCatalog .result").hide();
    };

    this.setProgressBar = function(pos, tot) {

        pos = Math.trunc(pos);

        var minPos = Math.trunc(pos/60);
        var secPos = pos - (minPos*60);

        var minTot = Math.trunc(tot/60);
        var secTot = tot - (minTot*60);

        $("#progressBarInfo").html(("0" + minPos).slice(-2) + ":" + ("0" + secPos).slice(-2) + " / " + ("0" + minTot).slice(-2) + ":" + ("0" + secTot).slice(-2));
        $("#progressBarInt").css("width", + pos/tot*100 + "%");

    };

    this.setSearchResult = function(tracks) {

        $("#modalContentSearch .emptyMessage").empty();
        $("#modalContentSearch .result").html("<table class=\"tabListChansons\"><tr><th></th><th>Artiste</th><th>Titre</th><th class=\"tdDuree\">Durée</th><th class=\"tdPropose\">Proposer</th></tr></table>");

        var min;
        var sec;

        for (var i = 0; i < tracks.length && i < 18; i++) {

            min = ("0" + (Math.trunc(tracks[i].duration/60))).slice(-2);
            sec = ("0" + (tracks[i].duration - (min*60))).slice(-2);

            $("#modalContentSearch .result table").append(
            "<tr>" +
                "<td class=\"center tdCover\"><img src=\"" + tracks[i].album.cover + "\" /></td>" +
                "<td>" + tracks[i].artist.name + "</td>" +
                "<td>" + tracks[i].title + "</td>" +
                "<td class=\"tdDuree center\"> " + min + ":" + sec + "</td>" +
                "<td class=\"center tdPropose\"><span class=\"addButton\"><i onClick=\"cont.proposeTrack('" + tracks[i].id + "', this);\" class=\"fa fa-plus fa-lg\"></i></span></td>" +
            "</tr>");

        }


        if(tracks.length == 0){
            $("#modalContentSearch .emptyMessage").append("<br /><br /><p class=\"center\">Aucune piste trouvée pour cette recherche</p>" );
        }

        $("#modalContentSearch .loading").hide();
        $("#modalContentSearch .result").fadeIn(300);

    };

    this.displayCatalog = function(catalog) {

        $("#modalContentCatalog .result").html("<table class=\"tabListChansons\"><tr><th class=\"tdGenre\"></th><th></th><th>Artiste</th><th>Titre</th><th>Durée</th><th>Proposer</th></tr></table>");

        var min;
        var sec;

        for (var i = 0; i < catalog.length; i++){

            min = ("0" + (Math.trunc(catalog[i].duration/60))).slice(-2);
            sec = ("0" + (catalog[i].duration - (min*60))).slice(-2);

            $("#modalContentCatalog .result table").append(
            "<tr>" +
                "<td class=\"tdGenre\">" + catalog[i].genres + "</td>" +
                "<td class=\"center tdCover\"><img src=\"" + catalog[i].cover + "\" /></td>" +
                "<td>" + catalog[i].artiste + "</td>" +
                "<td class=\"tdTitre\">" + catalog[i].titre + "</td>" +
                "<td class=\"tdDuree center\"> " + min + ":" + sec + "</td>" +
                "<td class=\"center tdPropose\"><span class=\"addButton\"><i onClick=\"cont.proposeTrack('" + catalog[i].id + "', this);\" class=\"fa fa-plus fa-lg\"></i></span></td>" +
            "</tr>");

        }

        this.selectGenreCatalog();

        $("#modalContentCatalog .loading").hide();
        $("#modalContentCatalog .result").fadeIn(300);

    };

    this.loadingButton = function(button, lg) {

        if (!lg) {
            button.html('<i class="fa fa-spinner fa-spin"></i>');
        }
        else {
            button.html('<i class="fa fa-spinner fa-spin fa-2x"></i>');
        }
        button.removeClass("addButton");

    };

    this.disableButton = function(button, lg) {

        if (!lg) {
            button.html('<i class="fa fa-check"></i>');
        }
        else {
            button.html('<i class="fa fa-check fa-2x"></i>');
        }

    };

    this.displayInfoMsg = function(message) {

        $("#InfoMsg #info").text(message);
        $("#InfoMsg").animate({marginBottom: "3px"}, 1000);

        setTimeout(function() {
            $("#InfoMsg").animate({marginBottom: "-120px"}, 1000);
        }, 8000);

    };

    this.connectionUser = function(login) {

        $("#pseudoConnexion").val("");
        $("#passwordConnexion").val("");
        $("#modal").fadeOut();
        $("#modalLogin").fadeOut();
        $("#btnDeconnexion").show();
        $("#btnCreate").hide();
        $("#btnConnexion").hide();

        // Affichage du message de bienvenue
        $("#welcomeMessage").html("<p>Vous êtes connecté en tant que "+login+" </p>");
        $("#welcomeMessage").show();

    };

    this.creationUser = function(login) {

        view.displayInfoMsg("Votre compte a bien été enregistré. Vous êtes connecté !");
        $("#modalCreateProfile").fadeOut();

        this.connectionUser(login);

    };

    this.selectGenreCatalog = function() {

        var i = 0;

        var val = $("#selectGenreCatalog").val();

        $("#modalContentCatalog .result table .tdGenre").each(function() {

            if (i != 0) {

                if (val == "tous" || $(this).text().toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    $(this).parent().show();
                }
                else {
                    $(this).parent().hide();
                }

            }

            i++;

        });

    };

}