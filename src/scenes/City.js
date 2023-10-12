import Phaser, { Data } from "phaser";
import EasyStar from "easystarjs";
import events from "./EventCenter";
import Player from "../components/Player";
import Enemies from "../components/Enemies";
import Hitbox from "../components/AttackHitbox";
import Npc from "../components/Npc";
import EnemiesHitbox from "../components/EnemiesHitbox";
import Rock from "../components/Rock";
import Pathfinding from "../components/Pathfiniding";
//  import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
//  import { getPhrase } from "../services/translations";
// import keys from "../enums/keys";

//  Main biome, player starts the game here and after completing some tasks unlocks the desert
//  Has pathway to forest
//  holds some secret collectibles
//  Can access bossArena
//  Resistence camp with npcs are here
//  Has normal enemies
//  save station
export default class City extends Phaser.Scene {
  // #wasChangedLanguage = TODO;
  constructor() {
    super("City");
    // const { squirrelsKill } = keys.City;
    // this.squirrelsKill = squirrelsKill;
    this.lvl;
    this.hp;
    this.experience;
    this.player;
    this.velocityPlayer;
    this.squirrels = [];

    this.squirrelsKilled;
    this.squirrelsKilledText;
    this.damageAmount;
    this.enemyHp;
    
  }

  init(data) {
    this.lvl = data.lvl || 1;
    this.hp = data.hp || 200;
    this.experience = data.experience || 0;
    this.velocityPlayer = data.velocityPlayer || 600;
    this.velocitySquirrel = data.velocitySquirrel || 100;
    this.enemyHp = data.enemyhp || 20;
    this.damageAmount = data.damageAmount || 300;
    this.squirrelsKilled = data.squirrelsKilled || 8;
    this.cityMissionComplete = data.cityMissionComplete;
    this.positionX = data.x || 4100;
    this.positionY = data.y || 1900;
  }

  create() {
    

    const map = this.make.tilemap({ key: "City" });
    this.tileWidth = map.tileWidth;
    this.tileHeight = map.tileHeight;

    const layerbackGround = map.addTilesetImage("TDJ2 - tileset", "Mapcity");
    const background = map.createLayer("Ground", layerbackGround, 0, 0);
    const layerObstacle = map.addTilesetImage("TDJ2 - tileset", "Mapcity");
    const obstacle = map.createLayer("Deco", layerObstacle, 0, 0);

    const objectsLayer = map.getObjectLayer("Objects");
    this.collectible = this.physics.add.group();
    this.collectible.allowGravity = false;
    this.salida = this.physics.add.group();
    this.salida.allowGravity = false;

    objectsLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;

      switch (name) {
        case "cura": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          let collectible1 = this.collectible
            .create(x, y, "cura")
            .setScale(1)
            .setSize(200, 200);
          collectible1.anims.play("cura-anim", true);

          break;
        }

        case "desierto": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          let salida = this.salida
            .create(x, y, "FlechaSalida")
            .setScale(1)
            .setSize(200, 200)
            .setVisible(false)
            .setActive(false);
          break;
        }
      }
    });

    this.player = new Player(this, this.positionX, this.positionY, "C4", this.velocityPlayer);
    const top = map.createLayer("Top", layerbackGround, 0, 0);

    // Inside your pathfinding setup code
const groundLayer = map.getLayer('Ground').tilemapLayer;
const obstacleLayer = map.getLayer('Deco').tilemapLayer;

