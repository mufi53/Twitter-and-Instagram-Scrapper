const scrapeIt = require("scrape-it")
//var mysql = require('mysql');
//var utf8 = require('utf8');



function scrapper(req, pool ,pid , query){
   
   
    var url ; 
    if (req.session.counter==0){
    url='https://twitter.com/search?q='+query+'&src=typd'    
    }
    else{

    url='https://twitter.com/search?f=tweets&vertical=news&q='+query+'&src=typd'
    }
    console.log(url);
    scrapeIt(url, {
    // Fetch the tweets
    tweets: {
        listItem: ".js-stream-item"
      , data: {
        //get the tweet id 
        id : {
            selector : ".js-stream-tweet" ,
            attr :"data-tweet-id"
            },
        //get the text 
        text: ".js-tweet-text",
        //get the user id 
        user_id :{
             selector: ".js-stream-tweet",
             attr:"data-user-id"
        },
        //get the user screen name 
        user_screen_name : ".fullname",
        //get the user name
        user_name : ".username b",
        
        // Get the created at time 
        created_at:{
            selector:"._timestamp",
            attr:"data-time-ms" 
        
        },
         // Get the number of retweets 
        retweets:{
            selector:".ProfileTweet-action--retweet span.ProfileTweet-actionCount" ,
            attr:"data-tweet-stat-count"
            },
         // Get the number of likes 
        likes :{
            selector:".ProfileTweet-action--favorite span.ProfileTweet-actionCount" ,
            attr:"data-tweet-stat-count"
            },
        // Get the number of comments 
        replies :{
        selector:".ProfileTweet-action--reply span.ProfileTweet-actionCount",
        attr:"data-tweet-stat-count"
        }  ,
        
       
        //get the profile pic 
        profile_pic :{
            selector:".avatar",
            attr :"src"
        } , 
        // Get the date 
        date: "._timestamp",
        //get the media image
        media_image :{
            selector:".AdaptiveMedia-photoContainer img",
            attr :"src"
        }
        }
    }
 
    // Fetch the blog pages
  
}, (err, { data }) => {
    
       /*var tweets = data.tweets ;  
       var all_values = []
        tweets.forEach(element => {
            if(element.date){
            var values = [];
            Object.entries(element).forEach(([key, value]) => {

               
                if(value==''){
                     value = "none"
                    }
                    
                   value = value.replace("'" , "");
                   
                     values.push(utf8.encode(value).toString()) 
              });
              values.push(query);
              values.push(pid);
              values.push("null");
              values.push("twitter");
              all_values.push(values);
             
             
              //console.log(element)
            }
});    

pool.query('INSERT INTO tweet (id, text , user_id , user_screen_name , user_name , created_at , retweets , likes , replies , profile_pic , date , media_image , query , process_id , short_code , tag ) VALUES ? ON DUPLICATE KEY UPDATE text = VALUES(text)', [all_values], function(err,result) {
    if(err) {
       console.log(err)
      
    }
   else {
    console.log("element tweet inserted")
    
   
   
    }
  });
       

  
    

    
// */console.log(all_values)
})

req.session.counter++ ;
console.log("the session counter is  " + req.session.counter);

}




module.exports = scrapper ;