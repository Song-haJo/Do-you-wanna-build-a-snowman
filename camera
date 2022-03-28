//camera는 (x, y, z, centerX, centerY, centerZ, upX, upY, upZ)로 이루어져 있습니다.
//x, y, z는 카메라의 위치 그 뒤의 3개는 카메라가 바라보는 곳 마지막 3개는 카메라로부터 위쪽 방향의 x, y, z 성분입니다.
//createSlider와 map을 이용해 3차원 지형을 보는 코드입니다.

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

let xa;
let xb;
let xz;
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
  xa = createSlider(-800,800,0);
  xb = createSlider(-800,600,-100);
  xz = createSlider(-800,800,0);
}

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
}
