//CREATING OBJECTS
var monkey, banana, obstacle ;

//IMAGES
var monkey_running, bananaImage, obstacleImage ;

//CREATING GROUPS
var bananaGroup, obstacleGroup ;

//GROUND
var ground, invisibleGround ; 

//SCORE
var score = 0 ;
var survivalTime = 0 ;

//GAMESTATE
var gameState ;
var PLAY, END ; 
var end ; 

function preload () {
  
  //LOADING IMAGES
  monkey_running = loadAnimation  ( "sprite_0.png" , "sprite_1.png" ,      "sprite_2.png" , "sprite_3.png" , "sprite_4.png" , "sprite_5.png" ,  "sprite_6.png" , "sprite_7.png" , "sprite_8.png" ) ;
  
  bananaImage = loadImage ( " banana.png " ) ; 
  obstacleImage = loadImage ( " obstacle.png " ) ;
  
  //end = loadAnimation( "sprite_0.png" ) ;
  
}

function setup () { 
  
  createCanvas (600,600) ; 
  
  //GAMESTATE
  PLAY = 1 ; 
  gameState = PLAY ; 
  END = 0 ; 
  
  //NEW GROUPS
  bananaGroup = new Group () ; 
  obstacleGroup = new Group () ; 
  
  //CREATING MONKEY
  monkey = createSprite (50,400,50,50) ; 
  monkey.addAnimation ( "running" , monkey_running) ; 
  monkey.scale = 0.1 ;
  
  //CREATING GROUND
  ground = createSprite (300,500,1000,10) ;
  ground.x = ground.width/2 ;
  //ground.debug = true ;
  
  //CREATING INVISIBLE GROUND
  invisibleGround = createSprite (300,450,1000,10) ; 
  invisibleGround.x = ground.width/2 ; 
  //invisibleGround.debug = true ;
  
}
  
function draw () { 
  
  background ( " white " ) ; 
  
  //GAMESTATE PLAY
  if ( gameState === PLAY ) { 
    
    //MOVING GROUND
    if ( ground.x < 0 ) {
       
      ground . x = ground.width / 2 ;
      
    } 
    
    ground.velocityX = -(5 + 2 * score/100) ; 
    
    //MOVING INVISIBLE GROUND
    if ( invisibleGround.x < 0 ) { 
      
      invisibleGround.x = invisibleGround.width / 2 ;
      
    }
    
    invisibleGround.velocityX = -5 ;
      
    //JUMPING MONKEY
    if (keyDown("space") && monkey.isTouching(ground)) {
      
      monkey.velocityY = -20 ;
      
    } 
    
    //INCREAING SCORE
    score = Math.round(frameCount/3) ;
    survivalTime = Math.round(frameCount/frameRate()) ; 
    
    //DESTROYING BANANA
    if (monkey.isTouching(bananaGroup)) { 
      
      bananaGroup.destroyEach() ;
      
    } 
    
    //SPAWNING OBJECTS
    spawnBanana() ;
    spawnObstacle() ;
    
  }
    
  //GAMESTATE END
  if (obstacleGroup.isTouching(monkey)) { 
      
      gameState = END ; 
      
    } 
    
  else if ( gameState === END ) {
      
    //STOPING GROUND
    ground.velocityX = 0 ; 
    invisibleGround.velocityX = 0 ; 
      
    //STOPING BANANA & OBSTACLES
    obstacleGroup.setVelocityEach(0) ; 
    bananaGroup.setVelocityEach(0) ; 
      
    //VISIBLE = FALSE
    bananaGroup.setLifetimeEach(-1) ; 
    obstacleGroup.setLifetimeEach(-1);
      
    // monkey.changeAnimation ( "monkey_running " , end) ; 
      
  }
      
  //ADDING GRAVITY
  monkey.velocityY = monkey.velocityY + 0.1 ;
  monkey.collide ( invisibleGround ) ;
    
  //DISPLAYING SCORE
  stroke( "red" ) ; 
  textSize( 20 ) ;
  fill( "red" ) ;
  text( "SCORE : " + score,400,50 ) ; 
    
  //DISPLAYING TIME
  stroke( "black" ) ;
  textSize( 20 ) ;
  fill( "black" ) ; 
  text( "SURVIVAL TIME : " + survivalTime,100,50 ) ;
    
  drawSprites () ;
    
}
  
function spawnBanana () { 
    
  if ( frameCount % 80 === 0 ) {
      
    var banana = createSprite (500,10,10,20) ; 
    banana.addImage(bananaImage) ;
    banana.velocityX = -(5 + 2 * score/100) ; 
    banana.y = Math.round(random(120,200)) ;
    banana.scale = 0.1 ;
      
    bananaGroup.add(banana) ; 
    bananaGroup.setLifetimeEach(100) ;
      
    banana.debug = true ;
    banana.setCollider("rectangle",0,0,400,400) ; 
      
  }
    
} 
  
function spawnObstacle () {
    
  if ( frameCount % 300 === 0 ) { 
      
    var obstacle = createSprite (508,365,23,32) ; 
    obstacle.velocityX = -(5 + 2 * score/100) ;
    obstacle.addImage (obstacleImage) ; 
    obstacle.scale = 0.2 ;
    obstacleGroup.add(obstacle) ;
    obstacleGroup.setLifetimeEach(100) ; 
    obstacle.debug = true ;
    obstacle.setCollider ("circle",0,0,200);
      
  } 
    
}   