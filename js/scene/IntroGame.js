export default class introGame extends Phaser.Scene {
  constructor() {
    super("IntroGame");
  }
  create() {
    this.add.image(
      this.game.config.width / 2,
      this.game.config.height / 2,
      "bg"
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.bitmapText(120, 100, "pixelFont", "Welcome to Space Conquer", 50);

    this.add.bitmapText(170, 300, "pixelFont", "PRESS SPACE TO START", 45);

    this.add.image(210, 510, "bonus");
    this.add.bitmapText(230, 498, "pixelFont", ": BOOST", 50);
    this.add.bitmapText(
      200,
      540,
      "pixelFont",
      "<- : MOVE LEFT\n-> : MOVE RIGHT\nSPACE : Fire",
      50
    );

    this.introSound = this.sound.add("intro", { volume: 0.1 });

    this.introSound.play();

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.space.isDown) {
      this.scene.stop();

      this.introSound.stop();

      this.scene.start("PlayGame");
    }
  }
}
