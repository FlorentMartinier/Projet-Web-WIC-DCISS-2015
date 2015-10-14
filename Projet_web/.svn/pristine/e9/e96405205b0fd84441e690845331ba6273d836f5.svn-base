function Design() {

    this.ruban;
    this.h3;
    this.h2;
    this.footer;
    this.metal;
    this.autre;
    this.pasMetal;
    this.btnCatalog;
    this.btnSearch;
    this.btnConnexion;
    this.btnDeconnexion;
    this.btnCreate;

}

Design.prototype.initElements = function() {

    this.ruban = document.getElementsByClassName("ruban");
    this.h3 = document.getElementsByTagName("h3");
    this.h2 = document.getElementsByTagName("h2");
    this.footer = document.getElementsByTagName("footer");
    this.metal = document.getElementById("metal");
    this.autre = document.getElementById("autre");
    this.pasMetal = document.getElementById("pasMetal");
    this.btnCatalog = document.getElementById("btnCatalog");
    this.btnSearch = document.getElementById("btnSearch");
    this.btnConnexion = document.getElementById("btnConnexion");
    this.btnDeconnexion = document.getElementById("btnDeconnexion");
    this.btnCreate = document.getElementById("btnCreate");

}

Design.prototype.design1 = function () {

    this.undoDesign3();

    document.body.style.backgroundImage = "url('images/background.jpg')";

    for (var i = 0; i < this.ruban.length; i++) {
        this.ruban[i].style.background = "#D2B48C";
    }
    for (var i = 0; i < this.h3.length; i++) {
        this.h3[i].style.fontFamily = "call_me_mayberegular";
        this.h3[i].style.color = "white";
    }
    for (var i = 0; i < this.h2.length; i++) {
        this.h2[i].style.fontFamily = "call_me_mayberegular";
        this.h2[i].style.color = "black";
    }
    for (var i = 0; i < this.footer.length; i++) {
        this.footer[i].style.background = "#A0522D";
    }

    this.btnCatalog.style.background = "#A0522D";
    this.btnSearch.style.background = "#A0522D";
    this.btnConnexion.style.background = "#A0522D";
    this.btnCreate.style.background = "#A0522D";
    this.btnDeconnexion.style.background = "#A0522D";
	
	this.btnCatalog.style.borderRadius = "30px";
	this.btnSearch.style.borderRadius = "30px";
	this.btnConnexion.style.borderRadius = "30px";
	this.btnCreate.style.borderRadius = "30px";
	this.btnDeconnexion.style.borderRadius = "30px";


    this.btnCatalog.onmouseover = function () {
        this.style.background = "#D2B48C";
    };
    this.btnSearch.onmouseover = function () {
        this.style.background = "#D2B48C";
    };
    this.btnCatalog.onmouseout = function () {
        this.style.background = "#A0522D";
    };
    this.btnSearch.onmouseout = function () {
        this.style.background = "#A0522D";
    };
    this.btnConnexion.onmouseover = function () {
        this.style.background = "#D2B48C";
    };
    this.btnCreate.onmouseover = function () {
        this.style.background = "#D2B48C";
    };
    this.btnConnexion.onmouseout = function () {
        this.style.background = "#A0522D";
    };
    this.btnCreate.onmouseout = function () {
        this.style.background = "#A0522D";
    };
    this.btnDeconnexion.onmouseover = function () {
        this.style.background = "#D2B48C";
    };
    this.btnDeconnexion.onmouseout = function () {
        this.style.background = "#A0522D";
    };

    $.cookie('design', 'design1', {expires: 7});

    this.metal.style.display = "inline";
    this.autre.style.display = "inline";
    this.pasMetal.style.display = "none";

};

