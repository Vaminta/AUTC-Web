/*

FixiBug - © Greg Card 2020
1/24/2020 - 5:25pm
Version: 0.1

*/

var fixibug = new Object();
fixibug.meta = new Object();
fixibug.meta.version = 0.1;
fixibug.meta.date = "1/24/2020";
fixibug.settings = new Object();
fixibug.settings.sl = "fixibugInst"; //Storage Location
fixibug.settings.consoleLog = true; //Also log to standard console.
fixibug.settings.consoleLogPrefix = "FB: "; 
// Instance - data for this local instance
fixibug.i = new Object();
fixibug.i.id = "default";
fixibug.i.logs = [];

//for storing variables for this local instance - i.e this document
fixibug.local = new Object();
fixibug.local.initialised = false; // Has the fb.init() function been called yet?
fixibug.local.uiCreated = false;
fixibug.local.uiVisible = false;
fixibug.local.uiContainerID = "fixibug-ui-container";
fixibug.local.alertList = [];
fixibug.local.alertUICreated = false;
fixibug.local.alertVisible = false;

fixibug.ui = new Object();
fixibug.ui.init = function(){
	var container = document.createElement("div");
	container.id = fixibug.local.uiContainerID;
	container.style = "position: fixed; width: 240px; right: 0px; background-color: #E0E0F0; color: #000000;";
	//#004e98
	//#E0E0F0
	//#A0A0B0
	container.innerHTML = "<div id='fbui-top-bar' style='background-color: #004e98; text-align: center; color: #ffffff;'>\
	FixiBug UI<button style='position: absolute; right: 0px; background-color: #ff4242; color: #ffffff; border: 0; height: 18px;'>X</button></div>\
	<div id='log-table-container' style='color: #000000;''></div>";
	document.body.append(container);
	fixibug.local.uiCreated = true;
	fixibug.local.uiVisible = true;
};

fixibug.ui.update = function(){
	var tableHTML = "<table style='color: #000000; font-family: Monospace; margin: 0px; padding: 0px;'>";
	for(var i=0;i<fixibug.i.logs.length;i++){
		var cl = fixibug.i.logs[i]; // current log
		var hours = cl.dat[5];
		var minutes = cl.dat[4];
		tableHTML += "<tr style=''><th>"+hours+":"+minutes+"<th><th>"+fixibug.i.logs[i].msg+"<th><tr>";
	}
	tableHTML += "</table>";
	document.getElementById("log-table-container").innerHTML = tableHTML;
};

fixibug.ui.visible = function(visible){
	if(fixibug.local.uiCreated==true){
		if(visible){
			document.getElementById(fixibug.local.uiContainerID).style.display = "block";
		}
		else{
			document.getElementById(fixibug.local.uiContainerID).style.display = "none";
		}
	}
	else{ //Error!
		
	}
};


fixibug.storage = new Object();
// Get whole data from storage
fixibug.storage.get = function(key){
	var data = localStorage.getItem(key);
	return data;
};
// Set whole data to storage
fixibug.storage.set = function(key, data){
	localStorage.setItem(key, data);
};

// Extracts specified instance to local storage
fixibug.storage.extract = function(id, append){
	if(!append) append = false;
	// A place to temp store the retrieved storage data.
	var storedInst = [];
	storedInst = JSON.parse(fixibug.storage.get(fixibug.settings.sl));
	var extractedInst;
	if(!storedInst) var storedInst = [];
	for(var i=0;i<storedInst.length;i++){
		if(storedInst[i].id==id) extractedInst = storedInst[i];
	}
	if(append&&extractedInst){
		fixibug.i = extractedInst;
	}
	else if(append==false){
	return extractedInst;
	}
};

// Appends current instance to local storage
fixibug.storage.append = function(id){
	if(!id) id = fixibug.i.id;
	var storedInst = [];
	storedInst = JSON.parse(fixibug.storage.get(fixibug.settings.sl));
	var currentIndex = -1;
	if(!storedInst) var storedInst = [];
		for(var i=0;i<storedInst.length;i++){
			if(storedInst[i].id==id) currentIndex = i;
		}

	if(currentIndex==-1) storedInst.push(fixibug.i);
	else{
		storedInst[currentIndex] = fixibug.i;
	}
	var newData = JSON.stringify(storedInst);
	fixibug.storage.set(fixibug.settings.sl, newData);
};

