import Player from "../models/Player.js";
import EnemiesGroup from "../models/EnemiesGroup.js";
import Bonus from "../models/Bonus.js";
import Boss from "../models/Boss.js";

export default class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    const width = this.game.config.width;
    const height = this.game.config.height;

    this.bg = this.add
      .tileSprite(0, 0, width, height, "bg")
      .setDisplayOrigin(0, 0);

    this.player = new Player(this);

    this.enemies = new EnemiesGroup(this.physics.world, this, 20);

    this.bonus = new Bonus(this);

    this.score = 0;

    //add barra preta para o score
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.game.config.width, 0);
    graphics.lineTo(this.game.config.width, 30);
    graphics.lineTo(0, 30);
    graphics.lineTo(0, 0);
    //
    graphics.closePath();
    graphics.fillPath();

    this.scoreLabel = this.add.bitmapText(
      10,
      5,
      "pixelFont",
      "SCORE " + this.score,
      30
    );

    this.livesLabel = this.add.bitmapText(
      565,
      5,
      "pixelFont",
      "LIVES " + this.player.lives,
      30
    );

    this.enemyTimerDelay = 1000;
    this.enemySpawnConfig = {
      delay: this.enemyTimerDelay,
      repeat: -1,
      callback: () => {
        let margin = 0;
        let x = Phaser.Math.Between(0, this.game.config.width);
        let y = -50; // para não spawnarem mas aparecerem
        //now it does not need to create a new Enemy object (false argument) because they are created with the scene creation
        let enemy = this.enemies.getFirstDead(false, x, y);
        if (enemy) {
          enemy.spawn();
        }
      }
    };
    this.enemyTimer = this.time.addEvent(this.enemySpawnConfig);

    this.enemySpawnCounter = 0;

    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      (bullet, enemy) => {
        //bullet.destroy(); //destroy method removes object from the memory
        //enemy.destroy();

        this.enemies.killAndHide(enemy);
        this.player.bullets.killAndHide(bullet);

        //prevent collision with multiple enemies by removing the bullet from screen and stoping it
        bullet.removeFromScreen();

        //remove enemy from screen and stop it
        enemy.removeFromScreen();

        this.score += 25;
        //update the score text
        this.scoreLabel.text = "SCORE " + this.score;
      }
    );

    //quando a bala dá COLLIDE no bonus a bala desaparece
    this.physics.add.collider(
      this.bonus,
      this.player.bullets,
      (bonus, bullet) => {
        //se remover o bonus não dá
        this.player.bullets.killAndHide(bullet);
        bullet.removeFromScreen();
      }
    );

    /*
      Quando o bonus passa por cima do player
      -> Bonus é "empurrado para cima"
      -> Player fica com o dobro de velocidade, metade do tamanho e metade do firerate durante 2s
    */
    this.physics.add.overlap(this.bonus, this.player, () => {
      this.player.setScale((this.player.scaleX + this.player.scaleY) / 4); //para ficar metade do tamanho
      this.player.velocity = this.player.velocity * 2;
      this.player.fireRate = this.player.fireRate / 2;
      this.bonus.setVelocity(
        Phaser.Math.Between(-150, 150),
        Phaser.Math.Between(-500, 0)
      );
      this.time.addEvent({
        delay: 2000,
        repeat: 0,
        callback: () => {
          this.player.velocity = this.player.velocity / 2;
          this.player.setScale(this.player.scaleX + this.player.scaleY);
          this.player.fireRate = this.player.fireRate * 2;
        }
      });
    });
    /*
    Quando o enemy atinge o player este perde uma vida e dá respawn com uma proteção de 2s
    Se fôr a ultima vida é mostrada a tela de GameOver
    */
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      player.explode();
      this.livesLabel.text = "LIVES " + this.player.lives;

      if (this.player.lives <= 0) {
        this.scene.stop();
        //starts the game over scene and passes the actual score to render at that scene
        this.scene.start("GameOver", { score: this.score });
      }
    });

    let shootSound = this.sound.add("shoot", {
      volume: 0.07
    });

    this.player.shootSound = shootSound;

    //score para saltar para o boss
    this.bossScore = 200;
  }
  update(time, delta) {
    this.player.update(this.cursors, time);

    this.bg.tilePositionY -= 1; //movimentar o bg

    this.enemies.children.iterate(function(enemy) {
      if (enemy.y > this.game.config.height) {
        //bullet.active = false;
        this.enemies.killAndHide(enemy);
      }
    }, this);

    this.enemySpawnCounter += delta; //nº de enemies aumenta ao longo do tempo

    //saltar para o boss
    if (this.score >= this.bossScore) {
      this.scene.stop();
      this.scene.start("Boss", { lives: this.player.lives, score: this.score });
    }
  }

  spawnNewEnemies() {
    const seconds = 10;
    if (this.enemySpawnCounter >= seconds * 1000) {
      console.log("remove timer");
      this.enemySpawnCounter = 0;
      this.enemyTimer.remove(false);
      this.enemySpawnConfig.delay -= 50;
      if (this.enemySpawnConfig.delay < 0) {
        this.enemySpawnConfig.delay = 0;
      }
      this.enemyTimer = this.time.addEvent(this.enemySpawnConfig);
      console.log("add new timer delay: " + this.enemySpawnConfig.delay);
    }
  }
}
