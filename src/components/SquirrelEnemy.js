import Phaser, { Scene } from "phaser";
import Player from "./Player";
import Rock from "./Rock";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";

import events from "../scenes/EventCenter";
export default class Enemies extends Phaser.GameObjects.Sprite {
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
    this.targetX = 1200;
    this.targetY = 2700;
    this.enemyHp = 2000;
    this.velocitySquirrel = 200;
    this.timeToThrowRock = 0;

    this.patrolling = true;
  }
  
  update(){
    if (this.patrolling) {
      const distanceX = this.targetX - this.x;
      const distanceY = this.targetY - this.y;

      const angle = Math.atan2(distanceY, distanceX);

      const velocityX = Math.cos(angle) * this.velocitySquirrel;
      const velocityY = Math.sin(angle) * this.velocitySquirrel;

      this.body.setVelocity(velocityX, velocityY);  

      if (Math.abs(velocityX) > Math.abs(velocityY)) {
        if (velocityX > 0) {
          this.anims.play("squirrelRight", true);
        } else {
          this.anims.play("squirrelLeft", true);
        }
      } else {
        if (velocityY > 0) {
          this.anims.play("squirrelDown", true);
        } else {
          this.anims.play("squirrelUp", true);
        }
      }

      const distanceToTarget = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetX,
        this.targetY
      );

      if (distanceToTarget < 2) {
        this.targetX = Phaser.Math.Between(1000, 2450);
        this.targetY = Phaser.Math.Between(2000, 3150);
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


  takeDamage(damageAmount) {

    if (this.active) {
      this.enemyHp = this.enemyHp - this.scene.damageAmount;
     
      if (this.enemyHp <= 0) {
        this.anims.play("explosion",true);
       this.scene.exp=this.scene.exp + 200
       console.log("xp awarded ", this.scene.exp)
       if(this.scene.exp>=1200){
        this.scene.lvl ++
        this.levelUpSound = this.scene.sound.add("levelup");
        this.levelUpSound.play();
        this.scene.maxHp += 25;
        this.scene.exp = 0
        events.emit("UpdateMaxHp", { maxHp: this.scene.maxHp });
        events.emit("UpdateLVL", {lvl: this.scene.lvl });
        this.scene.damageAmount += 100;
       }
        
        
        this.scene.squirrelsKilled++;
        this.scene.squirrelsKilledText.setText(
        `${getPhrase(this.deadSquirrel)}: ${this.scene.squirrelsKilled} /4`);

        this.setVisible(false)
        this.setActive(false)
    }
  }
}
}
