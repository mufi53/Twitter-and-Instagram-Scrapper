
const htmlToJson  = require('html-to-json');
var ig = require('instagram-scraping');
const ipp = require('instagram-profile-picture');
var Promise = require("bluebird");
var utf8 = require('utf8');




var post_url = 'https://www.instagram.com/p/';


async function scrape_instagram(pool ,pid , query){
  try{

  let posts = await ig.scrapeTag(query);
  //console.log(posts);
  if(posts){
  insta_posts = posts.medias;
  //console.log(insta_posts);
  var short_codes = []; //these arrays will be filled as we go down 
  var user_names = [] ; //these arrays will be filled as we go down
  var user_display_ids = [] ;//these arrays will be filled as we go down 
  var combined_details = [];
 
 
  insta_posts.forEach(element => {
  short_codes.push(element.shortcode)
  })
  //console.log(short_codes);
  // short codes are available from here 
  var short_code_promises=[];
  short_codes.forEach(element => {
    short_code_promises.push(ig.scrapePostCode(element))
    })
  
  let meta_data  =  await Promise.all(short_code_promises.map(function(promise) {
    return Promise.resolve(promise).reflect();
    }));
   
    

  if(meta_data){
    meta_data.forEach(inspection =>{
      if (inspection.isFulfilled()) {
        user_names.push(inspection.value().owner.username)
        user_display_ids.push(inspection.value().owner.profile_pic_url)
    } else {
       user_display_ids.push('/images/User_ring.png');
       user_names.push('insta_user')
    }
    
    })



//console.log(user_display_ids);

// now its time to combine all the arrays into a single instagram post 


insta_posts.forEach((element,i) => {
  var insta_post = {}; 
  insta_post.id = element.media_id ;
  insta_post.text = element.text ;
  insta_post.user_id = element.owner_id ;
  insta_post.user_screen_name =  "insta_name";
  insta_post.user_name =user_names[i];
  insta_post.created_at = element.date ;
  insta_post.retweets = 0 ;// using this as the db is the same , so to keep data integrity with the tweets scrapped
  insta_post.likes = element.like_count.count ;
  insta_post.replies = element.comment_count.count ;
  insta_post.user_display_id = user_display_ids[i];
  insta_post.date = "30s";
  insta_post.media_image = element.thumbnail ; 
  insta_post.query = query;
  insta_post.process_id = pid
  insta_post.short_code = short_codes[i] ;
  insta_post.tag = "insta"
  
  
  combined_details.push(insta_post);
})

console.log(combined_details);
// add to the db
var all_records =[];
combined_details.forEach(element=>{
  var record = [];
  Object.entries(element).forEach(([key, value]) => { 
     value = value.toString().replace("'" , "");
     //console.log(value);
       
         record.push(utf8.encode(value).toString()) 
  });
  all_records.push(record);
 
})
pool.query('INSERT INTO tweet (id, text , user_id , user_screen_name , user_name , created_at , retweets , likes , replies , profile_pic , date , media_image , query , process_id , short_code , tag) VALUES ? ON DUPLICATE KEY UPDATE text = VALUES(text)', [all_records], function(err,result) {
  if(err) {
     console.log(err) 
  }
 else {
  console.log("element insta inserted")
  
 
 
  }
});

}}// end all ifs
  }// end try 
  catch (error){
      console.log( error + "  insta error caught in scrapper.js");
  }
}

module.exports = scrape_instagram;

