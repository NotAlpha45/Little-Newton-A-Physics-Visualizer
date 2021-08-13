let t = 0;
let p = 200; 
let n ;
let wave = []
function setup() {
  createCanvas(1000,500);
  
  //text("Enter n here ", 380, 65);
  n = createInput();
  n.position(560, 200);
  n.size(50);
  
}
 
var mouseX=0;
function draw() {
  background(0,0,128);
  textSize(22);
  textStyle(NORMAL)
  text("Enter N:", 470, 65);
  translate(200,200);
  strokeWeight(2);
  noFill();
 
  let x=0;
  let y=0;
  let r =50 * (4 / (1*PI) );
 
  for( let i=1; i <= n.value() ; i++){
    let prevX = x;
    let prevY = y;
    let k = 2*i-1;
    r =80* (4 / (k*PI) );
 
   x +=   cos(k*t) *r;
   y +=   sin(k*t) *r;
 
    stroke(180);
  ellipse(prevX,prevY,2*r);
    stroke(180)
  ellipse(x,y,6);
    stroke(255,255,0)
  line(prevX,prevY,x,y);
 
}
 
  line(x,y,150,wave[0]);
  wave.unshift(y);
  stroke(173,255,47)
 
  beginShape();
  for(let i = 0 ; i < wave.length ; i++){
    vertex(i+150,wave[i]);
  }
  endShape();
  t-=0.05;
 
  }
