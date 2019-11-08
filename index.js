

function showImg(){
    const x4 = document.getElementById('x4')
    x4.style.backgroundColor = 'rgb(227, 229, 233)'
    const x32 = document.getElementById('x32')
    x32.style.backgroundColor = 'rgb(227, 229, 233)'


    //let xi = document.getElementById('img');
    var canvas = document.getElementById("myCanvas"), 
    context = canvas.getContext("2d");

    var img = new Image();
    img.src = 'data/image.png';

    img.onload = function() {
    context.drawImage(img, 0, 0, 512, 512);
    };

    //backgraund click
    const i = document.getElementById('img')
    i.style.backgroundColor = 'grey'
}
function showx4(){
    const i = document.getElementById('img')
    i.style.backgroundColor = 'rgb(227, 229, 233)'
    const x32 = document.getElementById('x32')
    x32.style.backgroundColor = 'rgb(227, 229, 233)'


    //let x4 = document.getElementById('x4');
    const map4 = [
        ["#00BCD4", "#FFEB3B","#FFEB3B","#00BCD4"],
        ["#FFEB3B", "#FFC107","#FFC107","#FFEB3B"],
        ["#FFEB3B", "#FFC107","#FFC107","#FFEB3B"],
        ["#00BCD4", "#FFEB3B","#FFEB3B","#00BCD4"]
    ];
    
    const canvas = document.getElementById("myCanvas"); 
    const context = canvas.getContext("2d");

    width = map4[0].length; 
    height = map4.length;
    var cellSize = 128;
    
    canvas.width = 4 * cellSize;
    canvas.height = 4 * cellSize;
    
    for(var row = 0; row < height; row++) {
        for(var col = 0; col < width; col++) {
            context.fillStyle = map4[row][col];
            context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }

    //backgraund click
    const x4 = document.getElementById('x4')
    x4.style.backgroundColor = 'grey'
}
function showx32(){
    const i = document.getElementById('img')
    i.style.backgroundColor = 'rgb(227, 229, 233)'
    const x4 = document.getElementById('x4')
    x4.style.backgroundColor = 'rgb(227, 229, 233)'
    //let x32 = document.getElementById('x32');


    const canvas = document.getElementById("myCanvas"); 
    const context = canvas.getContext("2d");

    //var myRequest = new Request('data/32x32.json');
fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json')//(myRequest)
    .then(response => response.json())
    .then(json => {
        width = json[0].length; 
        height = json.length;
        var cellSize = 16;
        canvas.width = 32 * cellSize;
        canvas.height = 32 * cellSize;
        
        for(var row = 0; row < height; row++) {
            for(var col = 0; col < width; col++) {
                context.fillStyle = "rgba("+json[row][col]+")";
                context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    })
    //backgraund click
    const x32 = document.getElementById('x32')
    x32.style.backgroundColor = 'grey'
}

/*
xi.addEventListener('click', ()=>{
    const i = document.getElementById('img')
    i.style.backgroundColor = 'grey'
})

x4.addEventListener('click', ()=>{
    const i = document.getElementById('x4')
    i.style.backgroundColor = 'grey'
})

x32.addEventListener('click', ()=>{
    const i = document.getElementById('i')
    i.src = '32x32.js';
})*/