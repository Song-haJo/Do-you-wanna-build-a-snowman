//ambientLight를 활용한 코드입니다.
/*ambeintMaterial을 통해 흡수 할 색을 설정 할 수 있으며 ambientMaterial(255,0,0)의 경우 빨간색만을 흡수하기 때문에 
ambientLight에 빨간색이 포함되어 있지 않으면 까만색으로 나타나집니다. ambientMaterial(255)의 경우 ambientMaterial(255,255,255)와 동일합니다.*/ 
//아래의 코드로 위의 특성을 확인해 볼 수 있습니다. 화면 밑에 칸마다 R G B 값을 입력한 후 버튼을 누르면 ambientLight에 적용됩니다.

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

let value_x;
let value_y;
let value_z;
let vx = 255;
let vy = 255;
let vz = 255;
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
  let button = createButton('Ambient value');
  value_x = createInput();
  value_y = createInput();
  value_z = createInput();
  button.mousePressed(fn);
}
function fn(){
  vx = value_x.value();
  vy = value_y.value();
  vz = value_z.value();
}
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
  ambientLight(vx,vy,vz);
  background(0);
  translate(0, 50);
  rotateX(PI / 3);
  fill(200, 200, 200, 150);
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      if(y%2==0)
        ambientMaterial(255,0,0);
      else if(y%3==0)
        ambientMaterial(0,255,0);
      else
        ambientMaterial(0,0,255);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
