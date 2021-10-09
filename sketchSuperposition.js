let r= 4

let y;

let am , pe , ph ;
let amf, pef, phf ;

let am2 , pe2 , ph2 ;
let amf2, pef2, phf2 ;

let start = false;
 
function setup() {
  createCanvas(1450,1000);
  //angleMode(DEGREES);

  am = createInput();
  am.position(1450, 370);
  am.size(50);
  
  pe = createInput();
  pe.position(1450, 400);
  pe.size(50);
  
  ph  = createInput();
  ph.position(1450, 430);
  ph.size(50);
  
  am2 = createInput();
  am2.position(1450, 490);
  am2.size(50);
  
  pe2 = createInput();
  pe2.position(1450, 520);
  pe2.size(50);
  
  ph2  = createInput();
  ph2.position(1450, 550);
  ph2.size(50);
 
  button = createButton('Go');
  button.position(1450, 580);
   
  
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
 
  background(255, 255, 255);
  if(!start ){
  textSize(20);
  
  text("First Wave ", 1220, 80);
  text("Amplitude ", 1300, 110);
  text("Period ", 1300, 140);
  text("Phase ", 1300, 170);
  text("Second Wave ", 1220, 200);
  text("Amplitude ", 1300, 230);
  text("Period ", 1300, 260);
  text("Phase ", 1300, 290);
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
