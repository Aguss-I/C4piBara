import Phaser from "phaser";
// // import events from "./EventCenter";

// //Preload
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
    this.load.image("musicOn", "./assets/images/musicOn.png");
    this.load.image("musicOff", "./assets/images/musicOff.png");
    //

    this.load.image("ArrowUp", "./assets/images/ArrowUp.png");
    this.load.image("ArrowDown", "./assets/images/ArrowDown.png");
    this.load.spritesheet("Eagle", "./assets/images/NPC.png", {
      frameWidth: 230,
      frameHeight: 230,
    });
    this.load.spritesheet("Rock", "./assets/images/Rock.png", {
      frameWidth: 21,
      frameHeight: 21,
    });
    this.load.spritesheet("Squirrel", "./assets/images/Squirrel.png", {
      frameWidth: 221,
      frameHeight: 169,
    });

    this.load.spritesheet("C4", "./assets/images/C4.png", {
      frameWidth: 212,
      frameHeight: 200,
      // startFrame: 10
    });

    this.load.tilemapTiledJSON("City", "./assets/Tilemaps/City.json");
    this.load.tilemapTiledJSON("Desert", "./assets/Tilemaps/Desert.json");
    this.load.image("Mapdesert", "./assets/images/DesertTileset.png");
    this.load.image("Mapcity", "./assets/images/Tileset.png");

    this.load.audio("citySFX", "./assets/Audio/citySFX.mp3");
    this.load.audio("swordAttack", "./assets/Audio/swordAttack.mp3");
    this.load.audio("menuMusic", "./assets/Audio/menuMusic.mp3");
    this.load.spritesheet("Fox", "./assets/images/Fox.png", {
      frameWidth: 174,
      frameHeight: 155,
    });
  }

  create() {
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
      repeat: -1, // Repetir indefinidamente
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

    this.scene.start("MainMenu");
  }
}
