import Phaser from "phaser";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class GameEnd extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("GameEnd");
    const { retry, dead, menu } = keys.GameEnd;
    this.retry = retry;
    this.dead = dead;
    this.menu = menu;
  
  }

  create(data) {
    const canvasWidth = this.sys.game.config.width;

    this.add.image(0,0, "gameover").setOrigin(0);
    this.died = this.add.text(canvasWidth / 2,190,getPhrase(this.dead),{
      fontSize: "100px",
      fontFamily: "Trebuchet MS",
    }).setOrigin(0.5);
    this.buttonR = this.add
    .text(canvasWidth / 2, 550, getPhrase(this.retry), {
      fontSize: "50px",
      fontFamily: "Trebuchet MS",
    }).setOrigin(0.5)
    .setInteractive();

    this.buttonR.on("pointerdown", () => {
      this.scene.get("UI").updateHealthBar()
      this.scene.launch("UI");
      if (data.fromScene === "City") {
        this.scene.start("City");
      } else if (data.fromScene === "Desert") {
        this.scene.start("Desert");
      }
      else if(data.fromScene==="BossArena"){
        this.scene.start("BossArena");
      }
     
    });
    this.buttonM = this.add.text(canvasWidth / 2, 750,getPhrase(this.menu),{
      fontFamily: "Trebuchet MS",
      fontSize: "50px",
    }).setOrigin(0.5)
    .setInteractive();
    this.buttonM.on("pointerdown", () => {
      this.scene.stop("UI");
      this.scene.stop(data.fromScene);
      this.scene.start("MainMenu");
    });
  }

  update() {
    if (this.#wasChangedLanguage === FETCHED) {
      this.buttonR.setText(getPhrase(this.retry));
      this.died.setText(getPhrase(this.dead));
      this.buttonM.setText(getPhrase(this.menu));
    }
  }

}
