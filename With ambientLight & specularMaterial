//snow_1을 수정하여 만들었습니다.
//눈의 색상을 조정하였으며, 조명을 추가했습니다.
//조명은 현재 마우스로 조명이 조절되는 상태이지만 슬라이더로 바꿀지 고민 중입니다. 의견 바랍니다.
//참고: https://p5js.org/reference/#/p5/specularMaterial

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
var flying = 0;

var terrain = [];

var num = 500;
let xa;
let xb;
let xz;
let snow = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
  
  xa = createSlider(-800,800,300);
  xb = createSlider(-800,600,400);
  xz = createSlider(-800,800,0);
  
  for(let i = 0; i < num; i++)
    snow.push(new Snow());
}



//let hv = 500, i = 0, j = 0;
function draw() {
  let vx = map(xa.value(),0,width,-800,800);
  let vy = map(0,xb.value(),height,100,800);
  let vz = map(xz.value(),0,height/2,-800,800);
  camera(vx,vy,vz,0,0,0,0,1,0);
  
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


  background(0);
  translate(0, 50);
  rotateX(PI / 3);
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
  for(var x =0; x<num; x++)
  {
    snow[x].move();
    snow[x].display();
  }
}

class Snow{
  constructor(i,j,k){
    this.i = random(0,w);
    this.j = random(0,h);
    this.k = random(100,500);
  }
  move(){
    this.k -= 5;
    if(this.k<=0)
    {
      this.i = random(0,w);
      this.j = random(0,h);
      this.k = random(400,500);
    }
  }
  display(){
    push();
    noStroke();
    translate(this.i,this.j,this.k);
    ambientLight(60);
    let locX = mouseX - width / 2;  //should be controled with sliders
    let locY = mouseY - height / 2;
    pointLight(255, 255, 255, locX, locY, 50);
    specularMaterial(255);
    shininess(250);
    sphere(10);
    pop();
  }
}
