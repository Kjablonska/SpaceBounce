import { Scene } from '@babylonjs/core';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { GameHandler } from './gameLogic/gameHandler';
import { HomeScreen } from './home';
import { SceneSettings } from './sceneSettings';

class App {
  private scene: Scene;
  private gameHandler: GameHandler

  constructor() {
    const sceneSettings = new SceneSettings();
    this.scene = sceneSettings.getScene();
    const engine = sceneSettings.getEngine();
    this.gameHandler = new GameHandler(this.scene);
    new HomeScreen(this.gameHandler.startGame.bind(this.gameHandler))

    engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}
new App();
