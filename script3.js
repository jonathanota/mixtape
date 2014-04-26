$(document).ready(function(){
	
	
//track number setup and initial animation	
$('li.inactiveTrackNumber').hide().animate({top: '70px', opacity: '1'}, 1000);	
	setTimeout(function(){$('li.currentTrackNumber').show().animate({top: '100px', opacity: '1'}, 1000)}, 2500);

//track title setup and initial animation	
$('li.inactiveTrack').hide().css({top: '220px', opacity: '0'});
	setTimeout(function(){$('li.currentTrack').show().animate({top: '200px', opacity: '1'}, 1000)}, 4000);

//hide all inactive videos
$('li.inactiveVideo').hide();



	
//load video --> play track, animation track# + title --> load background image
var nextAudioClass = $('li.playing');
var nextTrackClass = $('li.currentTrack');
var nextVideoClass = $('li.currentVideo');
var nextImageClass = $('li.currentImage');
var nextTrackNumberClass = $('li.currentTrackNumber');

var prevAudioClass = $('li.playing');
var prevTrackClass = $('li.currentTrack');
var prevVideoClass = $('li.currentVideo');
var prevImageClass = $('li.currentImage');
var prevTrackNumberClass = $('li.currentTrackNumber');

var videoDuration = 0;






// Setup the player to autoplay the next track
var a = audiojs.createAll({
trackEnded: function() {
	
 	nextVideoClass = $('li.currentVideo').next();
		if(!nextVideoClass.length) nextVideoClass = $('ol.videoTracks li').first();
			nextVideoClass.incrementVideoClass();
	 
	 nextAudioClass = $('li.playing').next(); // creates a variable that stores content of sibling
		if (!nextAudioClass.length) nextAudioClass = $('ol.audioArray li').first();
			nextAudioClass.incrementAudioClass();	
		
	nextTrackClass = $('li.currentTrack').next();
		if(!nextTrackClass.length) nextTrackClass = $('ol.trackNames li').first();
			nextTrackClass.incrementTrackClass();
		
	
	nextImageClass = $('li.currentImage').next();
		if(!nextImageClass.length) nextImageClass = $('ol.images li').first();
			nextImageClass.incrementImageClass();
			
	nextTrackNumberClass = $('li.currentTrackNumber').next();
		if(!nextTrackNumberClass.length) nextTrackNumberClass = $('ol.trackNumber li').first();
		nextTrackNumberClass.incrementTrackNumberClass();	

		
	}
	
		
});

$.fn.incrementVideoClass = function(){
	
//increment through li array	
	$(this)
		.removeClass('inactiveVideo')
		.addClass('currentVideo')
		.siblings()
		.removeClass('currentVideo')
		.addClass('inactiveVideo');
		
		
//create var to hold info/objects		
	var video = document.querySelector('li.currentVideo video');
	var source = document.querySelectorAll('li.currentVideo video source');

	
	$('li.inactiveVideo').fadeOut(3000);
	$('li.currentVideo').fadeIn(2000);
	
	video.load();
	video.play();	
	video.volume=.75;

//find how long video is to calculate timing from
	video.addEventListener ('loadedmetadata', function(){
		videoDuration = (video.duration)*1000;
 		console.log("video loop" + ' ' + videoDuration); 
	});
	
//fade video when video ends	
	$('li.currentVideo video').on('ended', function(){
		$('li.currentVideo').fadeOut(2000);
	});

}



// Load in the first track
var audio = a[0];
var first = $('ol.audioArray a').attr('data-src');
$('ol.audioArray li').first().addClass('playing');
/* audio.load(first); */


$.fn.incrementAudioClass = function(){
	
	$(this)
		.addClass('playing')
		.siblings()
		.removeClass('playing'); 

//returns song url to be loaded and played			
	audio.load($('a', this).attr('data-src')); 
	
	//wait to play audio during video
setTimeout(function(){	
		setTimeout(function(){audio.play()}, videoDuration/2); 
	}, 250);
	
	console.log("audio timing" + ' ' + videoDuration - videoDuration/3);
}


$.fn.incrementTrackClass = function(){
	
	 $(this)
	 	.removeClass('inactiveTrack')
		.addClass('currentTrack')
		.siblings()
		.removeClass('currentTrack')
		.addClass('inactiveTrack');
		


//track title animation setup --> reset animation
	$('li.inactiveTrack').animate({top: '220', opacity: '0'}, 2000).hide(); 

setTimeout(function (){
	setTimeout(function(){
		$('li.currentTrack').show().animate({top: '200px', opacity: '1'}, 1000);
	}, videoDuration+750);	
	
	console.log("track loop" + ' ' + videoDuration+500);
						
	}, 200);
}

$.fn.incrementTrackNumberClass = function(){
	
		$(this)
		.removeClass('inactiveTrackNumber')
		.addClass('currentTrackNumber')
		.siblings()
		.removeClass('currentTrackNumber')
		.addClass('inactiveTrackNumber');
		
//trackNumber animation setup reset --> animation
	$('li.inactiveTrackNumber').animate({top: '70px', opacity: '1'}, 2000).hide();	

setTimeout(function (){
	setTimeout(function(){
		$('li.currentTrackNumber').show().animate({top: '100px', opacity: '1'}, 1000)
	}, videoDuration+750);
	
	console.log("track Number loop" + ' ' + videoDuration+500);
	
	}, 200);
}



$.fn.incrementImageClass = function(){
	
	$(this)
		.removeClass('inactiveImage')
		.addClass('currentImage')
		.siblings()
		.removeClass('currentImage')
		.addClass('inactiveImage');
	
	var imageBackground = $('li.currentImage img').attr('src')
	
//timer to set background image to reduce ghosting before video
	setTimeout( function(){
		$('body').css({'background-image' : "url(" + imageBackground + ")"});	
	}, 2000);
	
	
}



// Keyboard shortcuts
$(document).keydown(function(evt) {

	var e = evt || event;
    var code = e.keyCode || e.which;

// right arrow
if (code == 39) {


		var video = document.querySelector('li.currentVideo video');
		var source = document.querySelectorAll('li.currentVideo video source');
		video.pause();

//------Video incrementor
		nextVideoClass = $('li.currentVideo').next();
		if(!nextVideoClass.length) nextVideoClass = $('ol.videoTracks li').first();
		nextVideoClass.incrementVideoClass();

//audio incrementor
 nextAudioClass = $('li.playing').next();
if (!nextAudioClass.length) nextAudioClass = $('ol.audioArray li').first();
nextAudioClass.incrementAudioClass();

//--track name incrementor
	nextTrackClass = $('li.currentTrack').next();
	if(!nextTrackClass.length) nextTrackClass = $('ol.trackNames li').first();
	nextTrackClass.incrementTrackClass();
		
//----------Image incrementor		
			nextImageClass = $('li.currentImage').next();
			if(!nextImageClass.length) nextImageClass = $('ol.images li').first();
			nextImageClass.incrementImageClass();
		
//--------------Track Number incrementor			
				nextTrackNumberClass = $('li.currentTrackNumber').next();
				if(!nextTrackNumberClass.length) nextTrackNumberClass = $('ol.trackNumber li').first();
				nextTrackNumberClass.incrementTrackNumberClass();		
		




// back arrow
} else if (code == 37) {


		var video = document.querySelector('li.currentVideo video');
		var source = document.querySelectorAll('li.currentVideo video source');
		video.pause();

//------video incrementor	
		prevVideoClass = $('li.currentVideo').prev();
		if(!prevVideoClass.length) prevVideoClass = $('ol.videoTracks li').last();
		prevVideoClass.incrementVideoClass();
		

//audio incrementor
 prevAudioClass = $('li.playing').prev();
if (!prevAudioClass.length) prevAudioClass = $('ol.audioArray li').last();
prevAudioClass.incrementAudioClass();

//--track Name incrementor
	prevTrackClass = $('li.currentTrack').prev();
	if(!prevTrackClass.length) prevTrackClass = $('ol.trackNames li').last();
	prevTrackClass.incrementTrackClass();


//----------Image incrementor		
			prevImageClass = $('li.currentImage').prev();
			if(!prevImageClass.length) prevImageClass = $('ol.images li').last();
			prevImageClass.incrementImageClass();
	
//--------------Track Number incrementor			
				prevTrackNumberClass = $('li.currentTrackNumber').prev();
				if(!prevTrackNumberClass.length) prevTrackNumberClass = $('ol.trackNumber li').last();
				prevTrackNumberClass.incrementTrackNumberClass();
		
		



// spacebar
} else if (code == 32) {

audio.playPause();

}

})


	
});