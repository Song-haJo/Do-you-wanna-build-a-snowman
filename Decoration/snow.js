//3차원 지형에 눈이 내리는 코드입니다.
//클래스를 사용했으며 눈의 크기는 display에 sphere(x)을 수정하면 되고 떨어지는 속도는 move()에 this.k-=5; 부분을 수정하면 됩니다. num을 수정하면 눈의 개수를 바꿀 수 있습니다.
//클래스 관련 설명은 밑의 사이트를 통해 확인 가능합니다.
//https://p5js.org/ko/examples/objects-array-of-objects.html

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
    sphere(10);
    pop();
  }
}
