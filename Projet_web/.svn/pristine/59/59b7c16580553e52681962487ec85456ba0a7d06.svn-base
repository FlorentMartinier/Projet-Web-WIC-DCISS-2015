var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
	//password : 'd974bbac',
    //password : 'root',
    password : '',
    database : 'catalogue_musique',
    debug    :  false
});

function handle_database(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT titre, album, artiste, cover FROM chanson",function(err,rows){
            connection.release();
            if(!err) {
				res.write("<table>");
					res.write("<tr>");
						res.write("<th></th>");
						res.write("<th>titre</th>");
						res.write("<th>artiste</th>");
						res.write("<th>album</th>");
						res.write("<th>vote</th>");
					res.write("</tr>");
				for (var i=0; i<rows.length; i++){
					res.write ("<tr>");
						res.write ("<td><img src='"+rows[i].cover+"'/></td>");
						res.write ("<td>"+rows[i].titre+"</td>");
						res.write ("<td>"+rows[i].artiste+"</td>");
						res.write ("<td>"+rows[i].album+"</td>");
						res.write ("<td></td>");
					res.write ('</tr>');
				}
				res.write("</table>");
				res.end();
            }           
        });
		

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);