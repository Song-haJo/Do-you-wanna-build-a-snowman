//구글에서 '눈오는 하늘' 검색해서 나온 이미지를 추가했습니다.
//아직 완성도가 높진 않으니 의견 바랍니다.
//슬라이더 디폴트 값을 조절하여 기본 구도를 조정했습니다.

var cols, rows;               //terrain variables
var scl = 20;
var w = window.innerWidth*3;
var h = window.innerHeight*2.5;
var terrain = [];
var flying = 0;
var flying2 = 0;              //add flying2
let sx=w/2;                   //ball variables
let sy=h/2;
let ball=100;
let temp1=0;
let temp2=0;

let speed=5;
var num = 500;
let xa;
let xb;
let xz;
let snow = [];
let c, r, g;                  //color variables
let time = 0, timespeed=0.3;
let img;

function preload() {
  img = loadImage("https://upload2.inven.co.kr/upload/2016/12/22/bbs/i13434774584.gif");     // img here!
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


  background(146, 164, 184);                        // background color here!

  push();
  rotateX(-PI/10);
  translate(0, 0, 1000);
  image(img, -2500, -2000, 5000, 2000);
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
      b = c-20  + time;
      fill(r, g, b);
      noStroke();
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }

  //snow
  for (var x=0; x<num; x++)
  {
    snow[x].move();
    snow[x].display();
  }


  if (time<70)
    time += timespeed;

  push();
  ambientLight(160);                      //light
  pointLight(255, 255, 255, 0, -5000, 0); //deleted mouse variables
  specularMaterial("White");
  shininess(150);
  translate(sx, sy, ball);                //ball
  sphere(ball);
  let o = Math.sqrt(((sx-w/4)*(sx-w/4)+(sy-h/4)*(sy-h/4)+(ball-50)*(ball-50)));
  if (keyIsPressed==true)
  {
    speed = 5;
    if (key=='w')
      sy+=speed;
    if (key=='s')
      sy-=speed;
    if (key=='a')
      sx+=speed;
    if (key=='w')
      sx-=speed;
  }
  if (o<=(ball+100))
    speed = 0;

  keyPressed();
  pop();
  push();
  ambientLight(160);
  pointLight(255, 255, 255, 0, -5000, 0);
  translate(w/4, h/4, 50);
  fill(225, 0, 225);
  sphere(100);
  pop();
}

class Snow {
  constructor(i, j, k) {
    this.i = random(0, w);
    this.j = random(0, h);
    this.k = random(400, 2000);
  }
  move() {
    this.k -= 5;
    if (this.k<=0)
    {
      this.i = random(0, w);
      this.j = random(0, h);
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
  let o = Math.sqrt(((sx-w/4)*(sx-w/4)+(sy-h/4)*(sy-h/4)+(ball-50)*(ball-50)));
  if (o<=(ball+100))
  {
    sx=sx;
    sy=sy;
  } else {
    if (key == 'w') {
      ball += 0.2;
      if (sy < h)
        sy += speed;
      flying -= 0.01;
      temp1 = flying;
    }
    if (key == 's') {
      ball+=0.2;
      if (sy>0)
        sy-=speed;
      flying += 0.01;
      temp1 = flying;
    }
    if (key == 'a') {
      ball+=0.2;
      if (sx<w)
        sx+=speed;
      flying2 -= 0.01; //temp2의 flying 값을 temp1과 분리했습니다.
      temp2 = flying2;
    }
    if (key == 'd') {
      ball += 0.2;
      if (sx>0)
        sx-=speed;
      flying2 += 0.01;
      temp2 = flying2;
    }
    if (key == 20)  //stop - spacebar
    {
      sx=sx;
      sy=sy;
    }
  }
}
