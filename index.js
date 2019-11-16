const canvas = document.getElementById("myCanvas"); 
const context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
let pixelSize = 64;
let arraycolor = ["#00ff00"];
context.fillStyle = "white";
context.fillRect(0,0,512,512);

var dataURL = localStorage.getItem(canvas);
var img = new Image;
img.src = dataURL;
img.onload = function () {
    context.drawImage(img, 0, 0);
};

let cur = document.getElementById("cur");
let pre = document.getElementById("pre");
context.fillStyle = "#00ff00";

let forfill = document.getElementsByClassName('icon fill');
let forchoose = document.getElementsByClassName('icon choose');
let forpencil = document.getElementsByClassName('icon pencil');

cur.addEventListener("input", function(){
    console.log('input change: ', cur.value);
    arraycolor.push(cur.value);

    context.fillStyle = arraycolor[arraycolor.length-1];
    cur.value = arraycolor[arraycolor.length-1];
    pre.style.background = arraycolor[arraycolor.length-2];
})

document.addEventListener('click', function(e){
    if(e.target.id === "red"){
        arraycolor.push("#ff0000");
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    }
    if(e.target.id === "blue"){
        arraycolor.push("#0000ff");
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    }
    if(e.target.id === "pre" && arraycolor.length > 1){
        arraycolor.pop();
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    }
    
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    console.log('arr: ',arraycolor);
})

document.addEventListener('keydown', function(event){
    if(event.code === "KeyP"){pencil();}
    if(event.code === "KeyB"){fill();}
    if(event.code === "KeyC"){choose();}
})

let isDrawing = false;
let lismd = function(event) {
    context.fillRect(Math.floor(event.layerX / pixelSize) * pixelSize, Math.floor(event.layerY / pixelSize) * pixelSize, pixelSize, pixelSize);
    isDrawing = true;
    localStorage.setItem(canvas, canvas.toDataURL());
}
let lismm = function() {
    if (isDrawing === true) {
        context.fillRect(Math.floor(event.layerX / pixelSize) * pixelSize, Math.floor(event.layerY / pixelSize) * pixelSize, pixelSize, pixelSize);
    }
}
let lismu = function() {
    if (isDrawing === true) {
        localStorage.setItem(canvas, canvas.toDataURL());
       isDrawing = false;
    }
}
    

let fillmd = function(e) {

    //console.log('fill color: ',colo);
    //context.fillRect(0,0,512,512);
    if(forfill[0].style.background === 'grey'){

        // parse from 16 into 10
        let curC = arraycolor[arraycolor.length-1];
        console.log('input -->',curC);
        let rgb = [parseInt(curC.substr(1, 2), 16), parseInt(curC.substr(3, 2), 16), parseInt(curC.substr(5, 2), 16), 255];
        //get imgData
        //var curpointcolorCanvas = context.getImageData(e.layerX, e.layerY, 1, 1);
        //console.log(rgb);
        console.log('for fill: ',rgb);
        //------------ start ---------------------------------------------------
        floodFill(context, e.layerX, e.layerY, rgb);

        function getPixel(imageData, x, y) {
          if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
            return [-1, -1, -1, -1];  // impossible color
          } else {
            const offset = (y * imageData.width + x) * 4;
            return imageData.data.slice(offset, offset + 4);
          }
        }
        
        function setPixel(imageData, x, y, color) {
          const offset = (y * imageData.width + x) * 4;
          imageData.data[offset + 0] = color[0];
          imageData.data[offset + 1] = color[1];
          imageData.data[offset + 2] = color[2];
          imageData.data[offset + 3] = color[0];
        }
        
        function colorsMatch(a, b) {
          return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        }
        
        function floodFill(ctx, x, y, fillColor) {
          // read the pixels in the canvas
          const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
          
          // get the color we're filling
          const targetColor = getPixel(imageData, x, y);
          
          // check we are actually filling a different color
          if (!colorsMatch(targetColor, fillColor)) {
          
            const pixelsToCheck = [x, y];
            while (pixelsToCheck.length > 0) {
              const y = pixelsToCheck.pop();
              const x = pixelsToCheck.pop();
              
              const currentColor = getPixel(imageData, x, y);
              if (colorsMatch(currentColor, targetColor)) {
                setPixel(imageData, x, y, fillColor);
                pixelsToCheck.push(x + 1, y);
                pixelsToCheck.push(x - 1, y);
                pixelsToCheck.push(x, y + 1);
                pixelsToCheck.push(x, y - 1);
              }
            }
            
            // put the data back
            ctx.putImageData(imageData, 0, 0);
          }
        }
        //------------ end ---------------------------------------------------
    }
    localStorage.setItem(canvas, canvas.toDataURL());
}

let choosemd = function(e) {
    let intovalue = '#';
    var imgData = context.getImageData(e.layerX, e.layerY, 1, 1);
    for(let i = 0; i < 3; i++){
        if(imgData.data[i] === 0)
            intovalue += '00';
        else
            intovalue += imgData.data[i].toString(16);
    }
    arraycolor.push(intovalue);
}
//function listener---------------------------------------------------------
function pencil(){ //onclick="pencil()"
    //remove
    canvas.removeEventListener('mousedown', fillmd, false);
    canvas.removeEventListener('mousedown', choosemd, false);
    //background
    forfill[0].style.background = 'none';
    forchoose[0].style.background = 'none';
    forpencil[0].style.background = 'grey';
    //add
    canvas.addEventListener('mousedown', lismd, false); 
    canvas.addEventListener('mousemove', lismm, false);
    canvas.addEventListener('mouseup', lismu, false);
 }
function fill(){
    //remove
    canvas.removeEventListener('mousedown', choosemd, false);

    canvas.removeEventListener('mousedown', lismd, false);
    canvas.removeEventListener('mousemove', lismm, false);
    canvas.removeEventListener('mouseup', lismu, false);
    //background
    forfill[0].style.background = 'grey';
    forchoose[0].style.background = 'none';
    forpencil[0].style.background = 'none';
    //add
    canvas.addEventListener('mousedown', fillmd, false);
}
function choose(){
    //remove
    canvas.removeEventListener('mousedown', fillmd, false);

    canvas.removeEventListener('mousedown', lismd, false);
    canvas.removeEventListener('mousemove', lismm, false);
    canvas.removeEventListener('mouseup', lismu, false);
    //background
    forfill[0].style.background = 'none';
    forchoose[0].style.background = 'grey';
    forpencil[0].style.background = 'none';
    //add
    canvas.addEventListener('mousedown', choosemd, false);
}
pencil();