import Bullet from "./Bullet.js";

export default class Boss extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(scene, scene.game.config.width / 2, 150, "boss"); //120= space from top

    scene.add.existing(this);

    this.scene.physics.world.enable(this);

    this.setScale(1.5);
    this.setVelocityX(250);
    this.setCollideWorldBounds(true);
    this.setBounce(1); //para saltar na parede

    //nº de tiros que tem de levar para morrer
    this.life = 100;

    //lógica para as balas
    this.timeToShoot = 0;
    this.fireRate = 450;
    this.bulletsMaxsize = 5;

    this.bullets = this.scene.physics.add.group({
      maxSize: this.bulletsMaxsize,
      classType: Bullet,
    });
  }
  update() {
    //interar por todas as balas para verificar se estão fora do ecra
    this.bullets.children.iterate(function (bullet) {
      if (bullet.isOutsideCanvas()) {
        //bullet.active = false;
        this.bullets.killAndHide(bullet);
      }
    }, this);
  }
  shoot(time) {
    if (this.timeToShoot < time && this.active) {
      let bullet = this.bullets.getFirstDead(true, this.x, this.y);

      if (bullet) {
        bullet.tint = 0x380b61; //mudar a côr da bala do boss
        bullet.setVelocity(Phaser.Math.Between(-75, 75), 200);
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
  }
  //mudar a cor do boss para vermelho quando leva tiro
  getShooted() {
    this.tint = this.tint = 0xf50c0c; //vermelho claro
    this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        this.tint = 0xffffff; //reset á cor
      },
    });
  }
}
