import Phaser from "phaser";
import events from "./EventCenter";
import Player from "../components/Player";
import Hitbox from "../components/AttackHitbox";
import BearEnemy from "../components/BossEnemy";

export default class BossArena extends Phaser.Scene {
  constructor() {
    super("BossArena");
    this.inAttackRange = false;
    this.boss = [];
  }

  init(data) {
    this.playerX = data.x || 200;
    this.playerY = data.y || 100;
    this.velocityPlayer = data.velocityPlayer;
    this.lvl = data.lvl;
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    this.exp = data.exp || 0;
    this.missionComplete = data.missionComplete || false;
    this.damageAmount = data.damageAmount || 100;
    this.Bossvelocity = 200;
    this.bossEnemyHp = data.bossEnemyHp || 30000;
    this.initialX = 1500;
    this.initialY = 900;
    this.velocityBoulder = data.velocityBoulder || 900;
    this.missionComplete = data.missionComplete;
    this.missionDesertComplete = data.missionDesertComplete;
  }
  create() {
    this.scene.launch("UI", {
      lvl: this.lvl,
      hp: this.hp,
      maxHp: this.maxHp,
    });
    const map = this.make.tilemap({ key: "BossArena" });

    const layerbackGround = map.addTilesetImage(
      "BossAreaTileset",
      "BossAreaTileset"
    );
    map.createLayer("Ground", layerbackGround, 0, 0);
    const layerObstacle = map.addTilesetImage(
      "BossAreaTileset",
      "BossAreaTileset"
    );
    const obstacle = map.createLayer("Deco", layerObstacle, 0, 0);
    const objectsLayer = map.getObjectLayer("Objects");
    this.CollectibleBoss = this.physics.add.group();
    this.CollectibleBoss.allowGravity = false;
    this.BackCity = this.physics.add.group();
    this.BackCity.allowGravity = false;
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "backcity": {
          this.BackCity.create(x, y, "ArrowUp")
            .setScale(1)
            .setSize(200, 200)
            .setVisible(true);

          break;
        }
        case "health": {
          let collectible1 = this.CollectibleBoss.create(x, y, "health")
            .setScale(1)
            .setSize(200, 200);
          collectible1.anims.play("health-anim", true);

          break;
        }
      }
    });
    this.createBoulder();
    this.player = new Player(this, 500, 500, "C4", this.velocityPlayer);
    this.playersGroup = this.physics.add.group();
    this.hitbox = new Hitbox(this, this.player);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    obstacle.setCollisionByProperty({ colision: true });
    this.physics.add.collider(this.player, obstacle);
    this.physics.add.overlap(
      this.player,
      this.boulderGroup,
      this.damage,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.BackCity,
      this.goback,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.CollectibleBoss,
      this.heal,
      null,
      this
    );
    this.physics.add.overlap(
      this.hitbox,
      this.boss,
      this.playerHitEnemy,
      null,
      this
    );

    for (let i = 0; i < 1; i++) {
      const boss = new BearEnemy(
        this,
        this.initialX,
        this.initialY,
        "Boss",
        this.Bossvelocity
      );
      this.boss.push(boss);
    }

    this.DesignUI = this.add.image(100, 1050, "UIRectangle");
    this.DesignUI.scaleX = 10;
    this.DesignUI.scaleY = 1;
    this.DesignUI.setScrollFactor(0, 0);

    const bossMaxHpBar = this.add.rectangle(0, 0, 1700, 30, 0x000000);
    bossMaxHpBar.setOrigin(0, 0);
    bossMaxHpBar.setPosition(100, 1000);

    const bossCurrentHpBar = this.add.rectangle(0, 0, 1700, 30, 0xff0000);
    bossCurrentHpBar.setOrigin(0, 0);
    bossCurrentHpBar.setPosition(100, 1000);

    this.bossHpBars = this.add.group([bossMaxHpBar, bossCurrentHpBar]);
    this.bossHpBars.setDepth(1);

    bossMaxHpBar.setScrollFactor(0, 0);
    bossCurrentHpBar.setScrollFactor(0, 0);
  }
  update() {
    this.player.update();
    this.hitbox.update();
    for (let i = 0; i < this.boss.length; i++) {
      const boss = this.boss[i];
      boss.update();
      if (!boss.active) continue;
      const distanceToPlayer = Phaser.Math.Distance.Between(
        boss.x,
        boss.y,
        this.player.x,
        this.player.y
      );
      if (distanceToPlayer < 600) {
        if (boss.timeToThrowBoulder <= 0) {
          this.ThrowBoulder(this.player, boss);
          boss.timeToThrowBoulder = 80;
        }
        boss.timeToThrowBoulder -= 1;
        this.boss[i] = boss;
      }
    }
  }
  heal(player, Collectible) {
    this.collectibleSound = this.sound.add("collectibleSound");
    if (this.hp < this.maxHp) {
      this.collectibleSound.play();
    }
    if (this.hp < this.maxHp) {
      this.hp = this.hp + 75;

      if (this.hp > this.maxHp) {
        this.hp = this.maxHp;
      }
      events.emit("UpdateHP", { hp: this.hp });
      Collectible.disableBody(true, true);
    }
  }

  playerHitEnemy(hitbox, boss) {
    if (boss.active && hitbox.active) {
      this.takeDamage(this.hitbox.damageAmount);
      boss.anims.play("bossDamage", true);
    }
  }
  takeDamage(damageAmount, boss) {
    this.bossEnemyHp = this.bossEnemyHp - this.damageAmount;

    if (this.bossEnemyHp <= 0) {
      this.scene.stop("UI");
      this.scene.start("GameWin");
      this.scene.stop("BossArena");
    }
    const maxWidth = 1700;
    const currentHpWidth = (this.bossEnemyHp / 30000) * maxWidth;
    this.bossHpBars.getChildren()[1].setScale(currentHpWidth / maxWidth, 1);
  }
  createBoulder() {
    this.boulderGroup = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    this.boulderGroup.createMultiple({
      classType: Phaser.Physics.Arcade.Sprite,
      key: "Boulder",
      frame: 0,
      visible: false,
      active: false,
      repeat: 50,
      setXY: {
        x: 0,
        y: 0,
      },
    });
    this.boulderGroup.children.entries.forEach((bullet) => {
      bullet.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;
      bullet.setSize(150, 150);
      bullet.body.world.on(
        "worldbounds",
        function (body) {
          if (body.gameObject === this) {
            this.setActive(false);
            this.setVisible(false);
          }
        },
        bullet
      );
    });
  }
  goback(player, BackCity) {
    const data = {
      lvl: this.lvl,
      hp: this.hp,
      maxHp: this.maxHp,
      exp: this.exp,
      damageAmount: this.damageAmount,
      velocityPlayer: this.velocityPlayer,
      x: 1500,
      y: 3600,
      showtutorial: false,
    };
    for (const b of this.boss) {
      b.destroy(true, true);
    }
    this.boss = [];
    this.scene.start("City", data);
    this.scene.pause("BossArena");
  }

  ThrowBoulder(player, boss) {
    const directionX = player.x - boss.x;
    const directionY = player.y - boss.y;
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const velocityX = (directionX / length) * this.velocityBoulder;
    const velocityY = (directionY / length) * this.velocityBoulder;

    boss.stopMovement();

    setTimeout(() => {
      boss.resumeMovement();
    }, 500);
    setTimeout(() => {
      Boulder.destroy(true);
    }, 2000);

    if (Math.abs(velocityX) < Math.abs(velocityY)) {
      if (velocityY < 0) {
        boss.anims.play("AttackUpBear", true);
      } else {
        boss.anims.play("AttackDownBear", true);
      }
    } else {
      if (velocityX < 0) {
        boss.anims.play("AttackLeftBear", true);
      } else {
        boss.anims.play("AttackRightBear", true);
      }
    }
    const Boulder = this.boulderGroup.get(boss.x, boss.y);
    if (Boulder) {
      Boulder.setActive(true);
      Boulder.setVisible(true);
      this.physics.moveTo(Boulder, player.x, player.y, Math.abs(velocityX));
    }
  }
  damage(player, Boulder, boss) {
    this.hp = this.hp - 75;
    events.emit("UpdateHP", { hp: this.hp });
    this.scene.get("UI").updateHealthBar();
    Boulder.destroy(true);
    Boulder.setVisible(false);

    if (this.hp <= 0) {
      this.player.setVisible(false).setActive(false);
      for (const b of this.boss) {
        b.destroy(true, true);
      }
      this.boss = [];
      this.scene.launch("GameEnd", { fromScene: "BossArena" });
      this.scene.pause("BossArena");
    }
  }
}
