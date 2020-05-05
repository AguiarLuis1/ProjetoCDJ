import Explosion from "./Explosion.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    var typeOfShip = Phaser.Math.Between(0, 2);
    var type;
    if (typeOfShip == 0) type = "nave";
    else if (typeOfShip == 1) type = "nave2";
    else type = "nave3";

    super(scene, x, y, type, 0);

    this.scene.add.existing(this);

    //enable physics to sprite
    this.scene.physics.world.enable(this);

    this.setScale(Phaser.Math.Between(2.5, 3.5));

    if (typeOfShip == 0) {
      this.scene.anims.create({
        key: "nave1_anim",
        frames: this.scene.anims.generateFrameNumbers("nave", {
          start: 0,
          end: 2,
        }),
        frameRate: 20,
        repeat: -1,
      });
      this.play("nave1_anim");
    } else if (typeOfShip == 1) {
      this.scene.anims.create({
        key: "nave2_anim",
        frames: this.scene.anims.generateFrameNumbers("nave2", {
          start: 0,
          end: 2,
        }),
        frameRate: 20,
        repeat: -1,
      });
      this.play("nave2_anim");
    } else {
      this.scene.anims.create({
        key: "nave3_anim",
        frames: this.scene.anims.generateFrameNumbers("nave3", {
          start: 0,
          end: 2,
        }),
        frameRate: 20,
        repeat: -1,
      });
      this.play("nave3_anim");
    }
  }

  spawn() {
    this.visible = true;
    this.active = true;
    this.setVelocityY(Phaser.Math.Between(150, 400));
  }
  resetShipPos() {
    this.y = 0;
    this.x = Phaser.Math.Between(0, this.scene.game.config.width); //retorna um valor aleatorio dentro do intervalo
  }
  removeFromScreen() {
    new Explosion(this.scene, this.x, this.y);
    this.x = -200;
    this.setVelocity(0, 0);
  }
}