Design.prototype.design2 = function () {

    $.cookie('design', 'design2', {expires: 7});

    this.undoDesign3();

    document.body.style.backgroundImage = "url('images/metal.jpg')";

    for (var i = 0; i < this.ruban.length; i++) {
        this.ruban[i].style.background = "red";
    }

    for (var i = 0; i < this.h3.length; i++) {
        this.h3[i].style.fontFamily = "disgusting_behaviorregular";
        this.h3[i].style.color = "black";
    }

    for (var i = 0; i < this.h2.length; i++) {
        this.h2[i].style.fontFamily = "disgusting_behaviorregular";
        this.h2[i].style.color = "red";
    }

    for (var i = 0; i < this.footer.length; i++) {
        this.footer[i].style.background = "red";
    }

    this.btnCatalog.style.background = "#FF0000";
    this.btnSearch.style.background = "#FF0000";
    this.btnConnexion.style.background = "#FF0000";
    this.btnCreate.style.background = "#FF0000";
    this.btnDeconnexion.style.background = "#FF0000";

	this.btnCatalog.style.borderRadius = "30px";
	this.btnSearch.style.borderRadius = "30px";
	this.btnConnexion.style.borderRadius = "30px";
	this.btnCreate.style.borderRadius = "30px";
	this.btnDeconnexion.style.borderRadius = "30px";

    this.btnCatalog.onmouseover = function () {
        this.style.background = "#FF6347";
    };
    this.btnSearch.onmouseover = function () {
        this.style.background = "#FF6347";
    };
    this.btnCatalog.onmouseout = function () {
        this.style.background = "#FF0000";
    };
    this.btnSearch.onmouseout = function () {
        this.style.background = "#FF0000";
    };
    this.btnConnexion.onmouseover = function () {
        this.style.background = "#FF6347";
    };
    this.btnCreate.onmouseover = function () {
        this.style.background = "#FF6347";
    };
    this.btnConnexion.onmouseout = function () {
        this.style.background = "#FF0000";
    };
    this.btnCreate.onmouseout = function () {
        this.style.background = "#FF0000";
    };
    this.btnDeconnexion.onmouseout = function () {
        this.style.background = "#FF0000";
    };
    this.btnDeconnexion.onmouseover = function () {
        this.style.background = "#FF6347";
    };

    this.metal.style.display = "none";
    this.pasMetal.style.display = "inline";
    this.autre.style.display = "inline";

};

