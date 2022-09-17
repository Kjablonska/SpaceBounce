import {
  Mesh,
  MeshBuilder,
  Scene,
  AdvancedTimer,
  StandardMaterial,
  Color3,
} from '@babylonjs/core';

export class TrapsHandler {
  private trapMap: Map<string, Mesh> = new Map<string, Mesh>();
  private trapTimer: AdvancedTimer;
  constructor(scene: Scene) {
    this.trapTimer = this.setTrapTimer(scene);
  }

  public createTrap(scene: Scene) {
    const trapName = `trap${this.trapMap.size}`;
    const trap = MeshBuilder.CreateSphere(trapName, { diameter: 1 }, scene);
    trap.position.x = Math.random() * 10; // TODO
    trap.position.y = Math.random() * 10; // TODO
    const greenMat = new StandardMaterial('trapMaterial', scene);
    greenMat.diffuseColor = new Color3(0, 0, 0);
    trap.material = greenMat;
    this.trapMap.set(trapName, trap);
    console.log('TRAP');
  }

  public isTrap(name: string) {
    return this.trapMap.has(name);
  }

  public startTrapTimer() {
    this.trapTimer.start();
  }

  private disposeRandomTrap() {
    if (this.trapMap.size < 3) {
      return;
    }
    const randomTrapNumber = Math.floor(Math.random() * this.trapMap.size);
    const trapToDispose = this.trapMap.get(`trap${randomTrapNumber}`);
    trapToDispose?.dispose();
  }

  private setTrapTimer(scene: Scene) {
    const advancedTimer: AdvancedTimer<Scene> = new AdvancedTimer({
      timeout: 3000,
      contextObservable: scene.onBeforeRenderObservable,
    });

    advancedTimer.onTimerEndedObservable.add(() => {
      this.createTrap(scene);
      const trapTimeout = Math.random() * 10000;
      this.disposeRandomTrap();
      advancedTimer.start(trapTimeout);
    });

    return advancedTimer;
  }
}
