import Phaser from "phaser";
import { FETCHED, FETCHING, READY, TODO } from "../enums/status";
import { getPhrase } from "../services/translations";
import keys from "../enums/keys";

export default class Login extends Phaser.Scene {
  #wasChangedLanguage = TODO;
  constructor() {
    super("Login");
    const { login, guest, user, logout } = keys.LoginMenu;
    this.login = login;
    this.guest = guest;
    this.user = user;
    this.out = logout;
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
    
    this.add
      .text(canvasWidth / 2, 200, getPhrase(this.login), {
        fontSize: "90px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setOrigin(0.5);
    
    this.guestText = this.add.text(canvasWidth / 2, 400, getPhrase(this.guest), {
        fontSize: "60px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.firebase
          .signInAnonymously()
          .then(() => {
            this.scene.start("MainMenu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
      this.guestText.on("pointerover", () => {
        this.guestText.setFill("#F3E5AB");
      });
  
      this.guestText.on("pointerout", () => {
        this.guestText.setFill("FFFF00");
      });

    this.userText = this.add.text(canvasWidth / 2, 500, getPhrase(this.user), {
        fontSize: "60px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.firebase
          .signInWithGoogle()
          .then(() => {
            this.scene.start("MainMenu");
          })
          .catch((error) => {
            console.log("🚀 ~ file: Login.js:74 ~ .catch ~ error", error);
          });
      });
      this.userText.on("pointerover", () => {
        this.userText.setFill("#F3E5AB");
      });
  
    this.userText.on("pointerout", () => {
        this.userText.setFill("FFFF00");
      });

      this.logOutText = this.add.text(canvasWidth / 2, 700, getPhrase(this.out), {
        fontSize: "60px",
        fontFamily: "Trebuchet MS",
        fill: "FFFF00",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.click.play();
        this.firebase.logOut()
      });
      this.logOutText.on("pointerover", () => {
        this.logOutText.setFill("#F3E5AB");
      });
  
      this.logOutText.on("pointerout", () => {
        this.logOutText.setFill("FFFF00");
      });

    
  }
}