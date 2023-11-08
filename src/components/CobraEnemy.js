import Phaser, { Scene } from "phaser";
import Player from "../components/Player";
import Rock from "./Rock";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";
import events from "../scenes/EventCenter";

export default class Enemies2 extends Phaser.GameObjects.Sprite {
  timer;
  #wasChangedLanguage = TODO;
  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);
    const { cobrasKill } = keys.Enemy;
    this.deadCobra = cobrasKill;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.velocity = velocity;
    this.targetX = 500;
    this.targetY = 900;
    this.enemyCobraHp = 2000;
    this.velocityCobra = 350;
    this.patrolling = true;
    this.timeToBite = 0;
  }

  update() {
    if (this.patrolling) {
      const distanceX = this.targetX - this.x;
      const distanceY = this.targetY - this.y;

      // Calculate the angle to the target position
      const angle = Math.atan2(distanceY, distanceX);

      // Calculate the velocity components based on the angle and velocitySquirrel
      const velocityX = Math.cos(angle) * this.velocityCobra;
      const velocityY = Math.sin(angle) * this.velocityCobra;

      // Set the squirrel's velocity
      this.body.setVelocity(velocityX, velocityY);

      // Determine which direction the squirrel is moving and set the appropriate animation
      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        if (velocityX > 0) {
          this.anims.play("CobraRight", true);
        } else {
          this.anims.play("CobraLeft", true);
        }
      } else {
        if (velocityY > 0) {
          this.anims.play("CobraDown", true);
        } else {
          this.anims.play("CobraUp", true);
        }
      }

      // Check if the squirrel has reached its target position
      const distanceToTarget = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetX,
        this.targetY
      );

      if (distanceToTarget < 5) {
        // Set a new random target position within the area
        this.targetX = Phaser.Math.Between(500, 1400);
        this.targetY = Phaser.Math.Between(400, 1000);
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

  takeDamage(damageAmount) {
    if (this.active) {
      this.enemyCobraHp = this.enemyCobraHp - damageAmount;
      if (this.enemyCobraHp <= 0) {
        this.scene.exp = this.scene.exp + 200;
        console.log("xp awarded ", this.scene.exp);
        if (this.scene.exp >= 1200) {
          this.scene.lvl++;
          this.levelUpSound = this.scene.sound.add("levelup");
          this.levelUpSound.play();
          this.scene.maxHp += 25;
          this.scene.exp = 0;
          events.emit("UpdateMaxHp", { maxHp: this.scene.maxHp });
          events.emit("UpdateLVL", { lvl: this.scene.lvl });
          this.scene.damageAmount += Math.round(this.scene.damageAmount * 0.2);
        }

        this.scene.cobrasKilled++;
        this.scene.cobrasKilledText.setText(
          `${getPhrase(this.deadCobra)}: ${this.scene.cobrasKilled} / 6`
        );

        this.setVisible(false);
        this.setActive(false);
      }
    }
  }
}
