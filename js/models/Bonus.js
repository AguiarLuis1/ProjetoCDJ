export default class Bonus extends Phaser.Physics.Arcade.Image {
  constructor(scene) {
    super(
      scene,
      Phaser.Math.Between(0, scene.game.config.width),
      Phaser.Math.Between(0, scene.game.config.height),
      "bonus"
    );

    scene.add.existing(this);

    this.scene.physics.world.enable(this);

    this.setVelocity(250, 250);
    this.setCollideWorldBounds(true);
    this.setBounce(1); //para saltar na parede
  }
}
