import Phaser from "phaser";

export default class Enemies extends Phaser.GameObjects.Sprite {
  timer;
  constructor(scene, x, y, texture, velocity, identificador) {
    super(scene, x, y, texture);
    this.idc = identificador;
    this.velocityX = velocity;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.velocity = velocity;
    this.createWaypoints();
    this.enemyHp = 200;
    this.newWaypoint = false;
  }

  createWaypoints() {
    this.targetX = Phaser.Math.Between(20, 2500);
    this.targetY = Phaser.Math.Between(10, 300);
  }

  takeDamage(damageAmount) {
    if (this.active) {
      this.enemyHp -= damageAmount;

      if (this.enemyHp <= 0) {
        this.anims.stop();
        this.setActive(false).setVisible(false);
      }
    }
  }

  update() {}

  moveWithIA() {
    var toX = Math.floor(this.targetX / 50);
    var toY = Math.floor(this.targetY / 50);
    var fromX = Math.floor(this.x / 50);
    var fromY = Math.floor(this.y / 50);
    console.log(
      "going from (" + fromX + "," + fromY + ") to (" + toX + "," + toY + ")"
    );

    this.scene.easystar.findPath(fromX, fromY, toX, toY, (path) => {
      if (path === null) {
        console.warn("Path was not found.");
      } else {
        console.log("path", path);
        this.move(path, this.scene.map);
      }
    });
    this.scene.easystar.calculate();
  }

  move(path, map) {
    console.log(this.idc, path);
    let duration = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const ex = path[i + 1].x;
      const ey = path[i + 1].y;

      let anim = "walk-down";
      if (ex > ey) {
        if (ex > 0) {
          anim = "walk-right";
        } else {
          anim = "walk-left";
        }
      } else {
        if (ex < 0) {
          anim = "walk-up";
        }
      }

      this.scene.tweens.add({
        targets: this,
        x: {
          value: ex * map.tileWidth,
          duration: 1250,
          onStart: () => this.anims.play(anim, true),
        },
        y: { value: ey * map.tileHeight, duration: 1250 },
      });

      duration += 1250;
    }
    console.log(this.scene.tweens);
    this.path = path;
    setTimeout(() => {
      this.createWaypoints();
      this.moveWithIA();
    }, duration + 1000);
  }
}
