function addHandler(element, type, handler){
if (element.addEventListener){
    element.addEventListener(type, handler, false);
  } else if (element.attachEvent){
    element.attachEvent("on" + type, handler);
  } else {
    element["on" + type] = handler;
  }
}
var number = parseInt(document.getElementById('number-input').value);
function getNumber() {
  alert(number);
  if(!isNaN(number)) {
    return number; //结束函数
  }
  
}

var container = document.getElementById("container");


function createDom(fx,n) {
  var div = document.createElement("div");
  var textNode = document.createTextNode(""+getNumber());
  div.appendChild(textNode);

  addHandler(div,'click',function () {
    container.removeChild(this);
  });

  if (fx === "left") {
    container.insertBefore(div,container.firstChild);
  } else if(fx === "right") {
    container.insertBefore(div,container.lastChild);
  }
}

function deleteDom(fx) {
  var d = '';
  if(fx === "left") {
    d = container.removeChild(container.firstElementChild);
    alert(d.innerHTML);
  } else if(fx === "right") {
    d = container.removeChild(container.lastElementChild);
    alert(d.innerHTML);
  }
}


var lIn = document.getElementById("left-in");
var rIn = document.getElementById("right-in");
var lOut = document.getElementById("left-out");
var rOut = document.getElementById("right-out");
addHandler(lIn,'click',leftIn);
addHandler(rIn,'click',rightIn);
addHandler(lOut,'click',leftOut);
addHandler(rOut,'click',rightOut);

function leftIn() {
  number = parseInt(document.getElementById('number-input').value);
  createDom("left");
}

function rightIn() {
  number = parseInt(document.getElementById('number-input').value); 
  createDom("right");
}

function leftOut() {
  deleteDom("left");
}

function rightOut() {
  deleteDom("right");  
}
