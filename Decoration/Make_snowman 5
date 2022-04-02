//1번 공만 움직일 수 있게 변경 했고 2번 공도 1번 공의 움직임대로 움직이도록 바꿨습니다.
//2번 공이 지형 밖으로 나가면 사라지게 수정 했습니다.
//밑에 바뀐 코드 부분에 간략히 주석을 달아 놨습니다. 궁금한 부분이 있으면 말씀 부탁드립니다!

// 커져가는 눈덩이의 크기에 비례해서 단추위치와 크기를 설정했습니다.


var cols, rows;              
var scl = 20;
var w = window.innerWidth * 4.8;
var h = window.innerHeight * 2.5;
var terrain = [];
var flying = 0;
var flying2 = 0;              
let sx = w / 2;                   
let sy = h / 2;
let ball = 100;
let temp1 = 0;
let temp2 = 0;


// 1번 공: 움직일 수 있는 공
// 2번 공: 가만히 있는 공
let sx2 = w / 2 + 300;
let sy2 = h / 2 + 300;    // 2번 공 x,y 좌표
let ball2 = 100;          // 2번 공 크기
let check_ = 0;           // 눈덩이가 만나면 바람을 멈춥니다. z좌표 계산에도 쓰입니다.
let ballspeed = 0.2;      // 눈덩이가 커지는 속도

let sz = ball;      // 각 공의 z좌표
let sz2 = ball2;    // 구의 z좌표와 구의 크기가 동일한 변수를 사용하고 있어서 분리했습니다.

var num = 500;
let xa;
let xb;
let xz;
let snow = [];
let c, r, g;                  
let time = 0, timespeed=0.5;
let img;

function preload() {
  img = loadImage("https://upload2.inven.co.kr/upload/2016/12/22/bbs/i13434774584.gif");    
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

// sliders
  xa = createSlider(-1000, 1000, 400);
  xb = createSlider(-800, 800, 700);
  xz = createSlider(-800, 800, -500);

  for (let i = 0; i < num; i++)
    snow.push(new Snow());
}

function draw() {
// camera
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

// background color & image
  background(146,164,184);
  push();
  rotateX(-PI/10);
  translate(0,0,1000);
  image(img, -2500, -2000, 5000, 2000);   
  pop();
  
  translate(0, 50);
  rotateX(PI*0.4);
  fill(200, 200, 200, 150);
  
// terrain
  translate(-w / 2, -h / 2);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      c = terrain[x][y];          
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
  
// snow
  for (var x = 0; x < num; x++)
  {
    snow[x].move();
    snow[x].display();
  }
  
  
  if (time < 100)	// 70 -> 100
    time += timespeed;

// ball1
  push();
  ambientLight(160);                     
  pointLight(255, 255, 255, 0, -5000, 0);
  specularMaterial("White");
  shininess(150);
  translate(sx, sy, sz);               
  sphere(ball);
  keyPressed();
  pop();
  
// ball2
  push();
  ambientLight(160);                      
  pointLight(255, 255, 255, 0, -5000, 0);
  specularMaterial("White");
  shininess(150);
  translate(sx2, sy2, sz2);     
  if(sx2 < w && sx2 > 0 && sy2 < h && sy2 > 0)  //지형 밖으로 나가면 사라짐.
    sphere(ball2);
  keyPressed();
  pop();
  
  check();    //두 눈덩이가 만나는지 확인
}
  
let size_ = 1000;        

