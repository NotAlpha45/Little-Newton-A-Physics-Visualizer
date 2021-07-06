let r= 4

let y;

let am , pe , ph ;
let amf, pef, phf ;

let am2 , pe2 , ph2 ;
let amf2, pef2, phf2 ;

let start = false;
 
function setup() {
  createCanvas(650,1000);
  //angleMode(DEGREES);

  am = createInput();
  am.position(550, 190);
  am.size(50);
  
  pe = createInput();
  pe.position(550, 220);
  pe.size(50);
  
  ph  = createInput();
  ph.position(550, 250);
  ph.size(50);
  
  am2 = createInput();
  am2.position(550, 280);
  am2.size(50);
  
  pe2 = createInput();
  pe2.position(550, 310);
  pe2.size(50);
  
  ph2  = createInput();
  ph2.position(550, 340);
  ph2.size(50);
 
  button = createButton('Go');
  button.position(550, 370);
   
  
  button.mousePressed(function() {
    amf = float(am.value());
    pef = float(pe.value());
    phf = float(ph.value());
    
    amf2 = float(am2.value());
    pef2 = float(pe2.value());
    phf2 = float(ph2.value());
    start = true;  
  });
 
}
 

function draw() {
 
  background(255, 192, 203);
  if(!start ){
  textSize(20);
  text("Sin wave for 2 different set of amplitude, period and phase", 50, 30);
  text("And their Superposition ", 310, 55);
  
  text("Enter amplitude ", 400, 80);
  text("Enter period ", 400, 110);
  text("Enter phase ", 400, 140);
  text("Enter amplitude ", 400, 170);
  text("Enter period ", 400, 200);
  text("Enter phase ", 400, 230);
  }
  
  if (start) {
    
    translate(0,200);
    let y1=0 , y2=0 ;
    for(let x1 = 0 ; x1 < width ; x1 += 1.25*r)
    {
      y1 = sin(phf+ TWO_PI*x1 / pef) * amf ;      
      y2 = sin(phf2+ TWO_PI*x1 / pef2) * amf2 ;
      y = y1+y2;
      
      fill(255, 255,0);
      stroke(255, 255, 0);
      strokeWeight(r/2);
      circle(x1,y,r);
      line(x1,0,x1,y);
      
      strokeWeight(r/3);
      fill(0, 0, 128);
      stroke(0, 0, 128);
      circle(x1,y1,r);
      line(x1,0,x1,y1);
      
      strokeWeight(r/3);
      fill(128, 0, 128);
      stroke(128, 0, 128);
      circle(x1,y2,r);
      line(x1,0,x1,y2);
      
    }
    phf+= 0.01;
    phf2+= 0.01;
    
    
  }
 
}
