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
    this.bossVelocity = 200;
    this.bossEnemyHp = data.bossEnemyHp || 30000;
    this.initialX = 1500;
    this.initialY = 900;
    this.velocityBoulder = data.velocityBoulder || 900;
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
    this.collectibleBoss = this.physics.add.group();
    this.collectibleBoss.allowGravity = false;
    this.backCity = this.physics.add.group();
    this.backCity.allowGravity = false;
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "backcity": {
          this.backCity
            .create(x, y, "arrowUp")
            .setScale(1)
            .setSize(200, 200)
            .setVisible(true);

          break;
        }
        case "health": {
          let collectible1 = this.collectibleBoss
            .create(x, y, "health")
            .setScale(1)
            .setSize(200, 200);
          collectible1.anims.play("health-anim", true);

          break;
          
        }
        default:

        break;
      }
    });
    this.createBoulder();
    this.player = new Player(this, 500, 500, "c4", this.velocityPlayer);
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
      this.backCity,
      this.goBack,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.collectibleBoss,
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

    for (let i = 0; i < 1; i+=1) {
      const boss = new BearEnemy(
        this,
        this.initialX,
        this.initialY,
        "boss",
        this.bossVelocity
      );
      this.boss.push(boss);
    }
    this.input.keyboard.on("keydown-P", () => {
      this.scene.bringToTop("Menupause");
      this.scene.launch("Menupause");
      this.scene.pause("BossArena");
    });

    this.designUI = this.add.image(100, 1050, "uiRectangle");
    this.designUI.scaleX = 10;
    this.designUI.scaleY = 1;
    this.designUI.setScrollFactor(0, 0);

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
    for (let i = 0; i < this.boss.length; i+=1) {
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
          this.throwBoulder(this.player, boss);
          boss.timeToThrowBoulder = 80;
        }
        boss.timeToThrowBoulder -= 1;
        this.boss[i] = boss;
      }
    }
  }
  heal(player, collectible) {
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
      collectible.disableBody(true, true);
    }
  }

  playerHitEnemy(hitbox, boss) {
    if (boss.active && hitbox.active) {
      this.takeDamage();
      boss.anims.play("bossDamage", true);
    }
  }
  takeDamage() {
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
      key: "boulder",
      frame: 0,
      visible: false,
      active: false,
      repeat: 50,
      setXY: {
        x: 0,
        y: 0,
      },
    });
  }

  goBack() {
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
    this.boss = [];
    Object.values(this.boss).forEach(b => b.destroy(true, true));
    this.scene.start("City", data);
    this.scene.pause("BossArena");
  }

  throwBoulder(player, boss) {
    const directionX = player.x - boss.x;
    const directionY = player.y - boss.y;
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const velocityX = (directionX / length) * this.velocityBoulder;
    const velocityY = (directionY / length) * this.velocityBoulder;

    boss.stopMovement();

    setTimeout(() => {
      boss.resumeMovement();
    }, 500);
    

    if (Math.abs(velocityX) < Math.abs(velocityY)) {
      if (velocityY < 0) {
        boss.anims.play("attackUpBear", true);
      } else {
        boss.anims.play("attackDownBear", true);
      }
    } else {
      if (velocityX < 0) {
        boss.anims.play("attackLeftBear", true);
      } else {
        boss.anims.play("attackRightBear", true);
      }
    }
    const boulder = this.boulderGroup.get(boss.x, boss.y);
    if (boulder) {
      boulder.setActive(true);
      boulder.setVisible(true);
      this.physics.moveTo(boulder, player.x, player.y, Math.abs(velocityX));
    }

    setTimeout(() => {
      boulder.destroy(true);
    }, 2000);    
  }
  damage(player, boulder) {
    this.hp = this.hp - 75;
    events.emit("UpdateHP", { hp: this.hp });
    this.scene.get("UI").updateHealthBar();
    boulder.destroy(true);
    boulder.setVisible(false);

    if (this.hp <= 0) {
      this.player.setVisible(false).setActive(false);
      Object.values(this.boss).forEach(b => b.destroy(true, true));
      this.boss = [];
      this.scene.launch("GameEnd", { fromScene: "BossArena" });
      this.scene.pause("BossArena");
    }
  }
}