class Snow {
  constructor(i, j, k) {
    this.i = random(-size_, w + size_);
    this.j = random(-size_, h + size_);
    this.k = random(400, 2000);
  }
  move() {
    let v1 = 0, v2 = 0;
    if(check_== 0){
    if(key == 'w')
    {
      v2 = -10;
      v1 = 0;
    }
    if(key == 's')
    {
      v2 = 10;
      v1 = 0;
    }
    if(key == 'a')
    {
      v1 = -10; 
      v2 = 0;
    }
    if(key == 'd')
    {
      v1 = 10;
      v2 = 0;
    }
    }
    this.i += v1;
    this.j += v2;
    this.k -= 10;
    if (this.k <= 0)
    {
        this.i = random(-size_, w + size_);
        this.j = random(-size_, h + size_);
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
function keyPressed() {       // 1번을 누른 경우, 2번을 누른 경우를 구분해서 공을 움직입니다.
    if (key == 'w') {
      //1번 공
      ball += ballspeed;
      sz = ball;    // z좌표를 갱신합니다.
      if (sy < h)
        sy += speed;
      flying += 0.1;
      temp1 = flying;
      //2번 공
      sy2 -= speed;
    }
    if (key == 's') {
      ball += ballspeed;
      sz = ball;
      if (sy > 0)
        sy -= speed;
      flying -= 0.1;
      temp1 = flying;
      
      sy2 += speed;
    }
  if (key == 'a') {
      ball += ballspeed;
      sz = ball;
      if (sx < w)
        sx += speed;
      flying2 += 0.1; 
      temp2 = flying2;
    
      sx2 -= speed;
    }
    if (key == 'd') {
      ball += ballspeed;
      sz = ball;
      if (sx > 0)
        sx -= speed;
      flying2 -= 0.1;
      temp2 = flying2;
      
      sx2 += speed;
    }
    if (key == 20)  // [spacebar] stop
    {
      sx=sx;
      sy=sy;
      sx2=sx2;
      sy2=sy2;
    }
}
function check(){
  let o = Math.sqrt(((sx-sx2)*(sx-sx2) + (sy-sy2)*(sy-sy2) + (ball-ball2)*(ball-ball2)));
  if(o <= (ball + ball2))    // 눈덩이가 만나면 눈덩이, 지형의 움직임, 바람을 멈춥니다.
  {  
    speed = 0;
    flying = 0;
    flying2 = 0;
    v1 = 0;
    v2 = 0;
    
    sx2 = sx;
    sy2 = sy;
    if(check_ == 0)    //check 함수가 계속 돌아가기 때문에 z좌표 계산을 한번만 하기 위해서 추가 했습니다.
    {
      ballspeed = 0;
      sz2 = 2 * sz + sz2;
      check_ = 1;
    }

// 윗 눈덩이 눈, 코
    push();
    translate(sx2, sy2 - ball2/2, sz2);
    rotateX(PI);
    fill(230, 0, 0);   // 눈사람 코 색깔
    cone(50, 200, 24);
    translate(40, 30, -40);
    fill(0);
    sphere(15);
    translate(-80, 0, -20);
    sphere(15);
    pop();
    
// 아래 눈덩이 단추 3개
    push();
    fill(0);
    translate(sx, sy, sz);
    let side;
    side = Math.sqrt(ball*ball - ball/2 * ball/2);
    translate(0, -side, ball/2);
    sphere(ball / 10);
    translate(0, -ball + side, -ball / 2)
    sphere(ball / 10);
    translate(0, ball-side, -ball/2)
    sphere(ball / 10);
    pop();
    
// 눈사람 모자
    push();
    fill(0);
    translate(sx2, sy2, sz2 + ball2);
    rotateX(PI / 2);
    cylinder(110, 20, 24);
    translate(0, 55, 0);
    cylinder(90, 90, 24);
    pop();
  
//오른쪽 나뭇가지
    push();
    let hyside;
    hyside = Math.sqrt(3);
    fill(170, 50, 0);
    translate(sx, sy, sz);
    translate(-ball/2*hyside - ball/4*hyside, 0, ball/2);
    rotateZ(PI / 2);
    rotateX(PI / 6);
    cylinder(ball/20, ball, 24);
    pop();
    
//왼쪽 나뭇가지
    push();
    let hyside2;
    hyside2 = Math.sqrt(3);
    fill(170, 50, 0);
    translate(sx,sy,sz);
    translate(ball/2*hyside2 + ball/4*hyside2, 0, ball/2);
    rotateZ(PI / 2);
    rotateX(-PI / 6);
    cylinder(ball/20, ball, 24);
    pop();
  }
}
