//Created 07/27/21 11:56pm

var initialise = function(){
	fb.init("autc-web");
	//getE("no-js-warning").style.display = "none";
};

var interval = setInterval(function(){
	if(document.readyState=="complete"){
		clearInterval(interval);
		initialise();
	}
},20);