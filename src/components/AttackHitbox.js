import Phaser from "phaser";
import Enemies from "./CobraEnemy";
import Enemies2 from "./SquirrelEnemy";
import Player from "./Player";

export default class Hitbox extends Phaser.GameObjects.Rectangle {
  constructor(scene, player) {
    super(scene, player.x, player.y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setImmovable(true);
    this.body.allowGravity = false;

    this.player = player;
    this.cursor = scene.input.keyboard.createCursorKeys();
    this.xKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.setActive(false).setVisible(false);

    this.facingDirection = null;
    this.damageAmount = 100;
  }

  update() {
    this.x = this.player.x;
    this.y = this.player.y;

    if (this.cursor.left.isDown) {
      this.facingDirection = "left";
    } else if (this.cursor.right.isDown) {
      this.facingDirection = "right";
    } else if (this.cursor.up.isDown) {
      this.facingDirection = "up";
    } else if (this.cursor.down.isDown) {
      this.facingDirection = "down";
    }

    if (this.xKey.isDown && this.facingDirection !== null) {
      if (!this.isAttacking) {
        switch (this.facingDirection) {
          case "left":
            this.width = 150;
            this.height = 200;
            this.setPosition(this.player.x - 90, this.player.y);
            this.attack();
            break;
          case "right":
            this.width = 150;
            this.height = 200;
            this.setPosition(this.player.x + 90, this.player.y);
            this.attack();
            break;
          case "up":
            this.width = 212;
            this.height = 150;
            this.setPosition(this.player.x, this.player.y - 87);
            this.attack();
            break;
          case "down":
            this.width = 212;
            this.height = 150;
            this.setPosition(this.player.x, this.player.y + 87);
            this.attack();
            break;
        }
      } else {
        this.setActive(false).setVisible(false);
      }
    }
  }

  attack() {
    this.setActive(true).setVisible(true);
    setTimeout(() => {
      this.setActive(false).setVisible(false);
    }, 100);
  }
}
