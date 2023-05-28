//Jogo Brick Breacker

var bola = createSprite(240, 240, 20, 20);
bola.setAnimation("emoji_06_1");
bola.scale = 0.1;

var gamestate = 'serve';

var barra = createSprite(200, 390, 150, 10);

var life = 3;
var score = 0;

var brick = createGroup();

createBlock(50, 'red');
createBlock(90, 'cyan');
createBlock(130, 'yellow');
createBlock(170, 'green');

createEdgeSprites();

function draw() {
  background("black");
  textSize(25);
  text('lives: ' + life, 19, 20);
  text('score: ' + score, 280, 18);
  
  if (gamestate == 'serve') {
    textSize(30);
    text("Clique para iniciar", 90, 301);
    bola.x = 240;
    bola.y = 240;
  } else if (gamestate == 'over') {
    textSize(30);
    if (brick.length === 0) {
      text('Ganhou!', 90, 301);
    } else {
      text('Perdeu!', 90, 301);
    }

  } else {
    barra.x = World.mouseX;
    if (barra.x <= 40) {
      barra.x = 40;
    }
    if (barra.x >= 320) {
      barra.x = 320;
    }
    bola.bounceOff(rightEdge);
    bola.bounceOff(leftEdge);
    bola.bounceOff(topEdge);
    bola.bounceOff(barra);
    bola.bounceOff(brick, brickHit);
    if (bola.isTouching(bottomEdge)) {
      lifeOver();
    }

  }
  
  drawSprites();
  
  // Verificar se todas as barras foram removidas
  if (brick.length === 0 && gamestate !== 'over') {
    gamestate = 'over';
  }
}

function createBlock(y, color) {
  for (var i = 0; i <= 5; i = i + 1) {
    var brickSprite  = createSprite(40 + 60 * i, y, 50, 30);
    brickSprite .shapeColor = color;
    brick.add(brickSprite );
  }
}

function brickHit(ball, brick) {
  brick.remove();
  playSound("sound://category_hits/8bit_splat.mp3");
  score++;
}

function mousePressed() {
  if (gamestate == 'serve') {
    gamestate = 'play';
    bola.velocityY = -5;
    bola.velocityX = 5;

  }
}

function lifeOver() {
  life = life - 1;
  if (life >= 1) {
    gamestate = 'serve';
  } else {
    gamestate = 'over';

  }
}
