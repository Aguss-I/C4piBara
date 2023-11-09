import Phaser from "phaser";
import Enemies from "../components/CobraEnemy";
import Enemies2 from "../components/SquirrelEnemy";
import Hitbox from "./AttackHitbox";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, velocity) {
    super(scene, x, y, texture);
    this.setTexture("C4");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene = scene;
    this.body.allowGravity = false;
    this.velocity = velocity;
    this.cursor = scene.input.keyboard.createCursorKeys();
    

    this.xKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.xKeyIsPressed = false;
    this.KeySave = null;
    this.facingDirection = null;

    this.playerState = "idle";

    this.stoppedAnimation = {
      left: "leftStop",
      right: "rightStop",
      up: "upStop",
      down: "downStop",
    };
    this.body.setCollideWorldBounds(true);

  }

  update() {
    this.body.setSize(120,150);
    this.body.setVelocity(0);

    if (this.playerState !== "attacking") {
      if (this.cursor.left.isDown) {
        this.body.setVelocityX(-this.velocity);
        this.anims.play("walkingLeft", true);
        this.KeySave = "left";
      } else if (this.cursor.right.isDown) {
        this.body.setVelocityX(this.velocity);
        this.anims.play("walkingRight", true);
        this.KeySave = "right";
      } else if (this.cursor.space.isDown) {
        this.body.setVelocityY(-this.velocity);
        this.anims.play("walkingUp", true);
        this.KeySave = "up";
      } else if (this.cursor.down.isDown) {
        this.body.setVelocityY(this.velocity);
        this.anims.play("walkingDown", true);
        this.KeySave = "down";
      }

      if (this.KeySave !== null) {
        this.facingDirection = this.KeySave;
      }
    }

    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
      if (this.playerState === "idle") {
        if (this.stoppedAnimation[this.facingDirection]) {
          this.anims.play(this.stoppedAnimation[this.facingDirection]);
        } else {
          this.anims.play("downStop");
        }
      }
    }

    if (this.xKey.isDown && !this.xKeyIsPressed) {
      this.attackSwordSound = this.scene.sound.add("swordAttack2");
      this.attackSwordSound.play()
      this.xKeyIsPressed = true
      setTimeout(() => {
        this.xKeyIsPressed=false
      },400 );
      
      if (this.playerState !== "attacking") {
        this.playerState = "attacking";
        switch (this.facingDirection) {
          case "left":
            this.anims.play("AttackLeft");
            this.body.setVelocity(0);
            break;
          case "right":
            this.anims.play("AttackRight");
            this.body.setVelocity(0);
            break;
          case "up":
            this.anims.play("AttackUp");
            this.body.setVelocity(0);
            break;
          case "down":
            this.anims.play("AttackDown");
            this.body.setVelocity(0);
            break;
          default:
            this.anims.play("AttackDown");
        }
       
        }
        
        this.idleTimer = this.scene.time.addEvent({
          delay: 300,
          callback: () => {
            this.playerState = "idle";
          },
        });
      }
    }
  }

