import Phaser from "phaser";

export default class BearEnemy extends Phaser.GameObjects.Sprite {
  timer;

  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.velocity = velocity;
    this.targetX = 1500;
    this.targetY = 900;
    this.bossEnemyHp = 30000;
    this.bossVelocity = 200;
    this.timeToThrowBoulder = 0;

    this.patrolling = true;
  }

  update() {
    if (this.patrolling) {
      const distanceX = this.targetX - this.x;
      const distanceY = this.targetY - this.y;

      const angle = Math.atan2(distanceY, distanceX);

      const velocityX = Math.cos(angle) * this.bossVelocity;
      const velocityY = Math.sin(angle) * this.bossVelocity;

      this.body.setVelocity(velocityX, velocityY);

      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        if (velocityX > 0) {
          this.anims.play("bearRight", true);
        } else {
          this.anims.play("bearLeft", true);
        }
      } else if (velocityY > 0) {
          this.anims.play("bearDown", true);
        } else {
          this.anims.play("bearUp", true);
        }

      const distanceToTarget = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetX,
        this.targetY
      );

      if (distanceToTarget < 2) {
        this.targetX = Phaser.Math.Between(1000, 2000);
        this.targetY = Phaser.Math.Between(1000, 1800);
      }
    }
  }

  stopMovement() {
    this.patrolling = false;
    this.body.setVelocity(0, 0);
  }

  resumeMovement() {
    this.patrolling = true;
  }
}
