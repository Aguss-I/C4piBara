import Phaser from "phaser";
import { EN_UK, ES_AR } from "../enums/languages";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getTranslations, getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class LanguageSelector extends Phaser.Scene {
  #textSpanish;
  #textEnglish;

  #updatedTextInScene;
  #updatedString = "Volver";
  #wasChangedLanguage = TODO;

  constructor() {
    super("LanguageSelector");
    const { back, englishSel, spanishSel } = keys.MainMenu;
    this.#updatedString = back;
    this.spanishSel = spanishSel;
    this.englishSel = englishSel;
  }

  init({ language }) {
    this.language = language;
  }

  create() {
    this.click = this.sound.add("click", { volume: 0.3 });
    
    const { width, height } = this.scale;

    const canvasWidth = this.sys.game.config.width;
    const canvasHeight = this.sys.game.config.height;

    const bgImage = this.add.image(400, 300, "menuBg");
    bgImage.setScale(
      canvasWidth / bgImage.width,
      canvasHeight / bgImage.height
    );
    bgImage.setPosition(canvasWidth / 2, canvasHeight / 2);

    this.#textSpanish = this.add
      .text(500, 300, getPhrase(this.spanishSel), {
        fontSize: "100px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.click.play();
        this.getTranslations(ES_AR);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        this.#textSpanish.setFill("#F3E5AB");
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        this.#textSpanish.setFill("FFFF00");
      });

    this.#textEnglish = this.add
      .text(1100, 300, getPhrase(this.englishSel), {
        fontSize: "100px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.click.play();
        this.getTranslations(EN_UK);
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        this.#textEnglish.setFill("#F3E5AB");
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        this.#textEnglish.setFill("FFFF00");
      });

    this.#updatedTextInScene = this.add
      .text(20, 20, getPhrase(this.#updatedString), {
        fontSize: "60px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        this.click.play();
        this.scene.start("MainMenu", { language: this.language });
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => {
        this.#updatedTextInScene.setFill("#F3E5AB");
      })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => {
        this.#updatedTextInScene.setFill("FFFF00");
      });
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.#wasChangedLanguage = READY;
      this.#updatedTextInScene.setText(getPhrase(this.#updatedString));
      this.#textSpanish.setText(getPhrase(this.spanishSel));
      this.#textEnglish.setText(getPhrase(this.englishSel));
    }
  }

  updateWasChangedLanguage = () => {
    this.#wasChangedLanguage = FETCHED;
  };

  async getTranslations(language) {
    this.language = language;
    this.#wasChangedLanguage = FETCHING;

    await getTranslations(language, this.updateWasChangedLanguage);
  }
}
