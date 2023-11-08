import Phaser, { Scene } from "phaser";
import Player from "./Player";
import Rock from "./Rock";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";

import events from "../scenes/EventCenter";
export default class BearEnemy extends Phaser.GameObjects.Sprite {
  timer;
  #wasChangedLanguage = TODO;
  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);
    const { squirrelsKill } = keys.Enemy;
    this.deadSquirrel = squirrelsKill;
    this.squirrelsKill = squirrelsKill;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.velocity = velocity;
    this.targetX = 1500;
    this.targetY = 900;
    this.bossEnemyHp = 10000;
    this.bossVelocity = 200;
    this.timeToThrowBoulder = 0;

    this.patrolling = true;
  }

  update() {
    if (this.patrolling) {
      const distanceX = this.targetX - this.x;
      const distanceY = this.targetY - this.y;

      // Calculate the angle to the target position
      const angle = Math.atan2(distanceY, distanceX);

      // Calculate the velocity components based on the angle and velocitySquirrel
      const velocityX = Math.cos(angle) * this.bossVelocity;
      const velocityY = Math.sin(angle) * this.bossVelocity;

      // Set the squirrel's velocity
      this.body.setVelocity(velocityX, velocityY);

      // Determine which direction the squirrel is moving and set the appropriate animation
      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        if (velocityX > 0) {
          this.anims.play("BearRight", true);
        } else {
          this.anims.play("BearLeft", true);
        }
      } else {
        if (velocityY > 0) {
          this.anims.play("BearDown", true);
        } else {
          this.anims.play("BearUp", true);
        }
      }

      // Check if the squirrel has reached its target position
      const distanceToTarget = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetX,
        this.targetY
      );

      if (distanceToTarget < 2) {
        // Set a new random target position within the area
        this.targetX = Phaser.Math.Between(1000, 2000);
        this.targetY = Phaser.Math.Between(1000, 1800);
      }
    }
  }

  // Add a new method to stop the squirrel's movement
  stopMovement() {
    this.patrolling = false;
    this.body.setVelocity(0, 0);
  }

  // Add a new method to resume the squirrel's movement
  resumeMovement() {
    this.patrolling = true;
  }

  
  }

