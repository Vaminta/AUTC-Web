// Version: 1.0.0
var remashoCreatedElements = [];

var consolePrefix="Remasho: ";
console.log(consolePrefix + "Remasho successfuly launched.");

var toggleVis = function(idOfElement){
  if(document.getElementById(idOfElement).style.visibility=="hidden"){
    document.getElementById(idOfElement).style.visibility="visible";
    console.log(consolePrefix + "Element '" + idOfElement + "' visibility changed to visible.");
  }
  else{
    document.getElementById(idOfElement).style.visibility="hidden";
    console.log(consolePrefix + "Element '" + idOfElement + "' visibility changed to hidden.");
  }
};

var getE = function(elementID){
  var final = document.getElementById(elementID);
  return final;
};

var fadeVis = function(id,ori,userTime,limit){  //Out or In = ori
  var element = document.getElementById(id);
  if(ori=="In"){
   if(!limit){ // If no limit is specified, assume.
     limit = 1.0;
   }
   if(element.style.opacity.length<1){ // If opacity was not previously specified, assume.
       element.style.opacity = 0.0;
     }
   if(element.style.opacity<limit){
     element.style.opacity = parseFloat(element.style.opacity) + 0.1;
     setTimeout(function(){fadeVis(id,ori,userTime,limit);},userTime);
   }
  }
  else{
   if(!limit){
     limit = 0.0;
   }
   if(element.style.opacity.length<1){
       element.style.opacity = 1.0;
     }
   if(element.style.opacity>limit){
     element.style.opacity = element.style.opacity - 0.1;
     setTimeout(function(){fadeVis(id,ori,userTime,limit);},userTime);
   }
  }
};

var fadeVol = function(id,iro,userTime,limit){
  var oldIncRate = 0.1;
  var incRate = parseInt(oldIncRate);
  var element = document.getElementById(id);
  if(iro=="Out"){
    if( element.volume>limit){
      element.volume = element.volume - oldIncRate;
      setTimeout(function () {
          fadeVol(id,iro,userTime,limit);
      }, userTime);
    }
  }
  if(iro=="In"){
    if( element.volume<limit){
      element.volume = element.volume + oldIncRate;
      setTimeout(function () {
          fadeVol(id,iro,userTime,limit);
      }, userTime);
    }
  }
};

var randomNumber = function(min,max) {
  var randomNo = Math.round(Math.random()*(max-min)) + min;
  console.log(consolePrefix + "Random number between " + min + " and " + max + " is " + randomNo + ".");
  return randomNo;
};

var goTo = function(location){
  window.location.assign(location);
  console.log(consolePrefix + "Redirected to " + location + ".");
};

var moveTo = function(id,nTop,nLeft,delTime){
  var cRate = 1;
  var changeMade = false;
  console.log("hi");
  if(document.getElementById(id).style.left.indexOf("%")>0){ //% unit being used
    var strippedTop = document.getElementById(id).style.top.substring(0,document.getElementById(id).style.top.indexOf("%"));
    var strippedLeft = document.getElementById(id).style.left.substring(0,document.getElementById(id).style.left.indexOf("%"));
    oldTop = Math.round(window.innerHeight/100*strippedTop); //In px
    oldLeft = Math.round(window.innerWidth/100*strippedLeft);
  }
  else if(document.getElementById(id).style.left.indexOf("px")>0){
    oldTop = document.getElementById(id).style.top.substring(0,document.getElementById(id).style.top.indexOf("px"));
    oldLeft = document.getElementById(id).style.left.substring(0,document.getElementById(id).style.left.indexOf("px"));
  }
  
  if(nTop.indexOf("%")>0){
    var strippedTop = nTop.substring(0,nTop.indexOf("%"));
    var strippedLeft = nLeft.substring(0,nLeft.indexOf("%"));
    newTop = Math.round(window.innerHeight/100*strippedTop);
    newLeft = Math.round(window.innerWidth/100*strippedLeft)
  }

  if(newTop>oldTop){
    document.getElementById(id).style.top = parseInt(oldTop) + cRate + "px";
    changeMade = true;
  }
  
  if(newTop<oldTop){
    document.getElementById(id).style.top = parseInt(oldTop) - cRate + "px";
    changeMade = true;
  }
  
  if(newLeft>oldLeft){
    document.getElementById(id).style.left = parseInt(oldLeft) + cRate + "px";
    changeMade = true;
  }
  
  if(newLeft<oldLeft){
    document.getElementById(id).style.left = parseInt(oldLeft) - cRate + "px";
    changeMade = true;
  }
  
  if(changeMade==true){
    setTimeout(function () {
        moveTo(id,nTop,nLeft,delTime);
    }, delTime);
  }
  else{
    document.getElementById(id).style.top = ntop;
    document.getElementById(id).style.left = nLeft;
  }
};

