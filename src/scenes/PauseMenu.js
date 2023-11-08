import Phaser from "phaser";
import { TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class MenuPause extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("Menupause");
    const { loader } = keys.MainMenu;
    this.continueGame = loader;
    const { menu } = keys.GameEnd;
    this.menu = menu;
  }

  create() {

    const canvasWidth = this.sys.game.config.width;
    

    this.keys = this.input.keyboard.addKeys({
      p: Phaser.Input.Keyboard.KeyCodes.P,
    });

    this.add.image(963, 538, "gameover");

    const loadButton = this.add
    .text(canvasWidth / 2, 300, getPhrase(this.continueGame), {
      fontSize: "90px",
      fontFamily: "Trebuchet MS",
      fill: "#FFFFFF",
    }).setOrigin(0.5)
    .setInteractive();

  loadButton.on("pointerover", () => {
    loadButton.setFill("#F3E5AB");
  });

  loadButton.on("pointerout", () => {
    loadButton.setFill("#FFFFFF");
  });

  loadButton.on("pointerdown", () => {
    this.scene.resume(this.obtenerNivelEnPausa());
    this.scene.stop("Menupause");
  });

  let buttonM = this.add.text(canvasWidth / 2,500,getPhrase(this.menu),{
    fontFamily: "Roboto Mono",
    fontSize: "90px",
    fill: "#FFFFFF",
  }).setOrigin(0.5)
  .setInteractive();

  buttonM.on("pointerover", () => {
    buttonM.setFill("#F3E5AB");
  });

  buttonM.on("pointerout", () => {
    buttonM.setFill("#FFFFFF");
  });

  buttonM.on("pointerdown", () => {
    location.reload();
  });

    this.input.keyboard.on("keydown-P", () => {
      this.scene.resume(this.obtenerNivelEnPausa());
      this.scene.stop("Menupause");
    });
  }
  obtenerNivelEnPausa() {
    const nivelEnPausa = this.scene.manager.scenes.find((scene) =>
      scene.scene.isPaused()
    );
    return nivelEnPausa ? nivelEnPausa.scene.key : null;
  }
}
