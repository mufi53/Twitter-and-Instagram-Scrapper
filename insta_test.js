var request = require('request');

request.get('https://www.facebook.com/search/posts/?q=fifa&epa=SERP_TAB', {
  'auth': {
    'user': 'talatarif23@gmail.com',
    'pass': 'fbdemouser',
    'sendImmediately': false
  }
} , function(error , response , body) {
    console.log(body)
}  );


