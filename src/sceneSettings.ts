import {
  Engine,
  Scene,
  UniversalCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  ArcRotateCamera,
  FreeCamera,
} from '@babylonjs/core';

export class SceneSettings {
  private canvas: HTMLCanvasElement;
  private scene: Scene;
  private camera: UniversalCamera;
  private light: HemisphericLight;
  private engine: Engine;

  constructor() {
    this.createCanvas();
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);
    this.scene.ambientColor = new Color3(1, 1, 1);
    this.createCamera();
    this.createLight();
    this.createBackgroundPlane();
    // this.createDebuggerListener();
  }

  public getScene() {
    return this.scene;
  }

  public getEngine() {
    return this.engine;
  }

  private createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.margin = '0px';
    this.canvas.style.padding = '0px';
    this.canvas.style.overflow = 'hidden';
    this.canvas.id = 'gameCanvas';
    document.body.appendChild(this.canvas);
  }

  private createCamera() {
    this.camera = new UniversalCamera(
      'camera',
      new Vector3(0, 0, -250),
      this.scene
    );
    this.camera.inputs.clear(); // disables camera movement
  }

  private createLight() {
    this.light = new HemisphericLight(
      'light',
      new Vector3(0, -10, -300),
      this.scene
    );
  }

  // Needed for player movement - the cross between this plane and mouse ray is the player's position
  private createBackgroundPlane() {
    const plane = MeshBuilder.CreatePlane('background', {
      // height: 80, //window.innerWidth,
      // width: 120//window.innerHeight,
    });

    plane.scaling.x = 250;
    plane.scaling.y = 200;

    const backgroundMaterial = new StandardMaterial(
      'background_material',
      this.scene
    );
    plane.material = backgroundMaterial;
    backgroundMaterial.alpha = 0;
  }

//   public createDebuggerListener() {
//     window.addEventListener('keydown', (ev) => {
//       if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
//         this.scene.debugLayer.isVisible()
//           ? this.scene.debugLayer.hide()
//           : this.scene.debugLayer.show();
//       }
//     });
//   }
}