groundLayer.forEachTile((tile) => {
  const isWalkable = tile.properties.isWalkable;
  console.log(`Tile (${tile.x}, ${tile.y}) is walkable: ${isWalkable}`);
});


    this.playersGroup = this.physics.add.group();
    this.collectibleGroup = this.physics.add.group();
    this.squirrelGroup = this.physics.add.group();
    this.rocksGroup = this.physics.add.group();
    this.attackSound = this.sound.add("swordAttack", { volume: 0.5 });

    this.hitbox = new Hitbox(this, this.player);

    this.Eagle = new Npc(this, 4550, 3290, "Eagle");

    const pathfinding = new Pathfinding(this, map, background, obstacle);

    this.squirrels.push(
      new Enemies(this, 700, 100, "Squirrel", this.velocitySquirrel, pathfinding)
    );
    this.squirrels.push(
      new Enemies(this, 1000, 200, "Squirrel", this.velocitySquirrel, pathfinding)
    );
    this.squirrels.push(
      new Enemies(this, 800, 300, "Squirrel", this.velocitySquirrel, pathfinding)
    );
    this.squirrels.push(
      new Enemies(this, 1200, 100, "Squirrel", this.velocitySquirrel, pathfinding)
    );

    for (const i in this.squirrels) {
      this.squirrels[i].targetX = 100 + i * 300; // Adjust 300 as needed based on your spacing
      this.squirrels[i].targetY = this.squirrels[i].y; // Keep their current Y position
    }

    this.hitboxSquirrels = new EnemiesHitbox(this, this.squirrels[0]);
    this.hitboxSquirrels1 = new EnemiesHitbox(this, this.squirrels[1]);
    this.hitboxSquirrels2 = new EnemiesHitbox(this, this.squirrels[2]);
    this.hitboxSquirrels3 = new EnemiesHitbox(this, this.squirrels[3]);
    this.hitboxSquirrels.setScale(5);

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
      this.squirrels,
      this.DamageTaken,
      null,
      this
    );
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

    this.squirrels[0].targetX = Phaser.Math.Between(200, 1000);
    this.squirrels[0].targetY = Phaser.Math.Between(100, 600);

    this.squirrels[1].targetX = Phaser.Math.Between(200, 1000);
    this.squirrels[1].targetY = Phaser.Math.Between(100, 600);

    this.squirrels[2].targetX = Phaser.Math.Between(200, 1000);
    this.squirrels[2].targetY = Phaser.Math.Between(100, 600);

    this.squirrels[3].targetX = Phaser.Math.Between(200, 1000);
    this.squirrels[3].targetY = Phaser.Math.Between(100, 600);

    console.log(this.player);
    this.physics.add.overlap(
      this.hitbox,
      this.squirrels,
      this.playerHitEnemy,
      null,
      this
    );

    this.squirrelsKilledText = this.add.text(1150, 60, "Squirrels Killed: 0 / 4", {
      fontSize: "50px",
      fontFamily: "Roboto Mono",
    });

    this.rectangle = this.add.image(900, 900, "rectangle");
    this.misionText = this.add
      .text(
        60,
        880,
        "Hola viajero, necesitamos tu ayuda para derrotar a las ardillas, ve y matalas",
        {
          fontSize: "35px",
          fontFamily: "Roboto Mono",
          color: "FFFF00",
        }
      )
      .setInteractive();
    this.misionText.on("pointerdown", () => {
      this.misionText.setVisible(false);
      this.rectangle.setVisible(false);
    });
    this.misionText.setVisible(false);
    this.misionText.setScrollFactor(0);
    this.rectangle.setScrollFactor(0);
    this.rectangle.setVisible(false);
    this.squirrelsKilledText.setVisible(false);
    this.squirrelsKilledText.setScrollFactor(0);

    this.citySounds = this.sound.add("citySFX", { loop: true, volume: 0.8 });
    this.citySounds.play();
  }
  update() {
    this.player.update();
    this.hitbox.update();
    this.hitboxSquirrels.update();
    this.hitboxSquirrels1.update();
    this.hitboxSquirrels2.update();
    this.hitboxSquirrels3.update();

    for (const squirrel of this.squirrels) {
      squirrel.findPathToTarget(squirrel.targetX, squirrel.targetY);
    }
  }

  DamageTaken(player, squirrel) {
    if (squirrel.active) {
      console.log("choque");
      this.hp--;
      events.emit("UpdateHP", { hp: this.hp });
    }

    if (this.hp <= 0) {
      if (squirrel && squirrel.anims.isPlaying) {
        squirrel.anims.pause();
      }

      // Destroy each squirrel individually
      for (const s of this.squirrels) {
        s.destroy(true, true);
      }
      // Clear the squirrels array
      this.squirrels = [];

      this.scene.pause("City");
      this.scene.launch("GameEnd");
    }
  }

  playerHitEnemy(hitbox, squirrel) {
    if (squirrel.active && hitbox.active) {
      if (squirrel instanceof Enemies) {
        squirrel.takeDamage(this.hitbox.damageAmount);
        this.velocitySquirrel = 0
        squirrel.anims.play("Damage",true);
 
 
 setTimeout(() => {
  // Deactivate or hide the hitbox after a delay
 this.velocitySquirrel= 300;
}, 200);

       
        this.squirrelsKilled++;

        this.squirrelsKilledText.setText(
          `Squirrels Killed: ${this.squirrelsKilled / 2} / 4`
        );
      }
    }
  }

  takeDamage(damageAmount) {
    this.enemyHp -= damageAmount;
  }

  mision(player, Eagle) {
    this.squirrelsKilledText.setVisible(true);
    this.misionText.setVisible(true);
    this.rectangle.setVisible(true);

    if (this.squirrelsKilled >= 8) {
      this.cityMissionComplete = true;
      this.misionText.setText("Felicidades por completar la misión, el desierto lo espera")
      this.squirrelsKilled = 0;
      this.squirrelsKilledText.setText("");
      

      this.lvl++;
      events.emit("UpdateLVL", { lvl: this.lvl });
      
    
      this.salida.setVisible(true).setActive(true);
    }
  }
  Heal(player, collectible) {
    this.hp = this.hp + 25;
    events.emit("UpdateHP", { hp: this.hp });
     collectible.disableBody(true, true);
  }
  NextLevel() {
    if (this.cityMissionComplete){
    const data = {
      lvl: this.lvl,
      hp: this.hp,
      damageAmount: this.damageAmount,
      velocityPlayer: this.velocityPlayer,
      cityMission: this.cityMissionComplete
    };
    for (const s of this.squirrels) {
      s.destroy(true, true);
    }
    // Clear the squirrels array
    this.squirrels = [];

    this.scene.start("Desert", data);
  } 
  }
}