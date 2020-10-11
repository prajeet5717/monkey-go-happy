var survialtime=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,juiceGroup;
var score;
var ground;
var juice,juiceImage;
var jungle,jungleImage,jImage;

function preload()
{  
  monkey_running =                                          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("sprite_0.png");
  
  
  jungleImage =loadImage ("jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
   juiceImage=loadImage("juice-removebg-preview.png")
}

function setup()
{
  createCanvas(600,280);
  
  jungle = createSprite(300,100,800,500);
  jungle.addImage("jImage",jungleImage);
  jungle.scale = 1.9;
  
  monkey= createSprite(100,200,50,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  ground= createSprite(400,250,9000,200);
  ground.scale=0.1;
  console.log(ground.x)
 
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  juiceGroup=createGroup();
  score = 0;
}

function draw()
{
  background("220");
  createEdgeSprites();
  
  monkey.collide( ground);
  
  if(gameState === PLAY)
  {  
    
    if(keyDown("space")&&monkey.y>=100)
  {
   monkey .velocityY=-12;
  } 
 monkey.velocityY = monkey.velocityY + 0.8

  stroke("red");
  textSize(20);  
  fill("red"); 
  text("score:"+ score,400,280 )  
    
  stroke("black");
  textSize(20);  
  fill("black"); 
  survialtime=Math.ceil(frameCount/frameRate())  
  text("survial time:" +survialtime,250,280)   
 
    if(monkey .isTouching(FoodGroup)){
  FoodGroup.destroyEach();
  score=score+2;   

    }
     if(monkey .isTouching(juiceGroup)){
  juiceGroup.destroyEach();
  score=score+1;
     }
    
  if (monkey.isTouching(obstaclesGroup)){
    gameState=END;
  }  
       
   if (frameCount % 300 === 0) 
 {
    var obstacle = createSprite(400,250,40,10);
    obstacle.x = Math.round(random(900,120));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
     //assign lifetime to the variable
    obstacle.lifetime = 250;
   obstacle.collide( ground);
    obstaclesGroup.add(obstacle);
 }
    
     if (frameCount % 80 === 0) {
    var banana = createSprite(400,80,40,10);
    banana.x = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
       
       if (frameCount % 80 === 0) {
    var juice = createSprite(300,130,40,10);
    juice.x = Math.round(random(300,200));
    juice.addImage(juiceImage);
    juice.scale = 0.1;
    juice.velocityX = -3;
        }
    
     //assign lifetime to the variable
    banana.lifetime = 250;
    juice.lifetime = 300;
    
       FoodGroup.add(banana);
       juiceGroup.add(juice);
       
 }
}
   if(gameState === END){
    monkey.velocityY = 0;
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
     juiceGroup.setVelocityXEach(0);
     juiceGroup.setLifetimeEach(-1);
     monkey.changeAnimation( monkey_collided);
      jungle.velocityX = 0;
   }
  
  drawSprites();
}

