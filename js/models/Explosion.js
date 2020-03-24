export default class Explosion extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "explosion");
    scene.add.existing(this);

    this.explosion = this.scene.anims.create({
      key: "explosion",
      frames: this.scene.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 31
      }),
      frameRate: 240,
      repeat: 0, //não repete
      hideOnComplete: true //ao completar desaparece
    });

    this.play("explosion");
  }
}