Design.prototype.design3 = function () {

    $.cookie('design', 'design3', {expires: 7});

    $("body").css("background", "url(\"images/shattered.png\") repeat");
    $("body").css("color", "#334");
    $("body").css("margin", "0");

    $("#player, #playlist, #InfoMsg").css("background", "url(\"images/skulls.png\") repeat");
    $("#player, #playlist, #InfoMsg").css("border", "1px solid #a7aab9");
    $("#player, #playlist, #InfoMsg").css("border-radius", "6px");

    $(".fond").hide();
    $(".titreRub").remove();
    $("#player").prepend("<div class=\"titreRub\">A l'ecoute actuellement</div>");
    $("#playlist").prepend("<div class=\"titreRub\">Liste de lecture</div>");

    $(".titreRub").css("width", "100%");
    $(".titreRub").css("margin-top", "15px");
    $(".titreRub").css("margin-bottom", "15px");
    $(".titreRub").css("height", "32px");
    $(".titreRub").css("background-color", "#FaFaFd");
    $(".titreRub").css("border-top", "1px solid #c7cad9");
    $(".titreRub").css("border-bottom", "1px solid #c7cad9");
    $(".titreRub").css("font-variant", "small-caps");
    $(".titreRub").css("font-size", "25px");
    $(".titreRub").css("font-weight", "bold");
    $(".titreRub").css("font-family", "Helvetica");
    $(".titreRub").css("padding-top", "2px");
    $(".titreRub").css("text-align", "center");

    $("#title").css("background", "url(\"images/office.png\") repeat");
    $("#title").css("margin-bottom", "20px");
    $("#title").css("border-top", "1px solid black");
    $("#title").css("border-bottom", "1px solid black");

    $("#title h2").css("color", "#E7E8E8");
    $("#title h2").css("font-family", "roboto");
    $("#title h2").css("font-variant", "small-caps");
    $("#title h2").css("padding-top", "13px");
    $("#title h2").css("padding-bottom", "4px");
    $("#title h2").css("font-size", "42px");
    $("#title h2").css("text-shadow", "1px 1px #B5BCE5");

    $("#title h2 i").css("background-color", "#E6E7ED");
    $("#title h2 i").css("border", "1px solid #B5BCE5");
    $("#title h2 i").css("border", "1px solid #B5BCE5");
    $("#title h2 i").css("color", "#1B1B1B");
    $("#title h2 i").css("padding", "2px 5px 0px 5px");
    $("#title h2 i").css("border-top-left-radius", "14px");
    $("#title h2 i").css("border-bottom-right-radius", "14px");

    $("#btnCatalog, #btnSearch,#btnConnexion, #btnCreate, #btnDeconnexion,  .closeModal").css("background-color", "#696F8E")
    $("#btnCatalog, #btnSearch,#btnConnexion, #btnCreate, #btnDeconnexion,  .closeModal").css("border", "1px solid #8F95B7");
    $("#btnCatalog, #btnSearch,#btnConnexion, #btnCreate, #btnDeconnexion,  .closeModal").css("border-radius", "3px");
    $("#btnCatalog, #btnSearch,#btnConnexion, #btnCreate, #btnDeconnexion,  .closeModal").css("box-shadow", "1px 1px 3px #999FbE");
    $("#btnCatalog, #btnSearch,#btnConnexion, #btnCreate, #btnDeconnexion, .closeModal").css("box-shadow", "1px 1px 3px #999FbE");


    $("#btnCatalog, #btnSearch, #btnConnexion, #btnCreate, #btnDeconnexion").hover(function () {
        $(this).css("background-color", "#838AAD");
    }, function () {
        $(this).css("background-color", "#696F8E")
    });

    $("#progressBarInt").css("background-color", "#989EBC");

    $("#modalContentCatalog, #modalContentSearch, #modalCreateProfile, #modalLogin").css("border-radius", "7px");
    $("#modalContentCatalog, #modalContentSearch, #modalCreateProfile, #modalLogin").css("border", "1px solid #a7aab9");


    $("#modal h4").css("color", "#334");
    $("#modal h4").css("margin-left", "20px");
    $("#modal h4").css("margin-right", "20px");
    $("#modal h4").css("padding-bottom", "4px");
    $("#modal h4").css("border-bottom", "1px solid #334");
    $("#modal h4").css("font-size", "20px");

    $("footer").css("background", "url(\"images/office-lt.png\") repeat");
    $("footer").css("border", "none");
    $("footer").css("border-radius", "0");
    $("footer").css("border-top", "1px solid #333");
    $("footer").css("border-bottom", "1px solid #333");

    $("#metal").show();
    $("#pasMetal").show();
    $("#autre").hide();

};

Design.prototype.undoDesign3 = function () {

    $(".fond").show();
    $(".titreRub").hide();

    $("#player, #playlist, #InfoMsg").css("border", "2px solid black");
    $("#player, #playlist, #InfoMsg").css("border-radius", "10px");

    $("#player, #playlist").css("background", "white");

    $("#title").css("background", "none");
    $("#title").css("border-bottom", "none");

    $("#btnCatalog, #btnSearch,#btnDeconnexion,#btnCreate,#btnConnexion").css("border", "1px solid black");
    $("#btnCatalog, #btnSearch,#btnDeconnexion,#btnCreate,#btnConnexion").css("border-radius", "30px");
    $("#btnCatalog, #btnSearch,#btnDeconnexion,#btnCreate,#btnConnexion").css("box-shadow", "0px 1px 3px #666666");

    $("#btnCatalog, #btnSearch, #btnConnexion, #btnCreate, #btnDeconnexion").unbind();

    $("#title h2").css("text-shadow", "none");

    $("#title h2 i").css("background-color", "transparent");
    $("#title h2 i").css("border", "none");

    $("#title h2").css("font-size", "50px");

    $("footer").css("border", "2px solid #666666");
    $("footer").css("border-radius", "30px");

};