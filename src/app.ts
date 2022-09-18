import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { GameHandler } from './gameLogic/gameHandler';
import { SceneSettings } from './sceneSettings';

class App {
  constructor() {
    const sceneSettings = new SceneSettings();
    const scene = sceneSettings.getScene();
    const engine = sceneSettings.getEngine();
    const gameHandler = new GameHandler(scene);
    gameHandler.startGame();
    // scene.debugLayer.show()

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
new App();
