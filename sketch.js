var sword;
var gameState;
var play;
var end;
var score;
var FruitGroup;
var EnemyGroup;
var swordImage;
var fruit1;
var fruit2;
var fruit3;
var fruit4;
var fruit;
var enemy;
var monsterAnimation;
var gameOverText;
var gameOverSound;
var SwordSound;

//code will not work since all of the files are blank;

function preload() {
  swordImage = loadImage("sword.png");

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");

  monsterAnimation = loadImage("alien1.png", "alien2.png");

  gameOverText = loadImage("gameover.png");

  gameOverSound = loadSound("gameover.mp3");

  SwordSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {
  createCanvas(400, 400);
  //sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;

  //creating gameState flag
  play = 1;
  end = 0;
  gameState = play;
  
  FruitGroup = new Group();
  EnemyGroup = new Group();

  

}


function draw() {
 background(220);

  if (gameState == play) {
    //add commands to control behaviour when gameState is play
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    spawnFruits();
    spawnEnemy();

    if (sword.isTouching(FruitGroup)) {
      FruitGroup.destroyEach();
      score = score + 1;
      //p5.sound.play(swordSound);
      SwordSound.play();
    } else if (sword.isTouching(EnemyGroup)) {
      gameState = end;
    }
  } else if (gameState == end) {
    FruitGroup.destroyEach();
    EnemyGroup.destroyEach();
    sword.y = 200;
    sword.x = 200;
    sword.addImage(gameOverText);
    gameOverSound.play();
    //add commands to control behaviour when gameState is end
  }

  drawSprites();
}

function spawnFruits() {
  if (frameCount % 80 == 0) {
    fruit = createSprite(400, 200, 20, 20);
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
      fruit.scale = 0.2;
    } else if (r == 2) {
      fruit.addImage(fruit2);
      fruit.scale = 0.2;
    } else if (r == 3) {
      fruit.addImage(fruit3);
      fruit.scale = 0.2;
    } else if (r == 4) {
      fruit.addImage(fruit4);
      fruit.scale = 0.2;
    }
    fruit.y = Math.round(random(50, 340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;

    FruitGroup.add(fruit);
  }
}
function spawnEnemy() {

  if (frameCount % 90 == 0){
  enemy = createSprite(400, 200, 20, 20);

  enemy.y = Math.round(random(100, 340));
  enemy.addAnimation("MonsterAnimation", monsterAnimation);
  enemy.velocityX = -8;
  enemy.setLifetime = 100;
  EnemyGroup.add(enemy);
  }
}
