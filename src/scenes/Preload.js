import Phaser from "phaser";
export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.spritesheet("cura", "./assets/images/Cura.png", {
      frameWidth: 93,
      frameHeight: 86,
    });

    this.load.image("menuBg", "./assets/images/menuBg.png");
    this.load.image("title", "./assets/images/title.png");
    this.load.image("rectangle", "./assets/images/Rectangle.png");
    this.load.image("gameover", "./assets/images/Gameover.png");
    this.load.image("desertTemp", "./assets/images/desertTemp.jpg");
    this.load.image("musicOn", "./assets/images/onMusic.png");
    this.load.image("musicOff", "./assets/images/offMusic.png");
    this.load.image("UIRectangle","./assets/images/UIRectangle.png");
    this.load.spritesheet("Boss","./assets/images/BossWalk.png",{
      frameWidth: 629,
      frameHeight: 501,
    });
    this.load.spritesheet("BossAttack","./assets/images/BearAttack.png",{
      frameWidth: 791,
      frameHeight:600,
    });

    this.load.video("introScene", "./assets/videos/spaceIntro.mp4");
    this.load.video("logos", "./assets/videos/IntroLogos.mp4");
    this.load.video("Ending","./assets/videos/C4pyFinal.mp4");

    this.load.image("ArrowUp", "./assets/images/ArrowUp.png");
    this.load.image("ArrowDown", "./assets/images/ArrowDown.png");
    this.load.image("BossDoor", "./assets/images/BossEntrada.png");
    this.load.spritesheet("explosion","./assets/images/EnemyDeath.png",{
      frameWidth: 221,
      frameHeight:191,
    });
    this.load.spritesheet("savePoint","./assets/images/SavePointSprites.png",{
      frameWidth: 211.5,
      frameHeight: 270,
    });
    this.load.image("savePoint", "./assets/images/PointSave.png");

    this.load.spritesheet("Eagle", "./assets/images/NPC.png", {
      frameWidth: 230,
      frameHeight: 230,
    });
    this.load.spritesheet("Owl","./assets/images/Owl.png",{
      frameWidth: 129,
      frameHeight: 234,
    });
    this.load.image("Tutorial","./assets/images/TutorialImage.png");
    this.load.spritesheet("Rock", "./assets/images/Rock.png", {
      frameWidth: 21,
      frameHeight: 21,
    });
    this.load.spritesheet("BigBite", "./assets/images/imaginaryAttack.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("Squirrel", "./assets/images/Squirrel.png", {
      frameWidth: 221,
      frameHeight: 169,
    });
    this.load.spritesheet("Cobra","./assets/images/Cobra.png",{
      frameWidth : 270,
      frameHeight: 198
    })

    this.load.spritesheet("C4", "./assets/images/C4.png", {
      frameWidth: 212,
      frameHeight: 200,
    });
