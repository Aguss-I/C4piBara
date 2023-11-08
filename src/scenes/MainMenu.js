import Phaser from "phaser";
import { TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class MainMenu extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("MainMenu");
    const { play, credits, languagesSelec, loader } = keys.MainMenu;
    this.play = play;
    this.credits = credits;
    this.languagesSelec = languagesSelec;
    this.loadGame = loader;
  }

  create() {
    this.menuMusic = this.sound.add("menuMusic", { loop: true, volume: 0.2 });
    this.menuMusic.play();

    this.click = this.sound.add("click", { volume: 0.3 });
    

    this.user = this.firebase.getUser();

    const canvasWidth = this.sys.game.config.width;
    const canvasHeight = this.sys.game.config.height;

    const bgImage = this.add.image(400, 300, "menuBg");

    bgImage.setScale(
      canvasWidth / bgImage.width,
      canvasHeight / bgImage.height
    );
    bgImage.setPosition(canvasWidth / 2, canvasHeight / 2);

    this.add.image(990, 300, "title").setScale(1.8);

    const startY = 500;

    const spaceIntro = this.add.video(400, 300, "introScene").setInteractive().setDepth(1);
    spaceIntro.visible = false;
    spaceIntro.setScale(
      canvasWidth / bgImage.width,
      canvasHeight / bgImage.height
    );
    spaceIntro.setPosition(canvasWidth / 2, canvasHeight / 2);

    const startButton = this.add
      .text(canvasWidth / 2, startY, getPhrase(this.play), {
        fontSize: "90px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      }).setOrigin(0.5)
      .setInteractive();

    startButton.on("pointerover", () => {
      startButton.setFill("#F3E5AB");
    });

    startButton.on("pointerout", () => {
      startButton.setFill("FFFF00");
    });

    startButton.on("pointerdown", () => {
      this.click.play();
      this.menuMusic.stop();
      spaceIntro.visible = true;
      spaceIntro.play();
      spaceIntro.on('complete', () => {
        this.scene.launch("UI");
        this.scene.start("City");
      });
    });

    const loadButton = this.add
    .text(canvasWidth / 2, startY + 100, getPhrase(this.loadGame), {
      fontSize: "90px",
      fontFamily: "Trebuchet MS",
      fill: "FFFF00",
    }).setOrigin(0.5)
    .setInteractive()

  loadButton.on("pointerover", () => {
    loadButton.setFill("#F3E5AB");
  });

  loadButton.on("pointerout", () => {
    loadButton.setFill("FFFF00");
  });

  loadButton.on("pointerdown", () => {
    this.click.play();
    this.menuMusic.stop();
    this.firebase.loadGameData(this.user.uid).then(data => {
      this.scene.start("City", {
      lvl: data.lvl,
      hp: data.hp,
      exp: data.exp,
      maxHp: data.maxHp,
      damageAmount: data.damageAmount,
      missionComplete: data.missionComplete,
      squirrelsKilled: data.squirrelsKilled,
      x: 4500,
      y: 3000,
      timeStamp: new Date(),
      
    });

    this.scene.launch("UI", {
      lvl: data.lvl,
      hp: data.hp,
      maxHp: data.maxHp,
    });
  });
});

    

    spaceIntro.on("pointerdown", () => {

      this.scene.launch("UI");
      this.scene.start("City");
    });

    const creditButton = this.add
      .text(canvasWidth / 2, startY + 300, getPhrase(this.credits), {
        fontSize: "80px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      }).setOrigin(0.5)
      .setInteractive();

    creditButton.on("pointerover", () => {
      creditButton.setFill("#F3E5AB");
    });

    creditButton.on("pointerout", () => {
      creditButton.setFill("FFFF00");
    });

    creditButton.on("pointerdown", () => {
      this.click.play();
      this.scene.pause("MainMenu");
      this.scene.launch("Credits");
    });

    const languageButton = this.add
      .text(canvasWidth / 2, startY + 200, getPhrase(this.languagesSelec), {
        fontSize: "80px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      }).setOrigin(0.5)
      .setInteractive();

    languageButton.on("pointerover", () => {
      languageButton.setFill("#F3E5AB");
    });

    languageButton.on("pointerout", () => {
      languageButton.setFill("FFFF00");
    });

    languageButton.on("pointerdown", () => {
      this.click.play();
      this.menuMusic.pause();
      this.scene.start("LanguageSelector");
    });

    

    let isMusicMuted = false;
    const musicOn = this.add
      .image(1790, 980, "musicOn")
      .setInteractive()
      .setScale(2);

    musicOn.on("pointerdown", () => {
      if (isMusicMuted) {
        this.menuMusic.resume();
        musicOn.setTexture("musicOn");
        isMusicMuted = false;
      } else {
        this.menuMusic.pause();
        musicOn.setTexture("musicOff");
        isMusicMuted = true;
      }
    });
    this.input.keyboard.on('keydown-F', () => {      
      if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
      } else {
          this.scale.startFullscreen();
      }
  });
  this.scale.fullscreenTarget = this.game.canvas;


  }

}
