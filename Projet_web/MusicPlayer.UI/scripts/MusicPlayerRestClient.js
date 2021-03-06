function MusicPlayerRestClient(){

    // récupération de l'adresse du serveur (sinon ça ne marche qu'en accédant au site depuis le pc qui héberge le serveur !)
    var url = window.location.href.split("/")[2].split(":")[0];
    
    var CREATE_USER      = 'http://' + url + ':3000/users';
    var CONNEXION_USER      = 'http://' + url + ':3000/users/connection';
    var CURRENT_TRACK_URI   = 'http://' + url + ':3000/playlist/currentTrack';
    var PROPOSED_TRACKS_URI = 'http://' + url + ':3000/playlist/proposedTracks';
    var VOTE_TRACK_URI      = 'http://' + url + ':3000/playlist/voteTrack';
    var CATALOG_URI         = 'http://' + url + ':3000/catalog/';

    this.getCurrentTrack = function() {
        return this.doRequest('GET', CURRENT_TRACK_URI, null, false);
    };

    this.getProposedTracks = function () {
        return this.doRequest('GET', PROPOSED_TRACKS_URI, null, false);
    };

    this.proposeTrack = function(trackID, button, callback) {
        return this.doRequest('PUT', PROPOSED_TRACKS_URI + "/" + trackID, null, true, button, callback);
    }
    
    this.voteTrack = function(trackID, button, callback) {
        return this.doRequest('PUT', VOTE_TRACK_URI + "/" + trackID, null, true, button, callback);
    };
	
    this.getCatalog = function() {
        return this.doRequest('GET', CATALOG_URI, null, true);
    };
    
    this.createUser = function(login, password, callback) {
        this.doRequest('PUT', CREATE_USER + "?login=" + login+"&password="+password, null, true, null, callback);
    };
    
     this.connection = function(login, password) {
       var user = this.doRequest('GET', CONNEXION_USER + "?login=" + login+"&password="+password, null, true);
       return user;
    };

    this.doRequest = function(verb, url, data, async, button, callback) {

        var response = null;

        $.ajax({
            url:  url,
            type: verb,
            async: false,
            dataType: 'json',
            success: function(resp) {
                response = resp;
                if (callback != null) callback(button);
            },
            error: function(xhr) {
                response = "Error when " + verb + " " + url + " : " + xhr;
            }
        });

        return response;

    };

}