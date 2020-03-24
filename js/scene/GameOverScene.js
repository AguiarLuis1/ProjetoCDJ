import Bird from "../models/Player.js";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
    this.maxScore = 0;
  }

  /**
   * used to receive data from other scenes
   */
  init(data) {
    console.log("init", data);

    //get score passed from PlayGame scene
    this.score = data.score;

    //keeps the highest score
    this.maxScore = this.maxScore < this.score ? this.score : this.maxScore;
  }

  create() {
    let { width, height } = this.sys.game.canvas;
    this.width = width;
    this.height = height;

    //get all basic cursors input (Up, Down, Left, Right, Space Bar and Shift)
    this.cursors = this.input.keyboard.createCursorKeys();
    this.composeHUD();

    this.gameOverSound = this.sound.add("gameover", { volume: 0.1 });

    this.gameOverSound.play();
  }
  composeHUD() {
    this.add.bitmapText(15, 100, "pixelFont", "YOUR SCORE: " + this.score, 50);

    this.add.bitmapText(
      15,
      200,
      "pixelFont",
      "MAX SCORE: " + this.maxScore,
      50
    );

    this.add.text(140, 350, "GAME OVER", {
      font: "70px Cambria",
      fill: "#ff0000"
    });

    this.add.text(170, 650, "PRESS SPACE TO RETRY", {
      font: "30px Cambria",
      fill: "#ff0000"
    });
  }

  update() {
    if (this.cursors.space.isDown) {
      //stops the presente scene
      this.scene.stop();

      this.gameOverSound.stop();

      //starts PlayGame scene
      this.scene.start("PlayGame");
    }
  }
}
