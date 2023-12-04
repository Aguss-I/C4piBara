import Phaser from "phaser";
export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.tilemapTiledJSON("City", "./assets/Tilemaps/City.json");
    this.load.tilemapTiledJSON("Desert", "./assets/Tilemaps/Desert.json");
    this.load.tilemapTiledJSON("BossArena", "./assets/Tilemaps/BossArea.json");

    this.load.spritesheet("health", "./assets/images/Cura.png", {
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
    this.load.image("uiRectangle", "./assets/images/UIRectangle.png");
    this.load.spritesheet("boss", "./assets/images/BossWalk.png", {
      frameWidth: 629,
      frameHeight: 501,
    });

    this.load.spritesheet("bossAttack", "./assets/images/BearAttack.png", {
      frameWidth: 791,
      frameHeight: 600,
    });

    this.load.video("introScene", "./assets/videos/spaceIntro.mp4");
    this.load.video("logos", "./assets/videos/IntroLogos.mp4");
    this.load.video("ending", "./assets/videos/C4pyFinal.mp4");

    this.load.image("arrowUp", "./assets/images/ArrowUp.png");
    this.load.image("arrowDown", "./assets/images/ArrowDown.png");
    this.load.image("bossDoor", "./assets/images/BossEntrada.png");

    this.load.spritesheet("explosion", "./assets/images/EnemyDeath.png", {
      frameWidth: 221,
      frameHeight: 191,
    });

    this.load.spritesheet("savePoint", "./assets/images/SavePointSprites.png", {
      frameWidth: 211.5,
      frameHeight: 270,
    });

    this.load.spritesheet("eagle", "./assets/images/NPC.png", {
      frameWidth: 230,
      frameHeight: 230,
    });

    this.load.spritesheet("owl", "./assets/images/Owl.png", {
      frameWidth: 129,
      frameHeight: 234,
    });

    this.load.image("tutorial", "./assets/images/TutorialImage.png");

    this.load.spritesheet("rock", "./assets/images/Rock.png", {
      frameWidth: 21,
      frameHeight: 21,
    });

    this.load.spritesheet("bigBite", "./assets/images/imaginaryAttack.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("squirrel", "./assets/images/Squirrel.png", {
      frameWidth: 221,
      frameHeight: 169,
    });

    this.load.spritesheet("cobra", "./assets/images/Cobra.png", {
      frameWidth: 270,
      frameHeight: 198,
    });

    this.load.spritesheet("c4", "./assets/images/C4.png", {
      frameWidth: 212,
      frameHeight: 200,
    });

    this.load.spritesheet("boulder", "./assets/images/BearAttackRock.png", {
      frameWidth: 264,
      frameHeight: 254,
    });

    this.load.image("Mapdesert", "./assets/images/TilesetDesert.png");
    this.load.image("Mapcity", "./assets/images/CityTileset.png");
    this.load.image("BossAreaTileset", "./assets/images/BossAreaTileset.png");

    this.load.audio("citySFX", "./assets/Audio/citySFX.mp3");
    this.load.audio("swordAttack2", "./assets/Audio/swordAttack.wav");
    this.load.audio("menuMusic", "./assets/Audio/menuMusic.mp3");
    this.load.audio("levelup", "./assets/Audio/Levelup.wav");
    this.load.audio("click", "./assets/Audio/buttonClick.mp3");
    this.load.audio("collectibleSound", "./assets/Audio/Collectible.mp3");
    this.load.audio("owlSound", "./assets/Audio/OwlSound.mp3");
    this.load.audio("eagleSound", "./assets/Audio/eagleSound.mp3");

    this.load.spritesheet("fox", "./assets/images/Fox.png", {
      frameWidth: 174,
      frameHeight: 155,
    });

    this.load.spritesheet("gear", "./assets/images/ObjetoMision.png", {
      frameWidth: 113,
      frameHeight: 86,
    });
  }

  create() {
    let logosScene = this.add.video(960, 500, "logos").setInteractive();
    logosScene.setScale(1.1);

    logosScene.play();

    this.anims.create({
      key: "boulderLeft",
      frames: [{ key: "boulder", frame: 0 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "boulderRight",
      frames: [{ key: "boulder", frame: 1 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "boulderUp",
      frames: [{ key: "boulder", frame: 2 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "boulderDown",
      frames: [{ key: "boulder", frame: 2 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "savePoint",
      frames: this.anims.generateFrameNumbers("savePoint", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "gear-anim",
      frames: this.anims.generateFrameNumbers("gear", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "health-anim",
      frames: this.anims.generateFrameNumbers("health", { start: 0, end: 1 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "damage",
      frames: [{ key: "squirrel", frame: 33 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "walkingUp",
      frames: this.anims.generateFrameNumbers("c4", { start: 18, end: 23 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "upStop",
      frames: [{ key: "c4", frame: 17 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walkingDown",
      frames: this.anims.generateFrameNumbers("c4", { start: 11, end: 16 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "downStop",
      frames: [{ key: "c4", frame: 10 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "walkingRight",
      frames: this.anims.generateFrameNumbers("c4", { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "rightStop",
      frames: [{ key: "c4", frame: 5 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "walkingLeft",
      frames: this.anims.generateFrameNumbers("c4", { start: 3, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "leftStop",
      frames: [{ key: "c4", frame: 4 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "attackLeft",
      frames: this.anims.generateFrameNumbers("c4", { start: 27, end: 29 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackRight",
      frames: this.anims.generateFrameNumbers("c4", { start: 24, end: 26 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackUp",
      frames: this.anims.generateFrameNumbers("c4", { start: 33, end: 35 }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackDown",
      frames: this.anims.generateFrameNumbers("c4", { start: 30, end: 32 }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "attackLeftSquirrel",
      frames: this.anims.generateFrameNumbers("squirrel", {
        start: 17,
        end: 20,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "attackRightSquirrel",
      frames: this.anims.generateFrameNumbers("squirrel", {
        start: 21,
        end: 24,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "attackUpSquirrel",
      frames: this.anims.generateFrameNumbers("squirrel", {
        start: 25,
        end: 28,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackDownSquirrel",
      frames: this.anims.generateFrameNumbers("squirrel", {
        start: 29,
        end: 31,
      }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "squirrelUp",
      frames: this.anims.generateFrameNumbers("squirrel", {
        start: 9,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "squirrelDown",
      frames: this.anims.generateFrameNumbers("squirrel", {
        start: 13,
        end: 15,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "squirrelLeft",
      frames: this.anims.generateFrameNumbers("squirrel", { start: 2, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "squirrelRight",
      frames: this.anims.generateFrameNumbers("squirrel", { start: 5, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "cobraUp",
      frames: this.anims.generateFrameNumbers("cobra", {
        start: 11,
        end: 14,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cobraDown",
      frames: this.anims.generateFrameNumbers("cobra", {
        start: 16,
        end: 19,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cobraLeft",
      frames: this.anims.generateFrameNumbers("cobra", { start: 1, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "cobraRight",
      frames: this.anims.generateFrameNumbers("cobra", { start: 6, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "attackLeftCobra",
      frames: this.anims.generateFrameNumbers("cobra", {
        start: 20,
        end: 21,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "attackRightCobra",
      frames: this.anims.generateFrameNumbers("cobra", {
        start: 22,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "attackUpCobra",
      frames: this.anims.generateFrameNumbers("cobra", {
        start: 24,
        end: 25,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "attackDownCobra",
      frames: this.anims.generateFrameNumbers("cobra", {
        start: 26,
        end: 27,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "cobraDamage",
      frames: [{ key: "cobra", frame: 29 }],
      frameRate: 1,
    });
    this.anims.create({
      key: "bossDamage",
      frames: [{ key: "boss", frame: 18 }],
      frameRate: 1,
    });

    this.anims.create({
      key: "bearUp",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 14,
        end: 17,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "bearDown",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 10,
        end: 13,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "bearLeft",
      frames: this.anims.generateFrameNumbers("boss", { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "bearRight",
      frames: this.anims.generateFrameNumbers("boss", { start: 5, end: 9 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "attackLeftBear",
      frames: this.anims.generateFrameNumbers("bossAttack", {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackRightBear",
      frames: this.anims.generateFrameNumbers("bossAttack", {
        start: 3,
        end: 5,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackUpBear",
      frames: this.anims.generateFrameNumbers("bossAttack", {
        start: 9,
        end: 11,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "attackDownBear",
      frames: this.anims.generateFrameNumbers("bossAttack", {
        start: 6,
        end: 8,
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "explosion",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: 0,
    });

    logosScene.on("complete", () => {
      this.scene.start("Login");
    });

    logosScene.on("pointerdown", () => {
      this.scene.start("Login");
    });
  }
}
