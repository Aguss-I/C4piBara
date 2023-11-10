import Phaser from "phaser";
import events from "./EventCenter";

export default class UI extends Phaser.Scene {
  constructor() {
    super("UI");
  }
  init(data) {
    this.hp = data.hp || 200;
    this.lvl = data.lvl || 1;
    this.maxHp = data.maxHp || 200;
    this.exp = data.exp || 0;
  }

  create() {
    this.DesignUI = this.add.image(200,57,"UIRectangle");
    this.DesignUI.scaleX = 2.2;
    

    this.healthBackground = this.add.rectangle(250, 73, 300, 30, 0x000000);
    this.healthBackground.setOrigin(0);

    this.healthBar = this.add.rectangle(250, 73, 300, 30, 0xFF0000);
    this.healthBar.setOrigin(0);
    
    events.on("UpdateHP", this.UpdateHP, this);
    events.on("UpdateLVL", this.UpdateLVL, this);
    this.levelText = this.add.text(50, 57, `LVL ${this.lvl}`, {
      fontSize: "50px",
      fontFamily: "Roboto Mono",
    });

    this.hpTexto = this.add.text(252, 68, `${this.hp}`, {
      fontSize: "34px",
      fontFamily: "Roboto Mono",
      fill: "#FFFFFF",
    });

    events.on("UpdateHP", this.updateHealthBar, this);
    events.on("UpdateMaxHp", this.updateMaxHp, this)


  }
  UpdateHP(data) {
    this.hp = data.hp;
    this.hpTexto.setText(`${this.hp}`);
  }
  UpdateLVL(data) {
    this.lvl = data.lvl;
    this.levelText.setText(`LVL ${this.lvl}`);
  }
  updateHealthBar() {
    const maxWidth = 300;
    const currentWidth = (this.hp/this.maxHp) * maxWidth;

    this.healthBar.displayWidth = currentWidth;
  }
  updateMaxHp(data) {
    this.maxHp = data.maxHp;
    const maxWidth = 300;
    const currentWidth = (this.hp / this.maxHp) * maxWidth;
  
    this.healthBar.displayWidth = currentWidth;
  
    this.healthBackground.displayWidth = maxWidth;
  }

  

  
}
