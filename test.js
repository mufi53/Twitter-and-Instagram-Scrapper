

//this file is of no use , it just has archvived code blocks that are now outdated





connection.query('INSERT INTO tweet (id, text , user_id , user_screen_name , user_name , created_at , retweets , likes , replies , profile_pic , query ,date ,media_image ) VALUES ?', [all_values], function(err,result) {
    if(err) {
       console.log("opps record not inserted")
    }
   else {
    console.log("element inserted")
    }
  });
  // search code
  if(pid){
    kill(pid);
    console.log(pid + " has been killed");
  }
  
  var spawn= require('child_process').spawn;
  var py = spawn('python3', ['twit_scrap.py']);
  pid = py.pid;
  var py_response = ""
  
    request = {
      query:req.body.query
      };
    console.log( request['query'] + "is received") ;
    myQuery = request['query']
     
    py.stdout.on('data', function(data){
        py_response += data.toString();
        console.log(py_response)
       
        
      });
      py.stdout.on('end', function(){
       
        
      });
  
    py.stdin.write(JSON.stringify(request['query']) , function(err){
    
    py.stdin.end();
  
    
    
    
    });
  
  
  
    return res.send( request['query']);
     //console.log(response);
     //res.end();  


    // module.exports code 

     module.exports = {
      run_scrapper : function (query){
      setInterval( function(){scrapper(query)} , 5000);
  
      }
  };
  

  // add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))



var kill = function (pid, signal, callback) {
  signal   = signal || 'SIGKILL';
  callback = callback || function () {};
  var killTree = true;
  if(killTree) {
      psTree(pid, function (err, children) {
          [pid].concat(
              children.map(function (p) {
                  return p.PID;
              })
          ).forEach(function (tpid) {
              try { process.kill(tpid, signal) }
              catch (ex) { }
          });
          callback();
      });
  } else {
      try { process.kill(pid, signal) }
      catch (ex) { }
      callback();
  }
};







function getMysqlConnection() {
  return mysql.createConnection( 
    {
      host: "172.104.189.102",
      user: "remote_user",
      password: "myPassw0rd_01",
      database: "twitter"
    }
  );
}









 

// search api code

var process_array = [];
  
if(req.session.pid){
  ps.kill( req.session.pid, 'SIGKILL', function( err ) {
    if (err) {
        throw new Error( err );
    }
    else {
        console.log( 'Process %s has been killed without a clean-up!', req.session.pid );
    }
    req.session.pid = null;
});
}
var cp = require('child_process');
var child = cp.fork('./scrapper' , {
detached: true

});

req.session.pid = child.pid;
process_array.push(req.session.pid);
request = {
  query:req.body.query
  };
process_array.push(request['query'] )
console.log( request['query'] + "is received") ;
req.session.myQuery = request['query']
child.send(process_array);

child.on('exit', function () {
  console.log('child process exited ');
});

child.unref();






process.on('message', function(m) {
  // Do work  (in this case just up-case the string
   scrapper(m);
  process.send('returned to main program');

  // Pass results back to parent process
  //process.send(m.toUpperCase(m));
});


var promise = htmlToJson.request('https://www.instagram.com/p/Bpm5YrVhARH/', {
  'meta': ['meta', function ($meta) {
    return $meta.attr('content');
  }]
}, function (err, result) {
  console.log(result);
});



// insta_scrapper code
let meta_data = await Promise.map(short_codes, function (short_code) {
  url = post_url + short_code + '/'
  return htmlToJson.request(url, {
    'meta': ['meta', function ($meta) {
    return $meta.attr('content');
            }] }); 
}) ;
if(meta_data){
 meta_data.forEach(element=>{
  var user_name=JSON.stringify(element.meta[6]); 
  user_name = user_name.match(/@[^\s]+/i)[0];
  user_names.push(user_name.replace('@','').replace(')',''));

})
console.log(user_names);
// user names are available from here 
var user_name_promises = [];
user_names.forEach(element=>{
  user_name_promises.push(ipp.small(element));
});

let display_ids =  await Promise.all(user_name_promises.map(function(promise) {
return Promise.resolve(promise).reflect();
}));



if(display_ids){
display_ids.forEach(inspection =>{
  if (inspection.isFulfilled()) {
    user_display_ids.push(inspection.value())
} else {
   user_display_ids.push('/images/User_ring.png');
}

})