this.load.spritesheet("Boulder","./assets/images/BearAttackRock.png",{
  frameWidth:264,
  frameHeight:254,
});

    this.load.tilemapTiledJSON("City", "./assets/Tilemaps/City.json");
    this.load.tilemapTiledJSON("Desert", "./assets/Tilemaps/Desert.json");
    this.load.tilemapTiledJSON("BossArena","./assets/Tilemaps/BossArea.json");
    this.load.image("Mapdesert", "./assets/images/TilesetDesert.png");
    this.load.image("Mapcity", "./assets/images/CityTileset.png");
    this.load.image("BossAreaTileset","./assets/images/BossAreaTileset.png");
    this.load.image("Menupause","./assets/images/MenuPausa.png");
    this.load.image("Mapcity", "./assets/images/CityTileset.png");

    this.load.audio("citySFX", "./assets/Audio/citySFX.mp3");
    this.load.audio("swordAttack2", "./assets/Audio/swordAttack.wav");
    this.load.audio("menuMusic", "./assets/Audio/menuMusic.mp3");
    this.load.audio("levelup","./assets/Audio/Levelup.wav");
    this.load.audio("click","./assets/Audio/buttonClick.mp3");
    this.load.audio("collectibleSound","./assets/Audio/Collectible.mp3");

    this.load.audio("owlSound","./assets/Audio/OwlSound.mp3");
    this.load.audio("eagleSound","./assets/Audio/eagleSound.mp3");
    this.load.spritesheet("Fox","./assets/images/Fox.png",{
      frameWidth:174,
      frameHeight:155,
    
    });
    this.load.spritesheet("Gear","./assets/images/ObjetoMision.png",{
      frameWidth:113,
      frameHeight:86,
    
    });
  }

  create() {
    let logosScene = this.add.video(960, 500, "logos").setInteractive();
    logosScene.setScale(1.1);

    logosScene.play() 

    this.anims.create({
      key: "BoulderLeft",
      frames: [{ key: "Boulder", frame: 0 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "BoulderRight",
      frames: [{ key: "Boulder", frame: 1 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "BoulderUp",
      frames: [{ key: "Boulder", frame: 2 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "BoulderDown",
      frames: [{ key: "Boulder", frame: 2 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "BoulderLeft",
      frames: this.anims.generateFrameNumbers("Boulder", {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "SavePoint",
      frames: this.anims.generateFrameNumbers("savePoint", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "gear-anim",
      frames: this.anims.generateFrameNumbers("Gear", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "cura-anim",
      frames: this.anims.generateFrameNumbers("cura", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "Damage",
      frames: [{ key: "Squirrel", frame: 33 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "walkingUp",
      frames: this.anims.generateFrameNumbers("C4", { start: 18, end: 23 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "upStop",
      frames: [{ key: "C4", frame: 17 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walkingDown",
      frames: this.anims.generateFrameNumbers("C4", { start: 11, end: 16 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "downStop",
      frames: [{ key: "C4", frame: 10 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "walkingRight",
      frames: this.anims.generateFrameNumbers("C4", { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "rightStop",
      frames: [{ key: "C4", frame: 5 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walkingLeft",
      frames: this.anims.generateFrameNumbers("C4", { start: 3, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "leftStop",
      frames: [{ key: "C4", frame: 4 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "AttackLeft",
      frames: this.anims.generateFrameNumbers("C4", { start: 27, end: 29 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackRight",
      frames: this.anims.generateFrameNumbers("C4", { start: 24, end: 26 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackUp",
      frames: this.anims.generateFrameNumbers("C4", { start: 33, end: 35 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackDown",
      frames: this.anims.generateFrameNumbers("C4", { start: 30, end: 32 }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "AttackLeftSquirrel",
      frames: this.anims.generateFrameNumbers("Squirrel", {
        start: 17,
        end: 20,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackRightSquirrel",
      frames: this.anims.generateFrameNumbers("Squirrel", {
        start: 21,
        end: 24,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackUpSquirrel",
      frames: this.anims.generateFrameNumbers("Squirrel", {
        start: 25,
        end: 28,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackDownSquirrel",
      frames: this.anims.generateFrameNumbers("Squirrel", {
        start: 29,
        end: 31,
      }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "squirrelUp",
      frames: this.anims.generateFrameNumbers("Squirrel", {
        start: 9,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1, 
    });

    this.anims.create({
      key: "squirrelDown",
      frames: this.anims.generateFrameNumbers("Squirrel", {
        start: 13,
        end: 15,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "squirrelLeft",
      frames: this.anims.generateFrameNumbers("Squirrel", { start: 2, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "squirrelRight",
      frames: this.anims.generateFrameNumbers("Squirrel", { start: 5, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "CobraUp",
      frames: this.anims.generateFrameNumbers("Cobra", {
        start: 11,
        end: 14,
      }),
      frameRate: 5,
      repeat: -1, 
    });

    this.anims.create({
      key: "CobraDown",
      frames: this.anims.generateFrameNumbers("Cobra", {
        start: 16,
        end: 19,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "CobraLeft",
      frames: this.anims.generateFrameNumbers("Cobra", { start: 1, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "CobraRight",
      frames: this.anims.generateFrameNumbers("Cobra", { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "AttackLeftCobra",
      frames: this.anims.generateFrameNumbers("Cobra", {
        start: 20,
        end: 21,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "AttackRightCobra",
      frames: this.anims.generateFrameNumbers("Cobra", {
        start: 22,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "AttackUpCobra",
      frames: this.anims.generateFrameNumbers("Cobra", {
        start: 24,
        end: 25,
      }),
      frameRate: 15,
      repeat: -1,
    });
   

    this.anims.create({
      key: "AttackDownCobra",
      frames: this.anims.generateFrameNumbers("Cobra", {
        start: 26,
        end: 27,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "cobraDamage",
      frames: [{ key: "Cobra", frame: 29 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "bossDamage",
      frames: [{ key: "Boss", frame: 18 }],
      frameRate: 1,
    });
    
    this.anims.create({
      key: "BearUp",
      frames: this.anims.generateFrameNumbers("Boss", {
        start: 14,
        end: 17,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "BearDown",
      frames: this.anims.generateFrameNumbers("Boss", {
        start: 10,
        end: 13,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "BearLeft",
      frames: this.anims.generateFrameNumbers("Boss", { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "BearRight",
      frames: this.anims.generateFrameNumbers("Boss", { start: 5, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "AttackLeftBear",
      frames: this.anims.generateFrameNumbers("BossAttack", { start: 0, end: 2 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackRightBear",
      frames: this.anims.generateFrameNumbers("BossAttack", { start: 3, end: 5 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackUpBear",
      frames: this.anims.generateFrameNumbers("BossAttack", { start: 9, end:11 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "AttackDownBear",
      frames: this.anims.generateFrameNumbers("BossAttack", { start: 6, end: 8 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: 0,
    });

    logosScene.on('complete', () => {
      this.scene.start("Login");
    });

    logosScene.on('pointerdown', () => {
      this.scene.start("Login");
    });

  }
}
