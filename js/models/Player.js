import Bullet from "./Bullet.js";
import Explosion from "./Explosion.js";
export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(
      scene,
      scene.game.config.width / 2,
      scene.game.config.height - 50,
      "player"
    );

    this.scene.add.existing(this);

    //ativa as fisicas
    this.scene.physics.world.enable(this);

    //nº de vidas
    this.lives = 3;

    //usado para permitir uma janela de invencibilidade no player
    this.canBeKilled = true;

    this.velocity = 300;

    this.timeToShoot = 0;
    this.fireRate = 700;

    this.bulletsMaxsize = 5;

    this.bullets = this.scene.physics.add.group({
      maxSize: this.bulletsMaxsize,
      classType: Bullet,
    });
  }

  update(cursors, time) {
    if (cursors.space.isDown && this.timeToShoot < time && this.active) {
      let bullet = this.bullets.getFirstDead(true, this.x, this.y);

      if (bullet) {
        bullet.setVelocityY(-500);
        bullet.active = true;
        bullet.visible = true;
      }

      this.timeToShoot = time + this.fireRate;

      if (this.bullets.children.size > this.bulletsMaxsize) {
        console.log("Group size failed");
      }
      //som de tiro
      if (this.shootSound) {
        this.shootSound.play();
      }
    }
    //interar por todas as balas para verificar se estão fora do ecra
    this.bullets.children.iterate(function (bullet) {
      if (bullet.isOutsideCanvas()) {
        //bullet.active = false;
        this.bullets.killAndHide(bullet);
      }
    }, this);

    this.setVelocity(0);
    const width = this.scene.game.config.width;

    if (
      cursors.right.isDown &&
      this.x < width - this.frame.width + this.width / 2
    ) {
      this.setVelocityX(this.velocity);
    } else if (
      cursors.left.isDown &&
      this.x > 0 + this.frame.width - this.width / 2
    ) {
      this.setVelocityX(-this.velocity);
    }
  }

  kill() {
    if (this.alpha < 1) {
      //se estiver no tempo de respawn
      return;
    }

    new Explosion(this.scene, this.x, this.y);

    this.disableBody(true, true); //desativa e esconde (this.activa fica a false)

    this.lives -= 1;

    if (this.lives <= 0) {
      return;
    }

    this.scene.time.addEvent({
      delay: 2000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false,
    });
  }

  resetPlayer() {
    this.enableBody(true, this.x, this.y, true, true); //ativa novamente a nave

    this.alpha = 0.5; //fica transparente

    this.scene.time.addEvent({
      delay: 2500,
      callback: () => {
        this.alpha = 1;
      },
    });
  }
}