var eTouching = function(obj1ID,obj2ID){
  var obj1 = document.getElementById(obj1ID);
  var obj2 = document.getElementById(obj2ID);
  
  var ah = parseInt(document.getElementById(obj1ID).style.height.substring(0,document.getElementById(obj1ID).style.height.indexOf("%")));
  var aw = parseInt(document.getElementById(obj1ID).style.width.substring(0,document.getElementById(obj1ID).style.width.indexOf("%")));
  
  var atlt = parseInt(document.getElementById(obj1ID).style.top.substring(0,document.getElementById(obj1ID).style.top.indexOf("%"))); //Top Left
  var atll = parseInt(document.getElementById(obj1ID).style.left.substring(0,document.getElementById(obj1ID).style.left.indexOf("%")));
  var atrt = parseInt(document.getElementById(obj1ID).style.top.substring(0,document.getElementById(obj1ID).style.top.indexOf("%"))); //Top Right
  var atrl = atll + aw;
  var ablt = atlt + ah; //Bottom Left
  var abll = parseInt(document.getElementById(obj1ID).style.left.substring(0,document.getElementById(obj1ID).style.left.indexOf("%")));
  var abrt = atlt + ah; //Bottom Right
  var abrl = atll + aw;
  
  var bh = parseInt(document.getElementById(obj2ID).style.height.substring(0,document.getElementById(obj2ID).style.height.indexOf("%")));
  var bw = parseInt(document.getElementById(obj2ID).style.width.substring(0,document.getElementById(obj2ID).style.width.indexOf("%")));
  
  var btlt = parseInt(document.getElementById(obj2ID).style.top.substring(0,document.getElementById(obj2ID).style.top.indexOf("%"))); //Top Left
  var btll = parseInt(document.getElementById(obj2ID).style.left.substring(0,document.getElementById(obj2ID).style.left.indexOf("%")));
  var btrt = parseInt(document.getElementById(obj2ID).style.top.substring(0,document.getElementById(obj2ID).style.top.indexOf("%"))); //Top Right
  var btrl = btll + bw;
  var bblt = btlt + bh; //Bottom Left
  var bbll = parseInt(document.getElementById(obj2ID).style.left.substring(0,document.getElementById(obj2ID).style.left.indexOf("%")));
  var bbrt = btlt + bh; //Bottom Right
  var bbrl = btll + bw;
  
  var result = false;
  
  if(abrl>=btll&&ablt>=btlt&&abrt<=bbrt&&abrl<=bbrl){ // Top Left Corner
    result = true;
  }
  
  if(abll<=btrl&&ablt>=btrt&&ablt<=bblt&&abll>=bbll){ // Top Right Corner
    result = true;
  }
  
  if(atrl>=bbll&&atrt<=bblt&&atrt>=btrt&&atrl<=btrl){ // Bottom Left Corner
    result = true;
  }
  
  if(atll<=bbrl&&atlt<=bbrt&&atlt>=btlt&&atll>=btll){ // Bottom Right Corner
    result = true;
  }
  return result;
};

var randomIDStr = function(length){
  var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  if(!length){ //If no length specidied, assume.
    length = 10;
  }
  var buildup = "";
  for(i=0;i<length;i++){
    buildup = buildup + alphabet[randomNumber(0,25)];
  }
  console.log(buildup);
  return buildup;
};

var delayScript = function(scripts,delayMS){
  var newE = document.createElement("script");
  newE.id = randomIDStr();
  remashoCreatedElements.push(newE.id);
  newE.innerHTML = "setTimeout(function(){" + scripts + "}," + parseInt(delayMS) + ");";
  document.body.appendChild(newE);
};