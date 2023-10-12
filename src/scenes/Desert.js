// import Phaser from "phaser";
// // import events from "./EventCenter";
import Player from "../components/Player";
import Enemies from "../components/Enemies";
import Hitbox from "../components/AttackHitbox";
import Npc from "../components/Npc";
import EnemiesHitbox from "../components/EnemiesHitbox";

// //Second unlocked biome, after completing some tasks, unlocks forest
// //holds secret collectibles
// //has fast enemies
// //save station
export default class Desert extends Phaser.Scene {
  constructor() {
    super("Desert");
    this.lvl;
    this.hp;
    this.experience;
    this.player;
    this.velocityPlayer;
    this.damageAmount;
    this.enemyHp;
  }

  init(data) {
    this.lvl = data.lvl;
    this.hp = data.hp;
    this.experience = data.experience || 0;
    this.velocityPlayer = data.velocityPlayer;
    this.enemyHp = data.enemyhp || 200;
    this.damageAmount = data.damageAmount;
    this.cityMissionComplete = data.cityMissionComplete;
  }

  create() {
  
    const map = this.make.tilemap({ key: "Desert" });
    this.tileWidth = map.tileWidth;
    this.tileHeight = map.tileHeight;

    const layerbackGround = map.addTilesetImage("desertTileset", "Mapdesert");
    const background = map.createLayer("Ground", layerbackGround, 0, 0);
    const layerObstacle = map.addTilesetImage("desertTileset", "Mapdesert");
  
    const obstacle = map.createLayer("Deco", layerObstacle, 0, 0);

    const objectsLayer = map.getObjectLayer("Objects");
    this.player = new Player(this, 3548,
      1700, "C4", this.velocityPlayer);  
    const top = map.createLayer("Top", layerbackGround, 0, 0);  
    obstacle.setCollisionByProperty({ colision: true });
    this.playersGroup = this.physics.add.group();
    this.hitbox = new Hitbox(this, this.player);
    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.collider(this.player, obstacle);
    this.salidaDesierto = this.physics.add.group();
    this.salidaDesierto.allowGravity = false;
    objectsLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);
      const { x = 0, y = 0, name } = objData;

      switch (name) {
       
        

        case "ciudad": {
          // add star to scene
          // console.log("estrella agregada: ", x, y);
          let salida = this.salidaDesierto
            .create(x, y, "FlechaSalida")
            .setScale(1)
            .setSize(200, 200)
            .setVisible(true)
      
          break;
        }
      }
    });
    this.physics.add.overlap(this.player,this.salidaDesierto,this.backCity,null,this);
  }

  update() {
    this.player.update();
    this.hitbox.update();
  }
  backCity(){
    const data = {
      lvl: this.lvl,
      hp: this.hp,
      damageAmount: this.damageAmount,
      velocityPlayer: this.velocityPlayer,
      x: 375,
      y: 200,
      cityMission: this.cityMissionComplete
    };
    this.scene.start("City", data);
  
    
  }
}
