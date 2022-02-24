var cat,cat_running,cat_collided;
var ground,ground_image;
var coin,coin_image,coGroup,coinsound
var obstacle1,obstacle2,obGroup;
var score=0;
var coin=0;
var lives=3;
var PLAY=0;
var END=1;
var SERVE=2;
var Gamestate=PLAY;
var gameover,gameoverimg,gameoversound;
var restart,restartimg,restartsound;
var won,win;
var playi,playimg,playsound;
var inv_ground;
var stopper;
var stopper2;
var white;
var fuelBar_bck, fuelBar_bck_img;
var fuelBar_frnt,fuelBar_frnt_img;
var hider;
var fuelBar,fuelBar_img;

function preload(){
cat_running=loadImage("car.png");
cat_collided=loadImage("car.png")
ground_image=loadImage("track1.jpg")
coin_image=loadImage("fuel.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
gameoverimg=loadImage("game_over.png")
restartimg=loadImage("restart_btn.png")
win=loadImage("you_win.jpg")
playimg=loadImage("play_btn.png")
coinsound=loadSound("coinCollectSound.wav")
gameoversound=loadSound("gameOverSound.wav")
restartsound=loadSound("restartSound.wav")
playsound=loadSound("playSound.wav")
fuelBar_bck_img = loadImage("fuelBar_bck.png");
fuelBar_frnt_img = loadImage("fuelBar_frnt.png")
fuelBar_img = loadImage("fuel bar.png")
}

function setup() {
createCanvas(1300,220)

cat=createSprite(240,height-40,20,20);
cat.addImage("running",cat_running);
cat.addImage("collided",cat_collided);
cat.scale=0.3;
  
ground=createSprite(250,100,600,30); 
ground.addImage(ground_image);
ground.scale=0.5;
ground.velocityY=-5;

hider = createSprite(622,110,305,250);

fuelBar = createSprite(700,50,30,25);
fuelBar.addImage(fuelBar_img)
fuelBar.scale = 0.2

stopper = createSprite(540,50,10,65);
stopper.shapeColor = "grey";

stopper2 = createSprite(1030,45,10,65)
stopper2.shapeColor = "grey"

inv_ground =  createSprite(55,158,30,30);
inv_ground.visible = false;

gameover=createSprite(225,70,20,20);
gameover.addImage(gameoverimg);
gameover.scale=0.4;
  
restart=createSprite(250,120,20,20);
restart.addImage(restartimg);
restart.scale=0.2;

won=createSprite(225,80,30,30);
won.addImage(win);
won.scale=0.5;
  
playi=createSprite(225,160,20,20);
playi.addImage(playimg);
playi.scale=0.5;

fuelBar_bck = createSprite(900,50,50,20);
fuelBar_bck.addImage(fuelBar_bck_img);
fuelBar_bck.scale = 0.8;

fuelBar_frnt = createSprite(900,48,70,20);
fuelBar_frnt.addImage(fuelBar_frnt_img);
fuelBar_frnt.scale = 0.8;
fuelBar_frnt.velocityX = -0.6;

console.log(fuelBar_frnt.x);

obGroup=new Group();
coGroup=new Group();

}

function draw() {
 background("gray");
 
stroke("black");
fill("green");    
textSize(20)
text("Score:"+score,550,50)
text("Lives:"+lives,200,20)
text("Fuel:"+coin,250,100)

stopper.depth = hider.depth
stopper.depth+=2

hider.debug = fuelBar_frnt.depth
hider.depth+=2
hider.debug = false

fuelBar_frnt.setCollider("rectangle",0,0,290,80)
fuelBar_frnt.debug = false

fuelBar.depth = hider.depth
fuelBar.depth+=2

  if(Gamestate===PLAY){

  score=score+Math.round(getFrameRate()/60);
    if(keyIsDown(RIGHT_ARROW)){
      cat.x+=3
    }
    if(keyIsDown(LEFT_ARROW)){
      cat.x-=3
    }

    if(fuelBar_frnt.isTouching(stopper)){
      Gamestate= END
      lives=lives-1
      gameoversound.play();
     fuelBar_frnt.velocityX = 0
    }

    if(fuelBar_frnt.isTouching(stopper2)){
      fuelBar_frnt.x = 900
    }
    

  if(obGroup.isTouching(cat)){
    Gamestate= END
    lives=lives-1
    gameoversound.play();
  }
 
 
   if(coGroup.isTouching(cat)){
     fuelBar_frnt.x+=60
     coin = coin+1
     coGroup[0].destroy()
     coinsound.play();
   }
    
  if(ground.y<10){
    ground.y=145
  }
    cat.depth = ground.depth
    cat.depth +=2
   if(lives===0){
   Gamestate=SERVE;
  }
 
   
    Coin();
  Obstacle();
    
    restart.visible=false;
    gameover.visible=false;
    won.visible=false;
    playi.visible=false
  }

  else if (Gamestate===END){
  restart.visible=true  
 fuelBar_frnt.velocityX = 0
    
  cat.changeAnimation("collided",cat_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityY=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)||touches.length>0){
    reset();
    restartsound.play();
   }
  }
  
  else if(Gamestate===SERVE){
    gameover.visible=true
    playi.visible=true
    cat.changeAnimation("collided",cat_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityY=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);

  fuelBar_frnt.velocityX =0
    
  if(mousePressedOver(playi)||touches.length>0){
    winning();
    playsound.play();
  }
    
  }
  
cat.collide(inv_ground)
cat.setCollider("rectangle",0,0,cat.width,cat.height) 
  
  
 drawSprites();
}

function Coin() {
if(frameCount % 80 ===0) {
 var coins=createSprite(250,15,20,20) 
 coins.x=Math.round(random(80,420))
 coins.addImage(coin_image)
  coins.scale=0.01
  coins.velocityY=3
  coins.lifetime=200
  coGroup.add(coins)
}
}


function Obstacle(){
if(frameCount%60===0){
   var obstacles = createSprite(250,20,10,40); 

  obstacles.addImage(obstacle1)
  obstacles.x = Math.round(random(80,420));

  obstacles.setCollider("rectangle",0,0,100,100)
  obstacles.debug = false

  obstacles.velocityY=3
  obstacles.scale=0.02
  obstacles.lifetime=300
  obGroup.add(obstacles);

}
}


function reset(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  ground.velocityY=-5
  fuelBar_frnt.x = 900
fuelBar_frnt.velocityX = -0.6
} 

function winning(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  lives=3
  ground.velocityY=-5
  fuelBar_frnt.x = 900
fuelBar_frnt.velocityX = -0.6
}
