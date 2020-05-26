var drawing = [];
var canvas;
var currentPath = [];
var path;
var database;
var position;
var isDrawing = false

function setup(){
    canvas = createCanvas(500,500);
    canvas.mousePressed(startPath);
    canvas.parent('canvasContainer');
    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);
    database = firebase.database();
    canvas.mouseReleased(endPath);
}
function draw(){
    background(0);
    if(isDrawing){
    var place = {
    y:mouseY,
    x:mouseX
  }
  currentPath.push(place);
 }

  for(var i = 0; i < drawing.length; i++){
     var path = drawing[i]
     beginShape(); 
     stroke(255);
     strokeWeight(4);
     noFill();
     for(var j = 0; j < path.length; j++){
         vertex(path[j].x , path[j].y)
  }
  endShape();
}
 
}
function startPath(){
    isDrawing = true
   currentPath = [];
   drawing.push(currentPath);
}
function endPath(){
    isDrawing = false
}
function readPosition(data){
    position = data.val();
    path.x = position.x;
    path.y = position.y
}
function saveDrawing(){
    var ref = database.ref('drawings');
    var data = {
        name : "Vevan",
        drawing : drawing
    }
    var result = ref.push(data, dataSent);
    console.log(result.key);

    function dataSent(err, status){
     console.log(status);
    }
}