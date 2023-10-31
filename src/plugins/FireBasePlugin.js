import Phaser from "phaser";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBhEEa4afz2xC5EzTIOQWac_Bz5RgCKM3E",

  authDomain: "c4pybara-67854.firebaseapp.com",

  projectId: "c4pybara-67854",

  storageBucket: "c4pybara-67854.appspot.com",

  messagingSenderId: "681102691893",

  appId: "1:681102691893:web:9b0187e7ac640124122b7c",
};

export default class FirebasePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.app = initializeApp(firebaseConfig);
  }
}