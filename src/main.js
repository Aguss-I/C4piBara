 import Phaser from "phaser";
 import Preload from "./scenes/Preload";
 import MainMenu from "./scenes/MainMenu";
 import City from "./scenes/City";
 import Desert from "./scenes/Desert";
 import UI from "./scenes/UI";
 import GameEnd from "./scenes/GameEnd";
 import Credits from "./scenes/Credits";
 import Language from "./scenes/LanguagesSelector";
import GameWin from "./scenes/GameWin";
import MenuPause from "./scenes/PauseMenu";
import FirebasePlugin from "./plugins/FireBasePlugin";



 const config = {
   type: Phaser.AUTO,
   width: 1920,
   height: 1080,
   scale: {
     mode: Phaser.Scale.FIT,
     autoCenter: Phaser.Scale.CENTER_BOTH,
     min: {
       width: 1920,
       height: 1080,
     },
     max: {
       width: 1600,
       height: 1200,
     },
   },
   physics: {
     default: "arcade",
     arcade: {
       gravity: { y: 0 },
       debug: false,
     },
   },
   scene: [Preload, MainMenu, Credits, Language, City, Desert, GameEnd,GameWin,MenuPause, UI],
   plugins: {
    global: [
      {
        key: "FirebasePlugin",
        plugin: FirebasePlugin,
        start: true,
        mapping: "firebase",
      },
    ],
  },
 };


const game= new Phaser.Game(config);
