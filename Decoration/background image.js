//구글에서 '눈오는 하늘' 검색해서 나온 이미지를 추가했습니다.
//아직 완성도가 높진 않으니 의견 바랍니다.
//슬라이더 디폴트 값을 조절하여 기본 구도를 조정했습니다.
//speed 변수가 빠져있어서 추가했고 flying이 0.01이라 지형이 움직이는게 잘 안보여서 0.1로 수정했습니다. + 지형 색깔이 살짝 초록색 느낌이나서 흰색으로 보이게 수정했습니다.

var cols, rows;               //terrain variables
var scl = 20;
var w = window.innerWidth*4.8;
var h = window.innerHeight*2.5;
var terrain = [];
var flying = 0;
var flying2 = 0;              //flying2에 대한 설명을 
let sx=w/2;                   //ball variables
let sy=h/2;
let ball=100;
let temp1=0;
let temp2=0;


var num = 500;
let xa;
let xb;
let xz;
let snow = [];
let c, r, g;                  //color variables
let time = 0, timespeed=0.3;
let img;

function preload() {
  img = loadImage("https://upload2.inven.co.kr/upload/2016/12/22/bbs/i13434774584.gif");    // image here!
}


function setup() {
  createCanvas(window.innerWidth-100, window.innerHeight-50, WEBGL);
  cols = w / scl;
  rows = h / scl;
  
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }

//sliders
  xa = createSlider(-1000, 1000, 400);
  xb = createSlider(-800, 800, 700);
  xz = createSlider(-800, 800, -500);

  for (let i = 0; i < num; i++)
    snow.push(new Snow());
}

function draw() {
//camera
  let vx = map(xa.value(), 0, width, -800, 800);
  let vy = map(0, xb.value(), height, 100, 800);
  let vz = map(xz.value(), 0, height/2, -800, 800);
  camera(vx, vy, vz, 0, 0, 0, 0, 1, 0);

  var yoff = temp1;
  for (var y = 0; y < rows; y++) {
    var xoff = temp2;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(146,164,184);                // background color
  
  push();
  rotateX(-PI/10);
  translate(0,0,1000);
  image(img, -2500, -2000, 5000, 2000);   // image location & direction
  pop();
  
  translate(0, 50);
  rotateX(PI*0.4);
  fill(200, 200, 200, 150);
  
  //terrain
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      c = terrain[x][y];          //terrain color
      c = map(c, -100, 100, 0, 255);
      r = c-20 + time;
      g = c+30 + time/2;
      b = c-20 + time;
      fill(r, g, b);
      noStroke();
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
  
  //snow
  for (var x = 0; x < num; x++)
  {
    snow[x].move();
    snow[x].display();
  }
  
  
  if (time < 100)// 70 -> 100
    time += timespeed;
    
  push();
  ambientLight(160);                      //light
  pointLight(255, 255, 255, 0, -5000, 0);
  specularMaterial("White");
  shininess(150);
  translate(sx, sy, ball);                //ball
  sphere(ball);
  keyPressed();
  pop();
}
  
let size_ = 1000;         //원래 지형 크기 안에서만 눈을 생성하면 방향 키를 눌러 눈이 움직이고 다시 생성될 때 부자연스러워서 범위를 생성되는 범위를 넓혔습니다.

class Snow {
  constructor(i, j, k) {
    this.i = random(-size_, w+size_);
    this.j = random(-size_, h+size_);
    this.k = random(400, 2000);
  }
  move() {
    let v1 = 1, v2 = 1;   //방향키를 누르면 값이 변하고 x좌표인 this.i와 y좌표인 this.j에 더해서 눈이 움직이게 합니다.
    if(key=='w')
      v2 = -10;
    if(key=='s')
      v2 = 10;
    if(key=='a')
      v1 = -10; 
    if(key=='d')
      v1 = 10;
    this.i += v1;
    this.j += v2;
    this.k -= 10;
    if (this.k<=0)
    {
        this.i = random(-size_, w+size_);
        this.j = random(-size_, h+size_);
        this.k = random(1000, 2000);
    }
  }
  display() {
    push();
    noStroke();
    translate(this.i, this.j, this.k);
    ambientLight(160);
    let locX = mouseX - width / 2;
    let locY = mouseY - height / 2;
    pointLight(255, 255, 255, locX, locY, 50);
    specularMaterial(255);
    shininess(250);
    sphere(10);
    pop();
  }
}

let speed = 5;
function keyPressed() {
  if (key == 'w') {
    ball += 0.2;
    if (sy < h)
      sy += speed;
    flying -= 0.1;
    temp1 = flying;
  }
  if (key == 's') {
    ball += 0.2;
    if (sy > 0)
      sy -= speed;
    flying += 0.1;
    temp1 = flying;
  }
  if (key == 'a') {
    ball+=0.2;
    if (sx < w)
      sx += speed;
    flying2 -= 0.1; //temp2의 flying 값을 temp1과 분리했습니다.
    temp2 = flying2;
  }
  if (key == 'd') {
    ball += 0.2;
    if (sx > 0)
      sx -= speed;
    flying2 += 0.1;
    temp2 = flying2;
  }
  if (key == 20)  //stop - spacebar
  {
    sx=sx;
    sy=sy;
  }
}
