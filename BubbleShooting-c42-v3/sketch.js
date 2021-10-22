var score =0;
var gun,bluebubble,redbubbl, backBoard, blast;
var gunImg,bubbleImg, blastImg, backBoardImg;
var blueBubbleGroup, redBubbleGroup;
var bullet, bulletImg, bulletGroup;
var life =3;
var score=0;
var gameState=1
var heading, scoreBoard;

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}
function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement('h1');
  
  scoreBoard = createElement('h1');

  

}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  scoreBoard.html("SCORE : " + score);
  scoreBoard.style('color : red');
  scoreBoard.position(width-200, 70);
  
  heading.html("LIFE : " + life);
  heading.style('color : red');
  heading.position(width-200, 20);

  if(gameState === 1){
    
    gun.y=mouseY  
    
    if(keyDown("space")){
      shootBullet();
    }

    if(frameCount % 80 === 0){
      drawBlueBubble();
    }

    if(frameCount % 100 === 0){
      drawRedBubble();
    }

    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(blueBubbleGroup.collide(backBoard)){
      handleGameOver(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(backBoard)){
      handleGameOver(redBubbleGroup);
    }

  }

  
    
  drawSprites();

 
  
     
}

function shootBullet(){

  bullet = createSprite(50, height/2);
  bullet.addImage("bullet", bulletImg);
  bullet.y = gun.y-30;
  bullet.velocityX = 10;
  bullet.scale = 0.2;
  bullet.lifetime = width/10;
  bulletGroup.add(bullet);

}

function drawBlueBubble(){

  bluebubble = createSprite(width/2, height/2);
  bluebubble.addImage("blue", blueBubbleImg);
  bluebubble.x = Math.round(random(width-100, width));
  bluebubble.y = Math.round(random(50, height-50));
  bluebubble.velocityX = -10;
  bluebubble.scale = 0.1;
  bluebubble.lifetime = width/10;
  blueBubbleGroup.add(bluebubble);

}

function drawRedBubble(){

  redbubble = createSprite(width/2, height/2);
  redbubble.addImage("blue", redBubbleImg);
  redbubble.x = Math.round(random(width-100, width));
  redbubble.y = Math.round(random(50, height-50));
  redbubble.velocityX = -10;
  redbubble.scale = 0.1;
  redbubble.lifetime = width/10;
  redBubbleGroup.add(redbubble);

}

function handleBubbleCollision(bubbleGroup){

  if(life > 0){
    score += 1;
  }

  blast = createSprite(bullet.x, bullet.y);
  blast.addImage("blast", blastImg);
  blast.visible = false;
  blast.lifetime = 20;

  bubbleGroup.destroyEach();
  bulletGroup.destroyEach();

}

function handleGameOver(bubbleGroup){

  life -= 1;
  bubbleGroup.destroyEach();
  swal ({
    title : 'Game Over!!',
    text : 'Ooops you lost the game!',
    text : 'Your score is : ' + score,
    imageUrl : 'https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png',
    imageSize : '100×100',
    confirmButtonText : 'Thanks for playing'
  })

}