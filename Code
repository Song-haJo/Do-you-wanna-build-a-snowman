//Do you wanna build a snowman?

// terrain
var cols, rows;              
var scl = 20;
var w = window.innerWidth * 4.8;
var h = window.innerHeight * 2.5;
var terrain = [];
var flying = 0;
var flying2 = 0;        
let temp1 = 0;
let temp2 = 0;

// ball1
let sx = w / 2;
let sy = h / 2;
let ball = 100;
let sz = ball;

// ball2
let sx2 = w / 2 + 300;
let sy2 = h / 2 + 300;
let ball2 = 100;
let sz2 = ball2;

// ball
let check_ = 0;
let grow = 0.2;
let speed = 5;

// snow
var snownum = 500;
let snow = [];
let size_ = 1000; 

// terrain color
let xa;
let xb;
let xz;
let c, r, g;                  
let time = 0, timespeed=0.5;

//image
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

  for (let i = 0; i < snownum; i++)
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
  
  if (time < 100)
    time += timespeed;
  
// snow
  for (var x = 0; x < snownum; x++)
  {
    snow[x].move();
    snow[x].display();
  }

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
  if(sx2 < w && sx2 > 0 && sy2 < h && sy2 > 0)
    sphere(ball2);
  keyPressed();
  pop();
  
  check();    //두 눈덩이가 만나는지 확인
}       

class Snow {
  constructor(i, j, k) {
    this.i = random(-size_, w + size_);
    this.j = random(-size_, h + size_);
    this.k = random(400, 2000);
  }
  move() {
    let v1 = 0, v2 = 0;    //바람의 방향
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

function keyPressed() {
    if (key == 'w') {
      ball += grow;
      sz = ball;
      if (sy < h)
        sy += speed;
      flying += 0.1;
      temp1 = flying;
      
      sy2 -= speed;
    }
    if (key == 's') {
      ball += grow;
      sz = ball;
      if (sy > 0)
        sy -= speed;
      flying -= 0.1;
      temp1 = flying;
      
      sy2 += speed;
    }
  if (key == 'a') {
      ball += grow;
      sz = ball;
      if (sx < w)
        sx += speed;
      flying2 += 0.1; 
      temp2 = flying2;
    
      sx2 -= speed;
    }
    if (key == 'd') {
      ball += grow;
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
  if(o <= (ball + ball2))    // 눈덩이끼리 만나면 눈덩이, 지형의 움직임, 바람을 멈춥니다.
  {  
    speed = 0;
    flying = 0;
    flying2 = 0;
    v1 = 0;
    v2 = 0;
    
    sx2 = sx;
    sy2 = sy;
    if(check_ == 0)
    {
      grow = 0;
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
