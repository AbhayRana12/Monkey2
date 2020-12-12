var PLAY = 1;
var END = 0;
var gameState=PLAY;


var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
 
  monkey=createSprite(50,155,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.07
  
  ground = createSprite(350,180,700,5)
  ground.x = ground.width/2;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  score = 0;
  
}


function draw() {
  background("lightgreen");
  text("Score:"+score,500,50);
  
      
      if (gameState===PLAY) {
      
        if (monkey.isTouching(bananaGroup)) {
          bananaGroup.destroyEach();
          score=score+2;
       }
        if (ground.x < 0){
      ground.x = ground.width/2;
        }

    if(keyDown("space")&& monkey.y >= 100) {
       monkey.velocityY=-10;
    }  
       monkey.velocityY = monkey.velocityY + 0.8;
       monkey.collide(ground);

    if(monkey.isTouching(obstacleGroup)) {
       gameState = END
  }
       bananaFruit();
       obstacle();
      }
  
  if (gameState===END) {
    monkey.velocityX=0;
    monkey.velocityY=0;
    monkey.collide(ground);
    
   obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);     
  }
  
  drawSprites();
   
}

function bananaFruit() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(20,90));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -6;
    
    bananaGroup.add(banana);
}
}

function obstacle(){
  if (frameCount % 130 === 0) {
    var obstacle = createSprite(600,160,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -6;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }  
}