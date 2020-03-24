export default class bootGame extends Phaser.Scene {
  constructor() {
    super("BootGame");
  }
  preload() {
    this.load.image("bg", "assets/background.png");

    this.load.image("bullet", "assets/bullet.png");

    this.load.image("bonus", "assets/bonus.png");

    this.load.image("player", "assets/player.png");

    this.load.spritesheet("nave", "assets/nave.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("nave2", "assets/nave2.png", {
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet("nave3", "assets/nave3.png", {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet("explosion", "assets/explosion.png", {
      frameWidth: 62.5,
      frameHeight: 59.25
    });

    //xml para identificar onde cada char está na imagem
    this.load.bitmapFont(
      "pixelFont",
      "assets/font/font.png",
      "assets/font/font.xml"
    );

    this.load.audio("gameover", "assets/gameover.mp3");
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
  }

  update() {
    if (this.cursors.space.isDown) {
      //stops the presente scene
      this.scene.stop();

      //starts PlayGame scene
      this.scene.start("PlayGame");
    }
  }
}
