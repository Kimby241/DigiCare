var repere = {
  p1:[],
  p2:[],
  p3:[],
  p4:[],
  surface:function () {
    return Math.abs((((this.p1.x - this.p3.x) * (this.p2.y - this.p4.y)) - ((this.p2.x - this.p4.x) * (this.p1.y - this.p3.y))) / 2);
  }
}
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var curColor = colorGreen;
var clickColor = new Array();

/* Ajout des variables pour les couleurs */
var fillBase = "rgba(241, 148, 111, 0.55)";
var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var curColor = colorPurple;
var clickColor = new Array();

/* Ajout variables couleur */
var curSize = "normal";
var clickSize = new Array();
var edit = false;

/* Image de fond */
var outlineImage = new Image();

/*var x1;
var x2;
var x3;
var x4;

var y1;
var y2;
var y3;
var y4;*/

var editRep = true;

var img = document.getElementById("lard");

/* Set color */
function SetGreen () {
  curColor = colorGreen;
}

function SetPurple () {
  curColor = colorPurple;
}

function SetYellow () {
  curColor = colorYellow;
}

function SetBrown () {
  curColor = colorBrown;
}

/* Set size */
function SetSmall () {
  curSize = "small";
}

function SetNormal () {
  curSize = "normal";
}

function SetLarge () {
  curSize = "large";
}

function SetHuge () {
  curSize = "huge";
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickSize.push(curSize);
  clickColor.push(curColor);
}

function clearC()
{
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickSize = new Array();
  clickColor = new Array();
  it = 1;
  curColor = colorPurple;
  curSize = "normal";
  clearCanvas();
}

function clearCanvas()
{
  context.clearRect(0, 0, canvasWidth, canvasHeight);
}

var it = 1;
var blocked = 1;

$(document).ready(function() {
    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if (img.width > img.height)
    {
      document.getElementById("canvas").style.backgroundSize = "100% auto";
    }
    else
    {
      document.getElementById("canvas").style.backgroundSize = "auto 100%";
    }
    if(typeof G_vmlCanvasManager != 'undefined') {
      canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d");

    // Load images
    // -----------
    //outlineImage.src = "images/bl.jpg";
    outlineImage.onload = function() { 
        resourceLoaded();
      };
    

    // Add mouse events
    // ----------------
    $('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
    
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    

    if (it == 1) 
      { //x1 = mouseX; y1 = mouseY; it++;
        it++;
        repere.p1.x = mouseX;
        repere.p1.y = mouseY;
        redraw();
      }
    else if (it == 2) 
      { //x2 = mouseX; y2 = mouseY; it++;
        it++;
        repere.p2.x = mouseX;
        repere.p2.y = mouseY;
        redraw();
      }
    else if (it == 3) 
      { //x3 = mouseX; y3 = mouseY; it++;
        it++;
        repere.p3.x = mouseX;
        repere.p3.y = mouseY;
        redraw();
      }
    else if (it == 4)
      { //x4 = mouseX; y4 = mouseY; it++;
        it++;
        repere.p4.x = mouseX;
        repere.p4.y = mouseY;
        //var val1 = Math.abs((((x1 - x3) * (y2 - y4)) - ((x2 - x4) * (y1 - y3))) / 2);
        var div = document.getElementById("coord");
        node = document.createTextNode("val = " + repere.surface());
        para = document.createElement("p");
        para.appendChild(node);
        div.appendChild(para);
        curColor = colorGreen;
        curSize = "small";
        redraw();
        drawRep();
      }
    else
    {
      redraw();
      drawRep();
    }
    
    });

    $('#canvas').mousemove(function(e){
      if(paint && blocked == 0){
        if(it > 4 && edit == false)
          curSize = "small";
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
        drawRep();
      }
    });

    $('#canvas').mouseup(function(e){
      if (blocked == 1 && it > 4)
        blocked = 0;
      paint = false;
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
    });
    outlineImage.src = "images/bl.jpg";
});

function drawRep() 
{
  context.beginPath();              
  context.lineWidth = "1";
  context.strokeStyle = "rgba(241, 148, 111, 0.55)";
  context.moveTo(repere.p1.x, repere.p1.y);
  context.lineTo(repere.p2.x, repere.p2.y);
  context.lineTo(repere.p3.x, repere.p3.y);
  context.lineTo(repere.p4.x, repere.p4.y);
  context.fillStyle = "rgba(241, 148, 111, 0.55)";
  context.fill();
  context.stroke();
}      

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  /*context.strokeStyle = "#df4b26";*/
  clearCanvas();
  context.lineJoin = "round";
  /*context.lineWidth = 5;*/
  var radius;
  for(var i=0; i < clickX.length; i++) {
    if(clickSize[i] == "small"){
      radius = 2;
    }else if(clickSize[i] == "normal"){
      radius = 5;
    }else if(clickSize[i] == "large"){
      radius = 10;
    }else if(clickSize[i] == "huge"){
      radius = 20;
    }else{
      alert("Error: Radius is zero for click " + i);
      radius = 0; 
    }  

    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.strokeStyle = clickColor[i];

     context.lineWidth = radius;
     context.stroke();
  }
}

function is_green (tab, pos) 
{
  return (((tab[pos + 0] == 101) && 
                  (tab[pos + 1] == 155) && 
                 (tab[pos + 2] == 65) && 
                 (tab[pos + 3]== 255)));
}

function SaveResult ()
{
  var pos;
  var deb = false;
  var fin = false;
  var min = -1;
  var max = -1;
  var imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    for (var i=0; i< (context.canvas.width * 4); i +=4)
        {
          for (var j=0; j< (context.canvas.height * 4); j +=4) 
          {

            pos = (context.canvas.width * i) + j;
            if (is_green(imgData.data, pos))
            {
              if (!deb)
                deb = true;
              else
              {
                if (min != -1 && !fin)
                {
                  max = pos;
                  for (var x = min; x < max; x += 4)
                  {
                    imgData.data[x + 0]= 200;
                    imgData.data[x + 1]= 200;
                    imgData.data[x + 2]= 100;
                    imgData.data[x + 3]= 125;
                  }
                  fin = true;
                  min = -1;
                }
              }
            }
            else
            {
              if (deb)
              {
                if (fin)
                {
                  deb = false;
                  fin = false;
                }
                else
                {
                  if (min == -1)
                    min = pos;
                }
              }
            }
          }
          deb = false;
          fin = false;
          min = -1;
        }

    context.putImageData(imgData, 0, 0);
}