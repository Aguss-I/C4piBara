import Phaser from "phaser"
export default class Rock extends Phaser.GameObjects.Sprite {
    constructor(scene,x , y, texture,velocity) {
      super(scene,x, y,texture);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.allowGravity = false;
      this.scene=scene 
      
      this.setScale(1); 
      this.velocity = 700;
      scene.physics.world.enable(this) 
      
    }
    setVelocity(x,y) {
        this.body.velocity.x = x;
        this.body.velocity.y = y;
      }
    
    
  
    
  }