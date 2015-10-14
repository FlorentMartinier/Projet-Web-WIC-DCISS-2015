
var User = module.exports = function () {

    this.id = 0;
    this.login = "";
    this.password = "";
 

    this.setID = function(id) {
        this.id = id;
    };

    this.setLogin = function(login) {
        this.login = login;
    };

    this.setPassword= function(password) {
        this.password = password;
    };

 

}