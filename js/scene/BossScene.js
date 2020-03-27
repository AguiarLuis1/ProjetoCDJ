import Player from "../models/Player.js";
import Boss from "../models/Boss.js";

export default class BossScene extends Phaser.Scene {
  constructor() {
    super("Boss");
  }

  /*
  Manter as vidas consoante a prestação na playGame scene
  */
  init(data) {
    console.log(data);
    this.prevLives = data.lives;
    this.score = data.score;
  }

  create() {
    this.bossScore = 10000;
    this.cursors = this.input.keyboard.createCursorKeys();

    const width = this.game.config.width;
    const height = this.game.config.height;

    this.bg = this.add
      .tileSprite(0, 0, width, height, "bg")
      .setDisplayOrigin(0, 0);

    this.player = new Player(this);
    this.boss = new Boss(this);

    let shootSound = this.sound.add("shoot", {
      volume: 0.07
    });

    this.player.shootSound = shootSound;

    //atribuir ao player as vidas da outra cena
    this.player.lives = this.prevLives;

    this.livesLabel = this.add.bitmapText(
      565,
      5,
      "pixelFont",
      "LIVES " + this.player.lives,
      30
    );
    this.physics.add.overlap(this.boss, this.player.bullets, (boss, bullet) => {
      if (this.boss.life <= 0) {
        this.scene.stop();
        this.scene.start("Victory", { score: this.score + this.bossScore });
        //mudar cena!
      }
      this.player.bullets.killAndHide(bullet);

      bullet.removeFromScreen();
      this.boss.life--;
    });

    this.physics.add.overlap(
      this.player,
      this.boss.bullets,
      (player, bullet) => {
        player.explode();
        this.livesLabel.text = "LIVES " + this.player.lives;

        if (this.player.lives <= 0) {
          this.scene.stop();
          //starts the game over scene and passes the actual score to render at that scene
          this.scene.start("GameOver", { score: this.score });
        }
      }
    );
  }
  update(time, delta) {
    console.log(this.boss.life);
    this.player.update(this.cursors, time);
    this.boss.update();

    this.bg.tilePositionY -= 5;

    this.boss.shoot(time); //dispara sempre que tem balas
  }
}
