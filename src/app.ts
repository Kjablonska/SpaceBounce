import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';
import { SceneSettings } from './sceneSettings';
import { Player } from './player';

class App {
  constructor() {
    const sceneSettings = new SceneSettings();
    const scene = sceneSettings.getScene();
    const engine = sceneSettings.getEngine();
    const playerSettings = new Player(scene);

    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
new App();
