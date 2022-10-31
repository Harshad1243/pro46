var bg_Img;
var bg;
var shooter
var shooter1, shooter2;
var zombie;
var zb_Img;
var zombieGroup; 
var bullet;
var bulletGroup;

function preload() {
bg_Img = loadImage("./assets/bg.jpeg");
shooter1 = loadImage("./assets/shooter_2.png");
shooter2 = loadImage("./assets/shooter_3.png");
zb_Img = loadImage("./assets/zombie.png")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(width/2-20,height/2-40,20,20);
  bg.scale=1.1
  bg.addImage(bg_Img);

  shooter = createSprite(width/2-500,height/2+100);
  shooter.scale = 0.35;
  shooter.addImage(shooter1);
  zombieGroup = createGroup();
  bulletGroup = createGroup();
  shooter.debug = true;
  shooter.setCollider("rectangle",0,0,300,300);
}


function Zombies() {
  if (frameCount%70==0) {
    zombie = createSprite(random(500,1100),random(500,110),40,40);
    zombie.scale = 0.15;
    zombie.velocityX =- 2;
    zombie.addImage(zb_Img); 
    zombie.lifetime = 400;
      zombieGroup.add(zombie);
      zombie.debug = true;
      zombie.setCollider("rectangle",0,0,400,400);
  };

}


function draw() {
  background(0);

if (keyDown("UP_ARROW")) {
  shooter.y -= 5;
 }
if (keyDown("DOWN_ARROW")) {
  shooter.y += 5;
}
if (keyWentDown("space")) {
  shooter.addImage(shooter2);

}
if (keyWentUp("space")) {
  shooter.addImage(shooter1);
  //Creating bullets 
bullet = createSprite(width/2-450,shooter.y-30,20,10);
bullet.velocityX=17;
bullet.lifetime=100;
bulletGroup.add(bullet);
}

Zombies();

//destroy zombie when shooter touches it.
if (zombieGroup.isTouching(shooter)) {
  for(var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(shooter)){
        zombieGroup[i].destroy();
      }
  }
}
//destroy zombie when bullet touches it
if (zombieGroup.isTouching(bulletGroup)) {
  for(var i=0; i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
      }
  }
}
//to control the player position vertical
if (shooter.y<90) {
  shooter.y=90;
}
if (shooter.y>600) {
  shooter.y=600;
}


drawSprites();
}

