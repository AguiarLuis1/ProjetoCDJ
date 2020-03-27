export default class VictoryScene extends Phaser.Scene {
  constructor() {
    super("Victory");
  }
  init(data) {
    //get score passed from PlayGame scene
    this.score = data.score;
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.composeHUD();

    this.victorySound = this.sound.add("victory", { volume: 0.15 });

    this.victorySound.play();
  }
  composeHUD() {
    this.add.bitmapText(15, 170, "pixelFont", "Your score: " + this.score, 50);

    this.add.text(170, 350, "VICTORY", {
      font: "70px Cambria",
      fill: "#00ff00"
    });

    this.add.text(130, 650, "PRESS SPACE TO PLAY AGAIN", {
      font: "30px Cambria",
      fill: "#00ff00"
    });
  }
  update() {
    if (this.cursors.space.isDown) {
      //stops the presente scene
      this.scene.stop();
      this.victorySound.stop();
      //starts PlayGame scene
      this.scene.start("PlayGame");
    }
  }
}
