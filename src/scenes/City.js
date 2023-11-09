import Phaser from "phaser";
import events from "./EventCenter";
import Player from "../components/Player";
import Enemies from "../components/SquirrelEnemy";
import Hitbox from "../components/AttackHitbox";
import Npc from "../components/Npc";
import { TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";
export default class City extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("City");
    const { squirrelsKill } = keys.Enemy;
    this.deadSquirrel = squirrelsKill;
    const { cityMissionBegin, cityMissionEnd, savePoint, owlNoise, owlMesseage } = keys.CityText;
    this.begin = cityMissionBegin;
    this.end = cityMissionEnd;
    this.save = savePoint;
    this.hoot = owlNoise;
    this.owlTruth= owlMesseage;

    this.lvl;
    this.hp;
    this.maxHp;
    this.exp;
    this.player;
    this.velocityPlayer;
    this.squirrels = [];

    this.squirrelsKilled;
    this.squirrelsKilledText;
    this.damageAmount;
    this.enemyHp;
    this.showtutorial=true
    this.owlSoundCanHear=false
  }

  init(data) {
    this.lvl = data.lvl || 1;
    this.hp = data.hp || 200;
    this.maxHp = data.maxHp || 200;
    this.exp = data.exp || 0;
    this.velocityPlayer = data.velocityPlayer || 700;
    this.velocityRock = data.velocityRock || 700;
    this.velocitySquirrel = data.velocitySquirrel || 100;
    this.enemyHp = data.enemyhp || 2000;
    this.damageAmount = data.damageAmount || 100;
    this.squirrelsKilled = data.squirrelsKilled || 0;
    this.missionComplete = data.missionComplete || false;
    this.missionDesertComplete = data.missionDesertComplete;
    this.playerX = data.x || 3700;
    this.playerY = data.y || 2300;
    this.initialX = 1000;
    this.initialY = 2700;
    this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.user = this.firebase.getUser();
    this.showtutorial= data.showtutorial === false ? false : true;
  }

  create() {
    this.firebase.saveGameData(this.user.uid, {
      lvl: this.lvl,
      hp: this.hp,
      exp: this.exp,
      maxHp: this.maxHp,
      damageAmount: this.damageAmount,
      missionComplete: this.missionComplete,
      squirrelsKilled: this.squirrelsKilled,
      x: 4500,
      y: 3000,
      timeStamp: new Date(),
    });

    const map = this.make.tilemap({ key: "City" });

    const layerbackGround = map.addTilesetImage("TDJ2 - tileset", "Mapcity");
    const background = map.createLayer("Ground", layerbackGround, 0, 0);
    const layerObstacle = map.addTilesetImage("TDJ2 - tileset", "Mapcity");
    const layerObstacle2 = map.addTilesetImage("BossEntrance", "BossDoor");
    const obstacle = map.createLayer("Deco", layerObstacle, 0, 0);

    const objectsLayer = map.getObjectLayer("Objects");
    this.collectible = this.physics.add.group();
    this.collectible.allowGravity = false;
    this.door = this.physics.add.group();
    this.door.allowGravity = false;

    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;

      switch (name) {
        case "cura": {
          let collectible1 = this.collectible
            .create(x, y, "cura")
            .setScale(1)
            .setSize(200, 200);
          collectible1.anims.play("cura-anim", true);

          break;
        }
        case "desierto": {
          this.salida = this.physics.add
            .image(x, y, "ArrowUp")
            .setScale(1)
            .setSize(200, 200);
          break;
        }
        case "jefe": {
          let jefe = this.door
            .create(x, y, "ArrowDown")
            .setScale(1)
            .setSize(200, 200)
            .setVisible(true)
            .setDepth(1);

          break;
        }
      }
    });

    if (!this.missionComplete) {
      this.salida.setVisible(false).setActive(false);
    }
    this.jefeDoor = this.add.image(1600, 3900, "BossDoor");

    this.player = new Player(
      this,
      this.playerX,
      this.playerY,
      "C4",
      this.velocityPlayer
    );
    const top = map.createLayer("Top", layerbackGround, 0, 0);
    this.playersGroup = this.physics.add.group();
    this.collectibleGroup = this.physics.add.group();
    this.squirrelGroup = this.physics.add.group();

    this.createRocks();

    this.hitbox = new Hitbox(this, this.player);

    this.Eagle = new Npc(this, 4550, 3290, "Eagle");

    for (let i = 0; i < 6; i++) {
      const squirrel = new Enemies(
        this,
        this.initialX,
        this.initialY,
        "Squirrel",
        this.velocitySquirrel
      );
      this.squirrels.push(squirrel);
    }

    obstacle.setCollisionByProperty({ colision: true });

    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.collider(this.player, obstacle);
    this.physics.add.overlap(this.player, this.squirrels);
    this.physics.add.overlap(this.squirrels, this.player);
    this.physics.add.collider(this.squirrels, obstacle);
    this.physics.add.overlap(
      this.player,
      this.door,
      this.BossEntrance,
      null,
      this
    );
