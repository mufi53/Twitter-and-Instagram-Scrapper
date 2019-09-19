
$( document ).ready(function() {
	// set the counter for log 
	var counter = 0 ;
	var tweet_count = 0 ;
	var tweet_count_temp = 0;
	var tweet_date = '10s' ; 

	function show_notification(text) {
	    
		var x = document.getElementById("snackbar");
		x.className = "show";
        x.innerHTML =text;
		setTimeout(function(){ x.className = x.className.replace("show", "");
		$('.dots').detach();
		$('#getResultDiv').prepend('<div class="dots"><div class="dot-1"></div><div class="dot-2"></div><div class="dot-3"></div><div class="dot-4"></div><div class="dot-5"></div><div class="dot-6"></div><div class="dot-7"></div><div class="dot-8"></div> </div>');
	
	
	
	}, 5000);
	}
	
	// SUBMIT FORM
    $("#TweetSearchForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
        event.preventDefault();
		searchForTweets =false; 
		
		ajaxPost();
		searchForTweets = true ;
		setInterval(function(){loop();} , 45000) ;
		
		
		$(".list-unstyled").prepend('<li><a href="#">'+$("#query").val()+'</a></li> <br>');
		
		
	});
    
    
    function ajaxPost(){
		show_notification("initiating search");
		//$('#getResultDiv').prepend('<div class="dots"><div class="dot-1"></div><div class="dot-2"></div><div class="dot-3"></div><div class="dot-4"></div><div class="dot-5"></div><div class="dot-6"></div><div class="dot-7"></div><div class="dot-8"></div> </div>');
		
    	
    	// PREPARE FORM DATA
    	var formData = {
    		query : $("#query").val()
    		
		}
		
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "search",
			data : JSON.stringify(formData),
			dataType : 'text',
			success : function(query) {
			
			
				$('#getResultDiv ul').empty();
				
					show_notification("loading top feeds");
					setTimeout(function(){ajaxGet(); get_analysis();} , 5000)
					setTimeout(function(){ajaxGet(); get_analysis();} , 10000)
					setTimeout(function(){ajaxGet(); get_analysis();} , 20000)
					
			},
			error : function(e) {
				alert( "Search timeout reloading");
				ajaxGet();

				console.log("OOps there is a ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
		resetData();
		
 
    }
    
    function resetData(){
    	$("#search").val("");
    	
	}
	
	function ajaxGet(){
		//$('.dots').detach();
		//$('#getResultDiv').prepend('<div class="dots"><div class="dot-1"></div><div class="dot-2"></div><div class="dot-3"></div><div class="dot-4"></div><div class="dot-5"></div><div class="dot-6"></div><div class="dot-7"></div><div class="dot-8"></div> </div>');
		show_notification("crunching and refining")
		if(searchForTweets){
		 $.ajax({
			 type : "GET",
			 url : window.location + "view_tweets",
			 success: function(result){
				
			
				 //alert("this is the result " + result)
				 //$('#getResultDiv ul').empty();
				 var custList = "";
				
				if(result !== "timeout"){
				 $.each(result.reverse(), function(i, tweet){
					 
					 tweet_date = tweet.date ;
					 
					 if(tweet.tag == 'twitter'){
					     if(tweet.media_image !== 'none'){
							
                                   $('#getResultDiv .list-group').prepend('<div id="tweet_div" class="media"><a class="media-left" href="https://twitter.com/'+tweet.user_name+'" target="_blank"><img id="profile_pic" alt="" class="media-object img-rounded" src="' + tweet.profile_pic + '"></a><div class="media-body"><h4 class="media-heading" style="font-weight:bold;">'+ tweet.user_screen_name + '<span style="color:#A4A4A4;" >  @'+ tweet.user_name + ' -' + tweet.date +'<a class="media-left" ><img id="profile_pic" alt="" class="media-object img-rounded" src="/images/twitter_small.png" width="30" height="30"></a>'+'</span>'+ '</h4>' + '<a  href="https://twitter.com/'+tweet.user_name+'/status/'+tweet.id+'" target="_blank" >'+ '<p>'  + tweet.text + '</p></a>' +  '<img class="img-responsive img-thumbnail" src="'+tweet.media_image+'" alt="Twiiter_Media_Image" width="460" height="345">' + ' <ul class="nav nav-pills nav-pills-custom"><li><a href="#"><span class="glyphicon glyphicon-share-alt" style="color:#A4A4A4; font-weight:bold;"> '+tweet.replies+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-retweet" style="color:#A4A4A4; font-weight:bold;"> '+tweet.retweets+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-star" style="color:#A4A4A4; font-weight:bold;"> '+tweet.likes+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-option-horizontal"></span></a></li> </ul></div>  </div>')
											}
								else{	

								 
								  $('#getResultDiv .list-group').prepend('  <div id="tweet_div" class="media"><a class="media-left" href="https://twitter.com/'+tweet.user_name+'" target="_blank"><img id="profile_pic" alt="" class="media-object img-rounded" src="' + tweet.profile_pic + '"></a><div class="media-body"><h4 class="media-heading" style="font-weight:bold;">'+ tweet.user_screen_name + '<span style="color:#A4A4A4;" >  @'+ tweet.user_name + ' -' + tweet.date+ '<a class="media-left" ><img id="profile_pic" alt="" class="media-object img-rounded" src="/images/twitter_small.png" width="30" height="30"></a>'+'</span>'+ '</h4>' + '<a  href="https://twitter.com/'+tweet.user_name+'/status/'+tweet.id+'" target="_blank">'+ '<p>'  + tweet.text + '</p></a>' +  ' <ul class="nav nav-pills nav-pills-custom"><li><a href="#"><span class="glyphicon glyphicon-share-alt" style="color:#A4A4A4; font-weight:bold;"> '+tweet.replies+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-retweet" style="color:#A4A4A4; font-weight:bold;"> '+tweet.retweets+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-star" style="color:#A4A4A4; font-weight:bold;"> '+tweet.likes+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-option-horizontal"></span></a></li> </ul></div>  </div>')					
								}
							}
					if(tweet.tag == 'insta'){
						$('#getResultDiv .list-group').prepend('<div id="tweet_div" class="media"><a class="media-left" href="https://www.instagram.com/'+tweet.user_name+'" target="_blank"><img id="profile_pic" alt="" class="media-object img-rounded" src="' + tweet.profile_pic + '"  width="70" height="70"></a><div class="media-body"><h4 class="media-heading" style="font-weight:bold;">'+ tweet.user_name + '<span style="color:#A4A4A4;" >  .'+ "Follow" + ' -'  +'<a class="media-left" ><img id="profile_pic" alt="" class="media-object img-rounded" src="/images/insta_small.png" width="30" height="30"></a>'+'</span>'+ '</h4>' + '<a  href="https://www.instagram.com/p/'+tweet.short_code+'/" target="_blank">' + '<p>'  + tweet.text + '</p> </a>' +  '<img class="img-responsive img-thumbnail" src="'+tweet.media_image+'" alt="Twiiter_Media_Image" width="460" height="345">' + ' <ul class="nav nav-pills nav-pills-custom"><li><a href="#"><span class="glyphicon glyphicon-share-alt" style="color:#A4A4A4; font-weight:bold;"> '+tweet.replies+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-retweet" style="color:#A4A4A4; font-weight:bold;"> '+tweet.retweets+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-star" style="color:#A4A4A4; font-weight:bold;"> '+tweet.likes+' </span></a></li><li><a href="#"><span class="glyphicon glyphicon-option-horizontal"></span></a></li> </ul></div>  </div>')

					}
								}); }
			     else{
					 console.log('no more rows added')
				 }
				$('.log-container').detach();
			
				
			 },
			 error : function(e) {
				 $("#getResultDiv").html("<strong>Sorry server didnt respond refreshing ..</strong>");
				 ajaxGet();
				 console.log("ERROR: ", e);
			 }
		 });	
	 }
	
	 }


	 function get_analysis(){
			   var feed_count = $('[id="tweet_div"]').length;
			   if(counter == 1){
				show_notification("Rendering top feeds thankyou for waiting")
			}
				else{ 
					if(counter ==2){
					show_notification("Rendering latest feeds now thankyou for waiting")
					}
					if(counter > 2){
						show_notification("Waiting for more feeds");
						if(tweet_count==tweet_count_temp){
						show_notification("No more latest feeds found");

						}	

					}
				}

		
				//alert(analysis.count + "   " + analysis.date);
				if(counter==0){
				tweet_count=feed_count;
				tweet_count_temp =feed_count ; 
			}
			else{
				if(feed_count==tweet_count){
					tweet_count=feed_count;
				    tweet_count_temp =feed_count ; 
				}
				else{
					tweet_count=feed_count;
				}
			}
				$('#total_tweets').text(feed_count);
				$('#tweet_date').text(tweet_date + " ago");

				
			
		

		 // increament the counter
		 counter++ ;
	 }


	 function loop(){
		//$('.dots').detach();
		//$('#getResultDiv').prepend('<div class="dots"><div class="dot-1"></div><div class="dot-2"></div><div class="dot-3"></div><div class="dot-4"></div><div class="dot-5"></div><div class="dot-6"></div><div class="dot-7"></div><div class="dot-8"></div> </div>');
		
    	
		 var formData = {
    		query : $("#query").val()
    		
		}
        ajaxGet(); get_analysis();

		$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "search",
			data : JSON.stringify(formData),
			dataType : 'text',
			success : function(query) {
				$('.dots').detach();
				if(query=="session_timeout"){
					$("#myModal").modal();
					
				}
				else{
			
				
	
				
				show_notification("Getting latest feeds now")
				setTimeout(function(){ajaxGet(); get_analysis();} , 5000)
				setTimeout(function(){ajaxGet(); get_analysis();} , 10000)
				setTimeout(function(){ajaxGet(); get_analysis();} , 20000)
				
				
			}

			//$('.dots').detach();
			},
			error : function(e) {
				alert( "Search timeout reloading");
				ajaxGet();

				console.log("OOps there is a ERROR: ", e);
			}
		});
    	

	 }
})