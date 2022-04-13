var PLAY = 1
var END = 0
var gamestate = PLAY

var trex, trex_running, edges;
var groundImage;
var pontos=0
var grupoespeto
var grupoalgodao
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvening = loadImage("cloud.png")
cacto1 = loadImage("obstacle1.png")
cacto2 = loadImage("obstacle2.png")
cacto3 = loadImage("obstacle3.png")
cacto4 = loadImage("obstacle4.png")
cacto5 = loadImage("obstacle5.png")
cacto6 = loadImage("obstacle6.png")
trex_collided = loadImage("trex_collided.png")
imgfimdejogo = loadImage("gameOver.png")
imgreiniciar = loadImage("restart.png")
vuemo =  loadSound("jump.mp3")
salvemo = loadSound("checkpoint.mp3")
falecemo = loadSound("die.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  //criando o trex
  trex = createSprite(50,height-20,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  //criando o solo
  solo =  createSprite(200,height-20,400,20)
  solo.addImage(groundImage)

  //oi pa.. UÉ PRA ONDE ELE FOI?
  soloinvisivel = createSprite(200,height-10,400,10) 
  soloinvisivel.visible = false
  grupoespeto = new Group()
  grupoalgodao = new Group()
  trex.setCollider("circle",0,0,30)
  trex.debug = false

  perdemo = createSprite(width/2,height/2)
  perdemo.addImage(imgfimdejogo)
  voltemo = createSprite(width/2,height/2+40)
  voltemo.addImage(imgreiniciar)
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("pontos"+pontos,width/2,50)
 if(gamestate === PLAY) {
   perdemo.visible = false
   voltemo.visible = false
  pontos = pontos+Math.round(frameRate()/60)
  if(pontos>0 && pontos%100 === 0){
    salvemo.play()
  }
  solo.velocityX = -(4+3*pontos/100)
  if(solo.x<0){
    solo.x = solo.width/2}

    if((touches.length>0|| keyDown("space"))&& trex.y >=height-40){
      trex.velocityY = -10
      vuemo.play() 
      touches = []
    }
    trex.velocityY = trex.velocityY + 0.5;
    gerarnuvens()
    gerarcactos()
    if (grupoespeto.isTouching(trex)){
    gamestate = END
    falecemo.play()  
    }

 }else if(gamestate === END){
solo.velocityX = 0
grupoespeto.setVelocityXEach(0)
grupoalgodao.setVelocityXEach(0)
trex.changeAnimation("collided",trex_collided)
trex.velocityY = 0
perdemo.visible = true
voltemo.visible = true
 }
   

    
      
  
 
  
 //impedir que o trex caia
  trex.collide(soloinvisivel)
  if(touches.length>0|| mousePressedOver(voltemo)){
    reset()

  }
  drawSprites();
}
function reset(){
gamestate = PLAY
grupoespeto.destroyEach()
grupoalgodao.destroyEach()
trex.changeAnimation("running",trex_running)
pontos = 0
}
function gerarnuvens(){
  if(frameCount%60===0){
    nuven = createSprite(width+20,height/2,40,10)
    nuven.velocityX = -(3+pontos/100)
    nuven.addImage(nuvening)
    nuven.y = Math.round(random(80,160))
    nuven.scale=0.5
    nuven.depth = trex.depth
    trex.depth = trex.depth+1
    grupoalgodao.add(nuven)
  }
}
function gerarcactos(){
  if (frameCount%60===0){
    cacto = createSprite(width,height-35,10,40)
    cacto.velocityX = -(6+pontos/100)
var rand = Math.round(random(1,6))
switch(rand){
  case 1:cacto.addImage(cacto1)
break
case 2:cacto.addImage(cacto2)
break
case 3:cacto.addImage(cacto3)
break
case 4:cacto.addImage(cacto4)
break
case 5:cacto.addImage(cacto5)
break
case 6:cacto.addImage(cacto6)
break
default:break
}
cacto.scale = 0.5
grupoespeto.add(cacto)

  }
}