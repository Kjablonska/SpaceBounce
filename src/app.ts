import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { SceneSettings } from './sceneSettings';
import { Player } from './player';
import { StarsHandler } from './gameLogic/starsHandler';
import { TrapsHandler } from './gameLogic/trapsHandler';
import { gameLogic } from './gameLogic/gameHandler';

class App {
  constructor() {
    const sceneSettings = new SceneSettings();
    const scene = sceneSettings.getScene();
    const engine = sceneSettings.getEngine();
    const player = new Player(scene);
    const starsHandler = new StarsHandler(scene);
    const trapHandler = new TrapsHandler(scene)
    gameLogic(scene, player, starsHandler, trapHandler)
    // scene.debugLayer.show()

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
new App();