//FixiBug tools will contain useful functions for testing/ debugging, etc
fixibug.tools = new Object();
fixibug.alert = new Object();
fixibug.alert.newAlert = function(msg,title){
	var alertObj = [msg, title];
	fixibug.local.alertList.push(alertObj);
	if(fixibug.local.alertVisible==false) fixibug.alert.process();
};
fixibug.alert.process = function(){
	if(fixibug.local.alertList.length>0){
		if(fixibug.local.alertUICreated==false){
			//Create the UI
			var container = document.createElement("div");
			container.id = "fixibug-alert-box";
			container.style = "position: fixed; width: 240px; height: 140px; top: 25%; left: 25%; background-color: #ffffff; color: #000000;";
			/*
			The inner HTML will contain both a title element as well as an element to hold the custom message.
			Also includes other elements to handle styling.
			*/
			container.innerHTML = "<div style='position: absolute; background-color: #004e98; width: 240px; height: 20px; color: #ffffff;'>\
			<p id='fixibug-alert-title' style='text-align: center; padding: 0px; margin: 0px; font-size: 18px;'>Alert</p>\
			</div>\
			<div style='position: absolute; top: 20px; left: 0px; width: 240px; height: 100px; overflow-y: auto;'>\
			<p id='fixibug-alert-msg' style='padding: 1px; margin: 0px;' >No MSG data.</p>\
			</div>\
			<button style='position: absolute; top: 121px; height: 18px; width: 60px; left: 90px; background-color: #ffffff; border: 1px solid;' \
			onclick='fixibug.alert.process()'>Close</button> ";
			document.body.appendChild(container);
			fixibug.local.alertUICreated = true;
		}
		else{
			//No need to create UI again
		}
		
		var w = window.innerWidth;
		var h = window.innerHeight;
		var left = (w/2) - (240/2);
		var top = (h/2) - (140/2);
		document.getElementById("fixibug-alert-box").style.left = left;
		document.getElementById("fixibug-alert-box").style.top = top;
		
		var message = fixibug.local.alertList[0][0];
		var title = fixibug.local.alertList[0][1];
		
		document.getElementById("fixibug-alert-msg").innerHTML = message;
		document.getElementById("fixibug-alert-title").innerHTML = title;
		document.getElementById("fixibug-alert-box").style.display = "block";
		fixibug.local.alertVisible = true;
		//Now that we have acted on the alert, we can now delete it from the waiting list.
		fixibug.local.alertList.shift();
	}
	else if(fixibug.local.alertVisible==true){
		document.getElementById("fixibug-alert-box").style.display = "none";
		fixibug.local.alertVisible = false;
	}
};

fixibug.templates = new Object();
fixibug.templates.instace = function(id){
	this.id = id;
};
fixibug.templates.log = function(type, message){
	this.type = type;
	this.msg = message;
	this.dat = fixibug.templates.datNow();
	//this.expDAT = fixibug.templates.datNow();
};
/*
	Fixibug Date and Time (dat) objects are made of an array: 
	[day of month, month, full year, seconds, minutes, hours]
*/
fixibug.templates.dat = function(options){
	
};
fixibug.templates.datNow = function(){
	var date = new Date();
	var arrayDate = [];
	arrayDate.push(date.getDate());
	arrayDate.push(date.getMonth()+1); //+1 to get human date i.e. January = 1 not 0
	arrayDate.push(date.getFullYear());
	arrayDate.push(date.getSeconds());
	arrayDate.push(date.getMinutes());
	arrayDate.push(date.getHours());
	return arrayDate;
};

fixibug.tick = setInterval(function(){
	if(fixibug.local.initialised==true){
		fixibug.storage.extract(fixibug.i.id, true);
		if(fixibug.local.uiCreated==true) fixibug.ui.update();
	}
},500);

/*

USER ACCESS

*/

var fb = new Object();
fb.initialised = false;

// Initialise
fb.init = function(id){
	if(!id) fixibug.i.id = "default";
	else fixibug.i.id = id;
	fixibug.storage.extract(fixibug.i.id, true);
	fixibug.local.initialised=true;
	console.log("FixiBug successfully initialised.");
};

fb.ui = new Object();
// Show/ create the FixiBugUI
fb.ui.show = function(){
	if(fixibug.local.uiCreated==false){
		fixibug.ui.init();
	}
	else{
		fixibug.ui.visible(true);
	}
};
// Hide the UI
fb.ui.hide = function(){
	fixibug.ui.visible(false);
};

fb.log = function(msg){
	//create new log object
	var logO = new fixibug.templates.log("normal",msg);
	fixibug.i.logs.push(logO);
	fixibug.storage.append();
	if(fixibug.settings.consoleLog==true) console.log(fixibug.settings.consoleLogPrefix+msg);
};

fb.alert = function(msg,title){
	if(!title) title = "Alert";
	fixibug.alert.newAlert(msg,title);
};