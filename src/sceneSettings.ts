import {
  Engine,
  Scene,
  UniversalCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
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
    this.scene.clearColor = new Color4(0, 0, 0, 1.0)
    this.scene.ambientColor = new Color3(1, 1, 1);
    this.createCamera();
    this.createLight();
    this.createBackgroundPlane();
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
      this.scene,
    );
    this.camera.inputs.clear(); // disables camera movement
  }

  private createLight() {
    this.light = new HemisphericLight(
      'light',
      new Vector3(100, 0, -100000),
      this.scene,
    );
    this.light.intensity = 0.1
  }

  // Needed for player movement - the cross between this plane and mouse ray is the player's position
  private createBackgroundPlane() {
    const plane = MeshBuilder.CreatePlane('background', {width: 250, height: 200});

    plane.scaling.x = 250;
    plane.scaling.y = 200;

    const backgroundMaterial = new StandardMaterial(
      'background_material',
      this.scene,
    );
    plane.material = backgroundMaterial;
  }
}
