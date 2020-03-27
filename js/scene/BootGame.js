export default class bootGame extends Phaser.Scene {
  constructor() {
    super("BootGame");
  }
  preload() {
    this.load.image("bg", "assets/background.png");

    this.load.image("bullet", "assets/bullet.png");

    this.load.image("bonus", "assets/bonus.png");

    this.load.image("player", "assets/player.png");

    this.load.image("boss", "assets/boss.png");

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

    this.load.audio("shoot", "assets/shootSound.mp3");

    this.load.audio("intro", "assets/introSound.mp3");

    this.load.audio("victory", "assets/victory.mp3");
  }
  create() {
    this.scene.start("IntroGame");
  }
}
