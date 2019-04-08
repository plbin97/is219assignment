// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/
animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto(true);
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/


function swapPhoto(isNext) {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string
	if (isNext) {
		if (mCurrentIndex === mImages.length - 1) {
			mCurrentIndex = 0;
		} else {
			mCurrentIndex ++;
		}
	} else {
		if (mCurrentIndex === 0) {
			mCurrentIndex = mImages.length - 1;
		} else {
			mCurrentIndex --;
		}
	}
	document.getElementById("photo").src = mImages[mCurrentIndex].imgPath;
	document.getElementById("imageLocation").innerText = "Location: " + mImages[mCurrentIndex].imgLocation;
	document.getElementById("imageDesc").innerText = "Description: " + mImages[mCurrentIndex].description;
	document.getElementById("imageDate").innerText = "Date: " + mImages[mCurrentIndex].date;

}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages;

let param = getQueryVariable("json");
if (param) {
	mRequest.open("GET","./" + param,false);
	mRequest.send();
	if (mRequest.status === 200) {
		mImages = JSON.parse(mRequest.responseText).images;
	}else {
		mRequest.open("GET","./images.json",false);
		mRequest.send();
		mImages = JSON.parse(mRequest.responseText).images;
	}
}else {
	mRequest.open("GET","./images.json",false);
	mRequest.send();
	mImages = JSON.parse(mRequest.responseText).images;
}

document.getElementById("photo").src = mImages[mCurrentIndex].imgPath;
document.getElementById("imageLocation").innerText = "Location: " + mImages[mCurrentIndex].imgLocation;
document.getElementById("imageDesc").innerText = "Description: " + mImages[mCurrentIndex].description;
document.getElementById("imageDate").innerText = "Date: " + mImages[mCurrentIndex].date;

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'insert_url_here_to_image_json';


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

let moreIndicator = document.getElementById("moreIndicatorButton");
moreIndicator.onclick = () => {
	if (moreIndicator.classList.contains("rot90")) {
		moreIndicator.classList.remove("rot90");
		moreIndicator.classList.add("rot270");
		$("#imageDetail").fadeToggle();
	}else {
		moreIndicator.classList.remove("rot270");
		moreIndicator.classList.add("rot90");
		$("#imageDetail").fadeToggle();
	}
};

$("#prevPhoto").click(() => {
	swapPhoto(false);
});
$("#nextPhoto").click(() => {
	swapPhoto(true);
});

$(document).ready( function() {

	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);

function getQueryVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}


