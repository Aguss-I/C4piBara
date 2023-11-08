import Phaser from "phaser";
export default class GameWin extends Phaser.Scene {
  constructor() {
    super("GameWin");
  }

  create() {
    const canvasWidth = this.sys.game.config.width;
    const canvasHeight = this.sys.game.config.height;

    const theEnd = this.add.video(960, 500, "Ending").setInteractive().setDepth(1);
    theEnd.setScale(1.5);
    theEnd.setPosition(canvasWidth / 2, canvasHeight / 2);
    theEnd.setVolume(0.5)
    theEnd.play();
    theEnd.on('complete', () => {
    location.reload();
    
    });
    theEnd.on("pointerdown", () => {
      location.reload();
    });
 
    }
  
}