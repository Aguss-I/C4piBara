import Phaser from "phaser";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";
export default class Credits extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("Credits");
    const { programmers, artist, back } = keys.CreditsMenu;
    this.programmers = programmers;
    this.artist = artist;
    this.back = back;
  }

  create() {
    this.click = this.sound.add("click", { volume: 0.3 });
    
    const canvasWidth = this.sys.game.config.width;
    const canvasHeight = this.sys.game.config.height;

    const bgImage = this.add.image(400, 300, "menuBg");
    bgImage.setScale(
      canvasWidth / bgImage.width,
      canvasHeight / bgImage.height
    );
    bgImage.setPosition(canvasWidth / 2, canvasHeight / 2);

    this.add.text(canvasWidth / 2, 160, getPhrase(this.programmers), {
      fontSize: "128px",
      fontFamily: "Trebuchet MS",
      fill: "FFFF00",
    }).setOrigin(0.5);
    this.add.text(canvasWidth / 2, 520, getPhrase(this.artist), {
      fontSize: "128px",
      fontFamily: "Trebuchet MS",
      fill: "FFFF00",
    }).setOrigin(0.5);
    this.add.text(canvasWidth / 2, 300, "Sebastian Faetani", {
      fontSize: "50px",
      fontFamily: "Trebuchet MS",
      fill: "FFFF00",
    }).setOrigin(0.5);
    this.add.text(canvasWidth / 2, 400, "Agustin Iñiguez", {
      fontSize: "50px",
      fontFamily: "Trebuchet MS",
      fill: "FFFF00",
    }).setOrigin(0.5);
    this.add.text(canvasWidth / 2, 630, "Sasha Flory", {
      fontSize: "50px",
      fontFamily: "Trebuchet MS",
      fill: "FFFF00",
    }).setOrigin(0.5);

    let buttonV = this.add
      .text(10, 10, getPhrase(this.back), {
        fontSize: "50px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setInteractive();

    buttonV.on("pointerover", () => {
      buttonV.setFill("#F3E5AB");
    });

    buttonV.on("pointerout", () => {
      buttonV.setFill("FFFF00");
    });

    buttonV.on("pointerdown", () => {
      this.click.play();
      this.scene.resume("MainMenu");
      this.scene.stop("Credits");
    });
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.programmers.setText(getPhrase(this.programmers));
      this.artist.setText(getPhrase(this.artist));
      this.back.setText(getPhrase(this.back));
    }
  }
}