if(this.showtutorial){
  this.tutorial = this.add.image(950, 500, "Tutorial").setScale(2);
  this.moverseText = this.add.text(480, 600, "Moverse", {
    color: "000000",
    fontSize: "35px",
    fontFamily: "Trebuchet MS",
  });
  this.atacarText = this.add.text(880, 600, "Atacar", {
    color: "000000",
    fontSize: "35px",
    fontFamily: "Trebuchet MS",
  });
  this.fullScreentext = this.add.text(1360, 600, "Pantalla Completa", {
    color: "000000",
    fontSize: "35px",
    fontFamily: "Trebuchet MS",
  });
  this.pauseText = this.add.text(1165, 600, "Pausa", {
    color: "000000",
    fontSize: "35px",
    fontFamily: "Trebuchet MS",
  });
  this.moverseText.setScrollFactor(0, 0);
  this.atacarText.setScrollFactor(0, 0);
  this.fullScreentext.setScrollFactor(0, 0);
  this.pauseText.setScrollFactor(0, 0);

  this.tutorial.setScrollFactor(0, 0).setInteractive();
  setTimeout(() => {
    this.moverseText.setVisible(false);
    this.atacarText.setVisible(false);
    this.fullScreentext.setVisible(false);
    this.pauseText.setVisible(false);
    this.tutorial.setVisible(false);
  }, 2000);

  this.tutorial.on("pointerdown", () => {
    this.moverseText.setVisible(false);
    this.atacarText.setVisible(false);
    this.fullScreentext.setVisible(false);
    this.pauseText.setVisible(false);
    this.tutorial.setVisible(false);
  });
}

   
   

    this.physics.add.overlap(
      this.player,
      this.collectible,
      this.Heal,
      null,
      this
    );
    this.physics.add.overlap(this.player, this.Eagle, this.mision, null, this);
    this.physics.add.overlap(
      this.player,
      this.salida,
      this.NextLevel,
      null,
      this
    );

    this.physics.add.overlap(
      this.hitbox,
      this.squirrels,
      this.playerHitEnemy,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.rocksGroup,
      this.damage,
      null,
      this
    );
    this.savePlace = this.physics.add.image(4300, 2850, "savePoint");

    this.rectangle = this.add.image(957, 900, "rectangle");
    this.rectangle.scaleX = 1.1;
    this.DesignUI2 = this.add.image(1700, 57, "UIRectangle");
    this.DesignUI2.scaleX = 2.2;
    this.DesignUI2.setVisible(false);
    this.squirrelsKilledText = this.add.text(
      1340,
      60,
      getPhrase(this.deadSquirrel),
      {
        fontSize: "35px",
        fontFamily: "Trebuchet MS",
      }
    );

    this.misionText = this.add
      .text(60, 800, getPhrase(this.begin), {
        fontSize: "40px",
        fontFamily: "Trebuchet MS",
        color: "FFFF00",
      })
      .setInteractive();
    this.misionText.setWordWrapWidth(this.rectangle.width);

    this.input.keyboard.on("keydown-P", () => {
      this.citySounds.stop();	
      this.scene.bringToTop("Menupause");
      this.scene.launch("Menupause");
      this.scene.pause("City");
    });
    this.misionText.setVisible(false);
    this.misionText.setScrollFactor(0);
    this.rectangle.setScrollFactor(0);
    this.rectangle.setVisible(false);
    this.squirrelsKilledText.setVisible(false);
    this.squirrelsKilledText.setScrollFactor(0);
    this.DesignUI2.setScrollFactor(0);
    this.citySounds = this.sound.add("citySFX", { loop: true, volume: 0.8 });
    this.citySounds.play();
    this.input.keyboard.on("keydown-F", () => {
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
    this.scale.fullscreenTarget = this.game.canvas;

    this.saveText = this.add.text(4200, 2850, getPhrase(this.save), {
      fontSize: "40px",
      fontFamily: "Trebuchet MS",
      color: "FFFF00",
    });
    this.saveText.setVisible(false);
    this.saveText.setDepth(1);
    this.owl=new Npc(
      this,
      3700,
      120,
      "Owl",
    )

    this.owl.setVisible(false)
    if(this.missionComplete===true){
      if(this.missionDesertComplete===true){
        this.owl.setVisible(true);
      }
    }
    this.owlText=this.add.text(60,800,getPhrase(this.hoot),{
      fontSize:"50px",
      color: "FFFF00",
      fontFamily:"Trebuchet MS",
    });
    this.owlText.setScrollFactor(0,0)
    this.owlText.setVisible(false);
    this.owlText.setWordWrapWidth(this.rectangle.width);

    this.physics.add.overlap(this.player,this.owl,this.owlInteraction,() => {this.owlSoundCanHear===true} ,this);
  }
  update() {
    this.player.update();
    this.hitbox.update();

    for (let i = 0; i < this.squirrels.length; i++) {
      const squirrel = this.squirrels[i];
      squirrel.update();
      if (!squirrel.active) continue;
      squirrel.body.setSize(150, 150);

      const distanceToPlayer = Phaser.Math.Distance.Between(
        squirrel.x,
        squirrel.y,
        this.player.x,
        this.player.y
      );
      if (distanceToPlayer < 500) {
        if (squirrel.timeToThrowRock <= 0) {
          this.throwRockAtPlayer(this.player, squirrel);
          squirrel.timeToThrowRock = 100;
        }
        squirrel.timeToThrowRock -= 1;

        this.squirrels[i] = squirrel;
      }
    }

    this.physics.overlap(
      this.player,
      this.savePlace,
      this.showSaveText,
      null,
      this
    );
  }

  showSaveText() {
    if (!this.saveText.visible) {
      this.saveText.setVisible(true);
      this.input.keyboard.on("keydown-E", () => {
        this.firebase.saveGameData(this.user.uid, {
          lvl: this.lvl,
          hp: this.hp,
          exp: this.exp,
          maxHp: this.maxHp,
          damageAmount: this.damageAmount,
          missionComplete: this.missionComplete,
          squirrelsKilled: this.squirrelsKilled,
          x: 4500,
          y: 3000,
          timeStamp: new Date(),
        });
      });
    }

    setTimeout(() => {
      this.saveText.setVisible(false);
    }, 100);
  }

  playerHitEnemy(hitbox, squirrel) {
    if (squirrel.active && hitbox.active) {
      
      squirrel.anims.play("Damage", true);
      squirrel.takeDamage(this.hitbox.damageAmount);
   
      squirrel.stopMovement();

      setTimeout(() => {
        squirrel.resumeMovement();
        
      }, 700);
    }
  }


  mision(player, Eagle) {
    this.DesignUI2.setVisible(true);
    this.squirrelsKilledText.setVisible(true);
    this.misionText.setVisible(true);
    this.rectangle.setVisible(true);

    setTimeout(() => {
      this.misionText.setVisible(false);
      this.rectangle.setVisible(false);
    }, 2000);

    if (this.squirrelsKilled >= 4) {
      this.lvl++;
     this.maxHp+=25
     events.emit("UpdateMaxHp", { maxHp: this.maxHp });
      this.levelUpSound = this.sound.add("levelup");
      this.levelUpSound.play();
      this.maxHp += 25;
      this.damageAmount += 100;
      events.emit("UpdateMaxHp", { maxHp: this.maxHp });
      events.emit("UpdateLVL", { lvl: this.lvl });
      this.missionComplete = true;
      this.misionText.setText(getPhrase(this.end));
      this.squirrelsKilled = 0;
      this.squirrelsKilledText.setText("");
    }
    if (this.missionComplete) {
      this.DesignUI2.setVisible(false);
      this.salida.setVisible(true).setActive(true);
    }
  }

  Heal(player, collectible) {
    this.collectibleSound=this.sound.add("collectibleSound");
    this.collectibleSound.play();
    
    if (this.hp < this.maxHp) {
      this.hp = this.hp + 50;

      if (this.hp > this.maxHp) {
        this.hp = this.maxHp;
      }
      events.emit("UpdateHP", { hp: this.hp });
      collectible.disableBody(true, true);
    }
  }

  NextLevel() {
    if (this.missionComplete) {
      this.tutorial.setVisible(false);
      const data = {
        lvl: this.lvl,
        hp: this.hp,
        maxHp: this.maxHp,
        exp: this.exp,
        damageAmount: this.damageAmount,
        velocityPlayer: this.velocityPlayer,
        missionComplete: this.missionComplete,
        squirrelsKilled: this.squirrelsKilled,
      };
      for (const s of this.squirrels) {
        s.destroy(true, true);
      }
      this.squirrels = [];

      this.scene.start("Desert", data);
      this.scene.pause("City");
    }
  }

  createRocks() {
    this.rocksGroup = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    this.rocksGroup.createMultiple({
      classType: Phaser.Physics.Arcade.Sprite,
      key: "Rock",
      frame: 0,
      visible: false,
      active: false,
      repeat: 50,
      setXY: {
        x: 1500,
        y: 1200,
      },
    });

    this.rocksGroup.children.entries.forEach((bullet) => {
      bullet.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;
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
  owlInteraction(player,owl){
    if(!this.owlSoundCanHear){
      this.owlSound=this.sound.add("owlSound")
      this.owlSound.play()
      this.owlSoundCanHear=true
    }
    setTimeout(() => {
    this.owlSound.stop()
      this.owlSoundCanHear=false
    }, 1000);
    this.owlText.setVisible(true)
    this.rectangle.setVisible(true)
    setTimeout(() => {
      this.owlText.setVisible(false);
      this.rectangle.setVisible(false);
    }, 2000);

    if(this.missionComplete===true && this.missionDesertComplete===true){

      this.owlText.setText(getPhrase(this.owlTruth));
    }

  }

  throwRockAtPlayer(player, squirrel) {
    const directionX = player.x - squirrel.x;
    const directionY = player.y - squirrel.y;
    const length = Math.sqrt(directionX * directionX + directionY * directionY);
    const velocityX = (directionX / length) * this.velocityRock;
    const velocityY = (directionY / length) * this.velocityRock;

    squirrel.stopMovement();

    setTimeout(() => {
      squirrel.resumeMovement();
    }, 500);

    setTimeout(() => {
      rock.destroy(true);
    }, 2000);

    if (Math.abs(velocityX) < Math.abs(velocityY)) {
      if (velocityY < 0) {
        squirrel.anims.play("AttackUpSquirrel", true);
      } else {
        squirrel.anims.play("AttackDownSquirrel", true);
      }
    } else {
      if (velocityX < 0) {
        squirrel.anims.play("AttackLeftSquirrel", true);
      } else {
        squirrel.anims.play("AttackRightSquirrel", true);
      }
    }

    const rock = this.rocksGroup.get(squirrel.x, squirrel.y);
    if (rock) {
      rock.setActive(true);
      rock.setVisible(true);
      this.physics.moveTo(rock, player.x, player.y, Math.abs(velocityX));
    }
  }
  BossEntrance() {
    const data = {
      lvl: this.lvl,
      hp: this.hp,
      maxHp: this.maxHp,
      exp: this.exp,
      damageAmount: this.damageAmount,
      velocityPlayer: this.velocityPlayer,
      missionComplete:this.missionComplete,
      missionDesertComplete:this.missionDesertComplete
    };
    for (const s of this.squirrels) {
      s.destroy(true, true);
    }
    this.squirrels = [];

    this.scene.start("BossArena", data);
    this.scene.pause("City");
  }

  damage(player, rock, squirrel,) {
    this.hp = this.hp - 25;
    events.emit("UpdateHP", { hp: this.hp });
    this.scene.get("UI").updateHealthBar();
    rock.destroy(true);
    rock.setVisible(false);

    if (this.hp <= 0) {
      this.player.setVisible(false).setActive(false);
      if (squirrel && squirrel.anims.isPlaying) {
        squirrel.anims.pause();
      }

      for (const s of this.squirrels) {
        s.destroy(true, true);
      }
      this.squirrels = [];
      this.scene.launch("GameEnd", { fromScene: "City" });
      this.scene.pause("City");
    }
  }
}
