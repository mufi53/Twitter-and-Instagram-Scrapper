$( document ).ready(function() {
	
	// GET REQUEST
	$("#viewTweets").click(function(event){

        event.preventDefault();
        searchForTweets = true ;
		setInterval(function(){ajaxGet();} , 10000) ;
	});
	
	// DO GET
	function ajaxGet(){
       if(searchForTweets){
		$.ajax({
			type : "GET",
			url : window.location + "view_tweets",
			success: function(result){
                //alert("this is the result " + result)
				$('#getResultDiv ul').empty();
				var custList = "";
				$.each(result, function(i, tweet){
					$('#getResultDiv .list-group').append('<div id="tweet">'+ tweet.User_name +  "<br>"  + tweet.tweet + "<br>" + "</div>")
				});
				console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
        });	
	}
	}
})