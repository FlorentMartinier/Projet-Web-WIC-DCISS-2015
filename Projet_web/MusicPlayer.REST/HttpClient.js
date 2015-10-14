
var http = require('http');
var URL  = require('url');

var HttpClient = module.exports = function () {

    this.GET = function(url, track, callback) {
        this.doRequest('GET', url, null, track, callback);
    }; // method

    this.PUT = function (url, track, data, callback) {
        this.doRequest('PUT', url, data, track, callback);
    }; // method

    this.DELETE = function (url, track, callback) {
        this.doRequest('DELETE', url, null, track, callback);
    }; // method

    this.doRequest = function(verb, url, data, track, callback) {

        var options = {
            hostname: URL.parse(url).hostname,
            port:     URL.parse(url).port,
            path:     URL.parse(url).path,
            method:   verb,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': (data)? data.length: 0
            }
        };

        var req = http.request(options, function(res) {

            var data = "";
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                res.body = data;
                callback(res, track);
            });

        }); // async

        req.write( (data)? data: '');
        req.end();

    }; // method

};