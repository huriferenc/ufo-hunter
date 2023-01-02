const MIN_DRAWING_TIME = 100;
const DECREASE_DRAWING_TIME_DELTA = 50;
const MAX_MOVE_SPEED = 30;
const INCREASE_MOVE_SPEED_DELTA = 0.1;

const INIT_LIFE_NUMBER = 50;
const INIT_POINT = 0;
const INIT_DRAWING_TIME = 1500; // ms
const INIT_MOVE_SPEED = 3; // px

const lifeNumberElem = document.getElementById('life-number');
const playerScoreElem = document.getElementById('player-score');
const playgroundElem = document.getElementById('playground');

let life, point;
let drawingTime, moveSpeed;
let enemies;

function draw() {
  const enemy = document.createElement('img');
  enemy.src = 'ufo.gif?a=' + Math.random();

  playgroundElem.appendChild(enemy);

  enemy.style.position = 'absolute';
  enemy.style.top = window.innerHeight * Math.random() - 100 + 'px';
  enemy.style.left = -200 + 'px';
  enemy.style.filter += 'brightness(' + Math.random() + ')';

  enemies.push(enemy);

  enemy.addEventListener('mousedown', explode);

  setTimeout(draw, drawingTime);
}

function explode(e) {
  const enemy = e.target;
  playgroundElem.removeChild(enemy);
  enemies.splice(enemies.indexOf(enemy), 1);
  const explosion = document.createElement('img');
  explosion.src = 'explosion.gif?a=' + Math.random();
  playgroundElem.appendChild(explosion);
  explosion.style.position = 'absolute';
  explosion.style.top = e.y - 100 + 'px';
  explosion.style.left = e.x - 100 + 'px';
  explosion.style.pointerEvents = 'none';

  drawingTime = Math.max(MIN_DRAWING_TIME, drawingTime - DECREASE_DRAWING_TIME_DELTA);
  moveSpeed = Math.min(MAX_MOVE_SPEED, moveSpeed + INCREASE_MOVE_SPEED_DELTA);

  point++;
  playerScoreElem.textContent = point;

  const explosionSound = new Audio('explosion.mp3');
  explosionSound.play();

  setTimeout(function () {
    playgroundElem.removeChild(explosion);
  }, 700);
}

function move() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].style.left = parseInt(enemies[i].style.left) + moveSpeed + 'px';
    if (parseInt(enemies[i].style.left) > window.innerWidth) {
      playgroundElem.removeChild(enemies[i]);
      enemies.splice(i, 1);
      lifeNumberElem.textContent = --life;
      if (life <= 0) {
        setTimeout(() => {
          gameOver();
        }, 100);
      }
    }
  }
}

function gameOver() {
  alert('Game over!');
  init();
}

function init() {
  lifeNumberElem.textContent = INIT_LIFE_NUMBER;
  playerScoreElem.textContent = INIT_POINT;

  playgroundElem.innerHTML = '';

  life = INIT_LIFE_NUMBER;
  point = INIT_POINT;

  drawingTime = INIT_DRAWING_TIME; // ms
  moveSpeed = INIT_MOVE_SPEED; // ms

  enemies = [];
}

function start() {
  init();

  draw();
}

setInterval(move, 10);
// setInterval(draw, 500);

start();
