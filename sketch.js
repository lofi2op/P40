var PLAY = 0;
var END = 1;
var gameState = PLAY;
var pacman, pacmanPng,pacmanDed;
var ghost, ghost1, ghost2, ghost3, ghostGrp;
var sky, skyPng;
var coin,coinGrp,coinSound,coinPng;
var score=0;
var ground,title,titlePng,myFont;
var gameOver,restart,gameOverPng,restartPng;

function preload() {
  pacmanPng = loadImage("pacman.png")
  skyPng = loadImage("sky.png")
  ghost1 = loadImage("ghost1.png")
  ghost2 = loadImage("ghost3.png")
  ghost3 = loadImage("ghost4.png")
  titlePng = loadImage("title.png")
  gameOverPng = loadImage("gameover.png")
  restartPng = loadImage("restart.png")
  coinPng = loadImage("coin.png")
  coinSound = loadSound("coin.mp3")
  myFont = loadFont("crackman.ttf")
}

function setup() {
  createCanvas(displayWidth,displayHeight)
    
  textFont(myFont)
  fill("yellow")
  textSize(30)
  text("Use WSAD and Space Bar to move pacman",displayWidth/2 - 400,displayHeight - 850)
  text("SCORE  " + score , displayWidth - 250,displayHeight - 850)  

  sky = createSprite(displayWidth/2, displayHeight/2 - 250, 1000, 100)
  sky.addImage(skyPng)
  sky.scale = 2.0;
  
  pacman = createSprite(50, 360, 20, 20)
  pacman.addImage(pacmanPng)
  pacman.scale = 0.18

  camera.position.x = displayWidth/2;
  camera.position.y = pacman.y;

  ground = createSprite(100,500,10000,10)
  ground.shapeColor = ("black")
  
  gameOver = createSprite(displayWidth/2,displayHeight/2 - 150,10,10)
  gameOver.addImage(gameOverPng)
  gameOver.scale = 0.04
  
  restart = createSprite(displayWidth/2,displayHeight/2,10,10)
  restart.addImage(restartPng)
  restart.scale = 0.02
   
  ghostGrp = new Group();
  coinGrp = new Group();
  
 title = createSprite(displayWidth/2,displayHeight/2 - 300,100,50)
 title.addImage(titlePng)
 title.scale = 0.1 
  
 gameOver.visible = false;
 restart.visible = false;
  
}

function draw() {
  background("black")
  frameRate(60);
  
  ghosts();
  coins();

  pacman.setCollider("rectangle",50,70,105,105)
  
if(gameState === PLAY){
  play();
}
else if(gameState === END){
  end();
}

 
  if(mousePressedOver(restart)){
    resetGame()
  } 
  
  drawSprites();

}

function ghosts() {

  if (frameCount%180 === 0 && pacman.x > 60) {
    ghost = createSprite(pacman.x + 400 , 500 , 20, 20);
    var rand = Math.round(random(1, 3))
    switch (rand) {
      case 1: ghost.addImage(ghost1);
        break;
      case 2: ghost.addImage(ghost2);
        break;
      case 3: ghost.addImage(ghost3);
        break;
    }
    
    ghost.scale = 0.05
    ghost.lifetime = 200;
    
    ghostGrp.add(ghost);
  }
}

function coins(){
  if(frameCount%220 === 0 && pacman.x > 60){
  coin = createSprite(pacman.x + 300,350,10,10)
  coin.addImage(coinPng)
  coin.scale = 0.1;
  coin.lifetime = 260;
  coinGrp.add(coin)
  }
}

function resetGame(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  score = 0;
}
function play(){  

  if(keyDown("space") && pacman.y > 410 ){
    pacman.velocityY = -8;
  }

  if(keyDown(UP_ARROW)){
    pacman.y -= 5;
  }

  if(keyDown(DOWN_ARROW)){
    pacman.y += 5;
  }

  if(keyDown(LEFT_ARROW)){
    pacman.x -= 5;
  }

  if(keyDown(RIGHT_ARROW)){
    pacman.x += 5;
  }
  
  pacman.velocityY = pacman.velocityY + 0.5
    
  pacman.collide(ground)
  ghostGrp.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }

  if(ground.x){
    ground.width += 1000;
  }
    
  if(coinGrp.isTouching(pacman)){
    score = score+1
    coinGrp.destroyEach()
    coinSound.play()
  }
  
  if(ghostGrp.collide(pacman)){
    gameState = END;
  }

  if(pacman.x > displayWidth){
    pacman.x = 50;
    title.visible = false;
  }
}

function end(){
  ghostGrp.destroyEach()
  coinGrp.destroyEach()
  pacman.x = 50
  pacman.y = 460
     
  ghostGrp.lifetime = -1;
  ground.x = 0;
    
  gameOver.visible = true;
  restart.visible = true;
}