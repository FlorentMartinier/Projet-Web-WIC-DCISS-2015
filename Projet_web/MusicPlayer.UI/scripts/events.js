
$(document).ready(function() {

    $(".closeModal").click(function() {
        $("#modal").fadeOut();
        $("#modalContentSearch").fadeOut();
        $("#modalContentCatalog").fadeOut();
        $("#modalCreateProfile").fadeOut();
        $("#modalLogin").fadeOut();


        $("body").css("overflow", "auto");
    });

    $("#searchArtist").keyup(function() {
        if ($(this).val().length > 2) {
            cont.searchTrack($(this).val());
        }
    });


    $("#test").click(function() {

    });

    $("#btnSearch").click(function() {

        window.scrollTo(0, 0);

        $("#modal").fadeIn();
        $("#modalContentSearch").fadeIn();

        // focus sur le champ de recherche
        $("#searchArtist").focus();

        $("body").css("overflow", "hidden");

        $("#searchArtist").keyup();
    });


    $("#btnCatalog").click(function() {

        window.scrollTo(0, 0);

        $("#modal").fadeIn();
        $("#modalContentCatalog").fadeIn();
        
        $("body").css("overflow", "hidden");

        cont.getCatalog();

    });
    
      
    $("#btnConnexion").click(function() {
        window.scrollTo(0, 0);

        $("#modal").fadeIn();
        $("#modalLogin").fadeIn();
        $("body").css("overflow", "hidden");   
    });
    
    
    $("#btnCreate").click(function() {
         window.scrollTo(0, 0);

        $("#modal").fadeIn();
        $("#modalCreateProfile").fadeIn();
        $("body").css("overflow", "hidden");  
    });
    
    

    $(".refreshCatalog").click(function() {
        cont.getCatalog();
    });

    DZ.Event.subscribe('player_position', function(pos){
        view.setProgressBar(pos[0], pos[1]);
    });
    
    
    
    /* connexion user  */
    $("#validateConnect").click(function() {

        var validator = true;

        $("#pseudoConnexion").css("border"," 1px solid threedface");
        $("#passwordConnexion").css("border"," 1px solid threedface");

        if ($("#pseudoConnexion").val() == "") {
            $("#pseudoConnexion").css("border"," 1px solid red");
            validator = false;
        }

        if ($("#passwordConnexion").val() == "") {
            $("#passwordConnexion").css("border"," 1px solid red");
            validator = false;
        }

        if (validator) {
            cont.connection($("#pseudoConnexion").val(), $("#passwordConnexion").val());
        }

    });
    
    $("#validateCreateAccount").click(function() {

         var validator = true;
         $("#confirmPassword").css("border"," 1px solid threedface");   
        $("#passwordCreate").css("border"," 1px solid threedface");
        $("#pseudoCreate").css("border"," 1px solid threedface");

        if ($("#pseudoCreate").val() == "") {
            $("#pseudoCreate").css("border"," 1px solid red");
            validator = false;
        }

        if ($("#passwordCreate").val() == "") {
            $("#passwordCreate").css("border"," 1px solid red");
            validator = false;
        }
        if($("#confirmPassword").val()==""){
            $("#confirmPassword").css("border"," 1px solid red");
            validator=false;
        }
        
        if(validator){
            if($("#confirmPassword").val()==$("#passwordCreate").val()){
                cont.createUser($("#pseudoCreate").val(),$("#passwordCreate").val());
            }else{
                view.displayInfoMsg("Vos deux mots de passe ne sont pas égaux");
                 $("#confirmPassword").css("border"," 1px solid red");
                 $("#passwordCreate").css("border"," 1px solid red");
            }

        }

    });
    
    $("#btnDeconnexion").click(function() {
        $("#welcomeMessage").hide();
        $("#btnDeconnexion").hide();
        $("#btnCreate").show();
        $("#btnConnexion").show();
        //clear du cookie
        $.removeCookie('user', { path: '/' });
        view.displayInfoMsg("Déconnexion effectuée avec succès");

    });


});