var express = require('express');
var app = express();
//var mysql = require('mysql');
//var myQuery ;
//var pid;
var bodyParser = require('body-parser');
var ps = require('ps-node');
var session = require('express-session')
var pool = require('./database')
var twit_scrapper = require('./scrapper')
var insta_scrapper = require('./insta_scrapper');


app.use(session({
  secret : '343ji43j4n3jn4jk3n' ,
 
}))




app.use(bodyParser.json());

app.use(express.static('public'));
var path = __dirname + '/views/';
//app.set('view engine' , 'pug')
app.get('/', function (req, res) {
 
   //res.render( 'index' );
   res.sendFile(path + "front_page.html");
   req.session.counter = 0 ;
   req.session.timestamp = 0 ;

   console.log("the session id is "  + req.sessionID);
   console.log("the counter is "  + req.session.counter);
})










function runQuery(req , res ){
  
 // Connect to MySQL database.
 //var connection = getMysqlConnection();
 //connection.connect(); 
 query_text = "SELECT * FROM tweet WHERE query="+ "'" + req.session.query + "'" + "AND process_id =" + "'" + req.sessionID + "'" + "AND timestamp >" + "'" + req.session.timestamp + "'"  +"ORDER BY created_at DESC ";
 //console.log(query_text);

 // Do the query to get data.
 pool.query(query_text, function(err, rows, fields) {
  if (err) {
   console.log(err)
  } else {
  try {
  console.log("timestamp value is  " + rows[0].timestamp)
  req.session.timestamp = rows[0].timestamp;
  // Send the tweets back to the ajax response
  return res.send(rows);
}
catch(error){
   return res.send('timeout')
   
  }
  }
 
});




}

app.post('/search', function (req, res) {
  if(req.session.counter >= 10){
   return res.send("session_timeout")
  }

  else{
  request = {
    query:req.body.query
    };
    req.session.query = request['query'];
    console.log( request['query'] + "is received") ;
    console.log( "session id is " + req.sessionID) ;
    

   twit_scrapper(req , pool , req.sessionID , req.session.query);
   try{
   insta_scrapper(pool , req.sessionID , req.session.query );
   }
   catch(error){
        console.log( error + "insta error caught in main app ");
   }
  


   console.log("function over")
   return res.send("script started") }

}) ;


app.get('/view_tweets', function (req, res) {
  console.log("receiving control");

   
   //tweet=[{'User_name':'Mufaddal' , 'tweet':'This is a test tweet'}];

  runQuery(req ,res );
})





var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})