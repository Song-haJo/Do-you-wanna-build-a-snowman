//https://p5js.org/ko/reference/#/p5/camera 를 기존 terrain 코드에 넣어봤습니다.
//wsad로 구를 움직일 수 있습니다. space로 멈출 수 있습니다.


var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
let sliderGroup = [];
let X;
let Y;
let Z;
let centerX;
let centerY;
let centerZ;
var flying = 0;

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var i = 0; i < 6; i++) {
    if (i === 2) {
      sliderGroup[i] = createSlider(10, 400, 200);
    } else {
      sliderGroup[i] = createSlider(-400,400, 0);
    }
    h = map(i, 0, 6, 5, 85);
    sliderGroup[i].position(10, height + h);
    sliderGroup[i].style('width', '80px');
  }
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}
let sx = 0, sy = 0;
function draw() {

  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

translate(0, 50);
  rotateX(PI / 3);

  translate(-w / 2, -h / 2);
  background(0);
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  pointLight(250,250,0,mouseX-width/2,mouseY-height/2,50);
  noStroke();
  translate(sx,sy,1);
  normalMaterial();
  sphere(40);
  X = sliderGroup[0].value();
  Y = sliderGroup[1].value();
  Z = sliderGroup[2].value();
  centerX = sliderGroup[3].value();
  centerY = sliderGroup[4].value();
  centerZ = sliderGroup[5].value();
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);
  stroke(255);
  keyPressed();
}
function keyPressed(){
  if(key=='w')
    sx-=5;
  if(key=='s')
    sx+=5;
  if(key=='a')
    sy+=5;
  if(key=='d')
    sy-=5;
  if(key==20)//stop - spacebar
    {
      sx=sx;
      sy=sy;
    }
}
