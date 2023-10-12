import Phaser, { Scene } from "phaser";
import Player from "../components/Player";
import EnemiesHitbox from "./EnemiesHitbox";
import Rock from "./Rock";

export default class Enemies extends Phaser.GameObjects.Sprite {
  timer;
  constructor(scene, x, y, texture, velocity, pathfinding) {
    super(scene, x, y, texture);
    this.velocity = velocity;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.targetX = 0;
    this.targetY = 0;
    this.enemyHp = 2000;
    this.pathfinding = pathfinding;

  }

  update() {
    this.findPathToTarget(this.targetX, this.targetY);

    this.moveTowardsTarget();
  }

  takeDamage(damageAmount) {
    if (this.active) {
      this.enemyHp -= damageAmount;
      this.setVelocity = 0
      

      if (this.enemyHp <= 0) {
        this.anims.stop();
        this.setActive(false).setVisible(false);
      }
    }
  }

  moveTowardsTarget() {
    const distanceX = this.targetX - this.x;
    const distanceY = this.targetY - this.y;

    // Calculate the angle and use it to set the velocity.
    const angle = Math.atan2(distanceY, distanceX);
    this.setVelocityX(Math.cos(angle) * this.velocityX);
    this.setVelocityY(Math.sin(angle) * this.velocityX);
  }

  findPathToTarget(targetX, targetY) {
    this.pathfinding.findPath(
      Math.floor(this.x / this.pathfinding.tileWidth),
      Math.floor(this.y / this.pathfinding.tileHeight),
      Math.floor(targetX / this.pathfinding.tileWidth),
      Math.floor(targetY / this.pathfinding.tileHeight),
      (path) => {
        if (path !== null && path.length > 1) {
          // Get the next tile on the path and set it as the target position.
          const nextTile = path[1];
          this.targetX = nextTile.x * this.pathfinding.tileWidth;
          this.targetY = nextTile.y * this.pathfinding.tileHeight;
        }
      }
    );
  }
  
}
