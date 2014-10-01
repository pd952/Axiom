
//Assignment 1: Voice search.
//By Fah Daengdej, Fall 2014.

//Image Counter
var count = 0;

//AFTER EVERYTHING LOADS
$(document).ready(function(){
	console.log("loaded");

	//annyang
	if (annyang){
		console.log("found annyang!!!");

		var commands = {

			//ALL the commands
			'show me *term': function(term){
				console.log("Calling show me function");

				//Loading Message
				var upperTerm = term.toUpperCase();
				$('#loading').html("Thanks! Let me see what I know about " + upperTerm);

				console.log(term);

				getFlickrData(term);


		$('.animate').animate({top: -150, fontSize: "15px"}, 1000);
		$('.animateTitle').animate({top: -180, fontSize: "50px"}, 1000);

				//searchWikipedia(term);
				//var url = 'http://api.flickr.com/services/rest/?tags=' + tag;
				//$.getJSON(url);
			}
		}

		//Annyang starting up
		annyang.addCommands(commands);

		annyang.start({
			autoRestart: false 
		});		
	}

//Flickr data
function getFlickrData(word){
	console.log("getting flickr data!");

	var flickrKey = '15689434ca3d78da581dd9938c10d0ea';
	var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=15689434ca3d78da581dd9938c10d0ea&tags=' 
	+ word + '&format=json';

	//hello ajax! 
	$.ajax({
		url: flickrURL,
		type: 'GET',
		dataType: 'jsonp',
		mimeType: 'HTML',
		jsonpCallback: 'jsonFlickrApi',

		error: function(error){
			console.log("no :(");
			console.log(error);
		},

		success: function(dataI){
			console.log("Yay");
			console.log("Flickr Data");
			console.log(dataI);

			//Hard coding the low-functioning picture grabbing function.
			id = dataI.photos.photo[count].id;
			secret = dataI.photos.photo[count].secret;
			server = dataI.photos.photo[count].server;

			url = 'https://farm4.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
			//$("#container").css('backgroundImage','url('+url+')');
			var imgString = '<img src="'+url+'">';
			
			$('#loading').html('');
			$("#imgContainer").html(imgString); 

			searchWikipedia(word);
		}
	});
}

//The wikisearch
function searchWikipedia(word){
	console.log("word");

	var wikiURL = 'http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' 
	+ word + '&format=json&srprop=snippet'

	// var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' 
	// + word;

	//ajax again
	$.ajax({
	url: wikiURL,
	type: 'GET',
	dataType: 'jsonp',

	error: function(data){
		console.log("whaaaat");
	}, 

	success: function(data){
		console.log("it works!!!");
		console.log("The data object");
		console.log(data);

		// console.log("theWord");
		// console.log(data[0]);

		// console.log("theResults");
		// console.log(data[1]);

	//var theSearchWord = data[0].toUpperCase();
	var theSearchResults = data.query.search;

	if (theSearchResults.length === 0){
		alert("Sorry, couldn't find anything. Please try again.")
	} else{
		//$('#theResults').html("word");

		//Printing the results to the string
		var theResultsString = '';
		for (var i = 0 ; i < theSearchResults.length; i++) {

			theResultsString +='<div class="box">';
			theResultsString +='<h4>' + theSearchResults[i].title + ':' + '</h4>' +
			'<p>' + theSearchResults[i].snippet + '</p>';
			theResultsString +='</div>';
		}

		console.log(theResultsString);
		$('#theResults').html(theResultsString);

	}
}
});
}

	// //if someone presses enter
	// $('#enter').click(function(){
	// 	console.log("clicked");
	// 	searchWikipedia('dogs');
	// 	count++;
	// });

	// //talk button 
	// $('#talk').click(function(){
	// 	console.log("i'm talking");
	// 	annyang.start({
	// 		autoRestart: false 
	// 	});
	// });
});


	
