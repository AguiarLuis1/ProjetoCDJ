import bootGame from "./scene/BootGame.js";
import playGame from "./scene/PlayGame.js";
import gameOver from "./scene/GameOverScene.js";
import introGame from "./scene/IntroGame.js";
import boss from "./scene/BossScene.js";
import victory from "./scene/VictoryScene.js";

var game;
window.onload = function() {
  var gameConfig = {
    width: 650,
    height: 800,
    backgroundColor: 0x000000,
    scene: [bootGame, playGame, gameOver, introGame, boss, victory],
    physics: {
      default: "arcade",
      arcade: {
        debug: true
      }
    }
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resizeGame();
  window.addEventListener("resize", resizeGame);
};

function resizeGame() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}
