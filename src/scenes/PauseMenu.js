import Phaser from "phaser";




export default class MenuPause extends Phaser.Scene {
  
  constructor() {
    super("Menupause");

  
  
  
  }

  create() {
    this.keys = this.input.keyboard.addKeys({p:  Phaser.Input.Keyboard.KeyCodes.P});
    
    this.add.image(963,538,"Menupause");
    this.input.keyboard.on('keydown-P',()=>{
       
        this.scene.resume(this.obtenerNivelEnPausa());
        this.scene.stop("Menupause");
      })
}
obtenerNivelEnPausa(){
    const nivelEnPausa = this.scene.manager.scenes.find(scene => scene.scene.isPaused());
    return nivelEnPausa? nivelEnPausa.scene.key : null;
}
}
