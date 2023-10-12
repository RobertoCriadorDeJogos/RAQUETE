let ball;
let leftPaddle;
let rightPaddle;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(800, 400);

  // Inicializa a bola e as raquetes
  ball = new Ball();
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
}

function draw() {
  background(0);

  // Atualiza e mostra a bola e as raquetes
  ball.update();
  ball.show();
  leftPaddle.show();
  rightPaddle.show();

  // Move as raquetes
  leftPaddle.move();
  rightPaddle.move();

  // Verifica colisões com as raquetes
  ball.checkCollision(leftPaddle);
  ball.checkCollision(rightPaddle);

  // Verifica colisões com as paredes superior e inferior
  ball.checkWallCollision();

  // Verifica se a bola saiu da tela
  if (ball.isOut()) {
    if (ball.x < 0) {
      rightScore++;
    } else {
      leftScore++;
    }
    ball.reset();
  }

  // Exibe a pontuação
  textSize(32);
  fill(255);
  text(leftScore + " - " + rightScore, width / 2, 30);
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.speedX = random(300, 400);
    this.speedY = random(-200, 200);
    this.radius = 10;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Limita a velocidade máxima da bola
    this.speedX = constrain(this.speedX, -5, 5);
    this.speedY = constrain(this.speedY, -5, 5);
  }

  show() {
    ellipse(this.x, this.y, this.radius * 2);
  }

  checkCollision(paddle) {
    if (this.x - this.radius < paddle.x + paddle.width / 2 &&
        this.x + this.radius > paddle.x - paddle.width / 2 &&
        this.y + this.radius > paddle.y - paddle.height / 2 &&
        this.y - this.radius < paddle.y + paddle.height / 2) {
      this.speedX *= -1;
    }
  }

  checkWallCollision() {
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.speedY *= -1;
    }
  }

  isOut() {
    return this.x - this.radius > width || this.x + this.radius < 0;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.speedX = random(3, 4);
    this.speedY = random(-2, 2);
  }
}

class Paddle {
  constructor(isLeft) {
    this.width = 10;
    this.height = 80;
    this.isLeft = isLeft;

    if (this.isLeft) {
      this.x = this.width;
    } else {
      this.x = width - this.width;
    }

    this.y = height / 2;
    this.speed = 5;
  }

  move() {
    if (this.isLeft) {
      if (keyIsDown(87)) { // Tecla 'W'
        this.y -= this.speed;
      }
      if (keyIsDown(83)) { // Tecla 'S'
        this.y += this.speed;
      }
    } else {
      if (keyIsDown(UP_ARROW)) {
        this.y -= this.speed;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.y += this.speed;
      }
    }

    // Limita a posição das raquetes
    this.y = constrain(this.y, this.height / 2, height - this.height / 2);
  }

  show() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
}
