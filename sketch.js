var PLAY = 1;
var END = 0;
var gameState = PLAY;

var flash,flashImg, flash_running, flash_collided;
var ground, invisibleGround, groundImage;



var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
 
  flashImg = loadImage("svanikflash.png");
  
  groundImage = loadImage("ground2.png");
  
 
  
  obstacle1 = loadImage("robo.png");
  obstacle2 = loadImage("robo.png");
  obstacle3 = loadImage("robo.png");
  obstacle4 = loadImage("robo.png");
  obstacle5 = loadImage("robo.png");
  obstacle6 = loadImage("robo.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  
  
  flash = createSprite(50,160,20,50);
  flash.addImage("fast",flashImg);
  flash.scale = 0.06;
  //flash.debug = true;

  
  
  ground = createSprite(1,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  gameOver = createSprite(100,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(100,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 
  obstaclesGroup = createGroup();
  

  
  flash.setCollider("rectangle",0,0,flash.width,flash.height);
 
  
  score = 0;
  
}

function draw() {
  
  background("#F97878");
  
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
   
    if(keyDown("space")&& flash.y >= 100) {
        flash.velocityY = -12;
        jumpSound.play();
    }
    
    
    flash.velocityY = flash.velocityY + 0.8
    
    camera.position.x = flash.x;
    camera.position.y = flash.y;
  
    
   
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(flash)){
       
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     
    
      if(mousePressedOver(restart)) {
      reset();
    }
     
      ground.velocityX = 0;
      flash.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
         
   }
  
 
  
  flash.collide(invisibleGround);
  
 


  drawSprites();
}

function reset(){
  gameOver.visible = false;
  restart.visible = false;
  
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
 
  
  flash.changeAnimation("running",flash_running)
  
  score = 0;

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
            
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}

