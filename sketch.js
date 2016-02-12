var grassImages = []; //array of images to be put into GRASS array
var grass = [];
var photosynth = []; //array of images to be put into GROW array
var grow = [];
var kamera = [];
var photograph = [];

var eraseMode = false;
var wind;
var keep;

function preload() {
  grassImages[0] = loadImage("grass1.png");
  grassImages[1] = loadImage("grass2.png");
  grassImages[2] = loadImage("grass3.png");
  grassImages[3] = loadImage("grass4.png");
  grassImages[4] = loadImage("grass5.png");
  grassImages[5] = loadImage("grass6.png");
  grassImages[6] = loadImage("grass9.png");
  grassImages[7] = loadImage("grass10.png");
  grassImages[8] = loadImage("grass11.png");
  grassImages[9] = loadImage("grass12.png");
  grassImages[10] = loadImage("grass14.png");

  photosynth[0] = loadImage("sprout.png");

  kamera[0] = loadImage("save.png");
}

//make a variable that selects a single blade then "turn off" other blades
function Blade(photo, _x, _y) { // Planet class / constructor function
  this.x = _x;
  this.y = _y;
  this.angle = 0;
  this.w = photo.width;
  this.h = photo.height;
  this.photo = photo;
  this.state = false; // NEED TO MAKE A DELETE BLADE! need to pick different variable
  this.erased = false;
  this.previousAngle = 0;


  this.display = function() {
    imageMode(CENTER);

    if (this.state) { //if mouse is being held down and on blade

      angleMode(DEGREES); // turning
      this.angle += 0.5; // set image to roatate a half a degree every frame (60 fps) -gh says this is better for the animation than p5 variables
      if (this.angle > 360) {
        this.angle = 0.0;
      }
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      this.previousAngle = this.angle;

      image(this.photo, 0, 0);

      pop();
    } else {

      push();
      translate(this.x, this.y);
      // print("previousAngle: " + this.previousAngle);

      rotate(this.previousAngle); // leaves the object in the position last rotated to

      if (this.erased != true) {
        image(this.photo, 0, 0); // draws image object
      }
      pop();
    }

  }

  this.checkMouseOver = function() { //
    if (mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2) {

      if (mouseIsPressed) {
        this.state = true;
      } else {
        this.state = false;
      }

    }
  }

  this.follow = function() { // blades follow when clikced on -- need to fix bc picks up more than one thing at once - how to drop? select : key stroke?
    if (this.state) {
      // fill(255, 0, 0); //debuggin ellipse
      // ellipse(this.x, this.y, 30, 30);
      this.x = lerp(this.x, mouseX, 0.5);
      this.y = lerp(this.y, mouseY, 0.05);
    } else {
      this.state = false;
    }
  }

  this.endOfBlades = function() { // this is FAR FROM PERFECT NEEDS WORK
    push();

      function mouseReleased(){
     if (mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2 &&

      (eraseMode == true)){
        this.erased == true;
      } else {
        this.state = true;
      }

      }

    }
    // if (keyIsPressed &&
    //   mouseX > this.x - this.w / 2 &&
    //   mouseX < this.x + this.w / 2 &&
    //   mouseY > this.y - this.h / 2 &&
    //   mouseY < this.y + this.h / 2) {
    //   if (eraseMode == true) {
    //     this.erased = true;
    //   } else {
    //     this.state = true;
    //   }
    // }
    pop();
//   }
}

//////////////////////  [ MAKE PHOTO BUTTON ]  /////////////////////////////////

function clickButton(photo, _x, _y) {
  this.x = _x;
  this.y = _y;
  this.w = photo.width;
  this.h = photo.height;
  this.photo = photo;
  this.state = false;

  this.display = function() {
    image(this.photo, this.x, this.y);
  }



  this.checkMouseOver = function() {
    if (mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2)

      if (mouseIsPressed) {
      this.state = true;
    } else {
      this.state = false;
    }
  }

  this.makePhotograph = function() {
    if (this.state) {
      keep = "world()Made" + Date.now() + '.jpg';
      saveCanvas(keep, 'jpg');
    } else {
      this.sate = false;
    }
  }
}


/////////////////  MAKE BLADE BUTTON   ///////////////////////////
function growButton(photo, _x, _y) {
  this.x = _x;
  this.y = _y;
  this.w = photo.width;
  this.h = photo.height;
  this.photo = photo;
  this.state = false;

  this.display = function() {
    image(this.photo, this.x, this.y);
  }

  this.checkMouseOver = function() {

    if (mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2) {

      if (mouseIsPressed) { //in mouse pressed event check to see if mouse is over - if GrowButton.checkmouseover - return t or f
        this.state = true;
      } else {
        this.state = false;
      }
    }

  }

  this.makeBlade = function() {
    if (this.state) {
      var randomIndex = floor(random(grassImages.length));
      var g = new Blade(grassImages[randomIndex], random(width - 75), height - 25); //adds grass to the planets array
      grass.push(g);
    } else {
      this.sate = false;
    }
  }

}

////////////////////// [ SETUP ] ///////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(14);
  textFont("Bookman Old Style");
  // wind.loop();
  for (i = 0; i < grassImages.length; i++) { //displays entire array of planets at start of program
    grass.push(new Blade(grassImages[i], random(width - 75), height - 50)); //where create planet objects -

  }

  grow.push(new growButton(photosynth[0], width - 50, height - 10));
  photograph.push(new clickButton(kamera[0], 40, height - 33));
  eraseMode = true

}

function mousePressed(){
    for (var i = 0; i < grow.length; i++) {
    grow[i].checkMouseOver();
    grow[i].makeBlade();
}
}

function draw() {
  background(255);
  // noStroke();
  // text("click sprout for more marks // click frame to save drawing", width - 420,25);
  push(); // for grid - need ot make this a variable so can change later
  stroke(40);
  for (var i = 0; i <= width; i += 50) { // horizontal grid
    line(i, 0, i, height);
  }
  for (var l = 0; l <= height; l += 50) { // vertical grid
    line(0, l, width, l);
  }
  pop();

  for (var i = 0; i < grass.length; i++) { //loop through array to access/disply all images in array
    grass[i].endOfBlades();
    grass[i].checkMouseOver();
    grass[i].follow();
    grass[i].display(); // and then display

  }

  for (var i = 0; i < grow.length; i++) {
    photograph[i].checkMouseOver();
    photograph[i].makePhotograph();
    photograph[i].display();

  }
  for (var i = 0; i < grow.length; i++) {
    // grow[i].checkMouseOver();
    // grow[i].makeBlade();
    grow[i].display(); //hard code for now bc only one item in array

  }


}

//many thanks to genevieve hoffman, jh moon, kevin sternweis & shawn van every without which this program wld still be a bouncing ball.
