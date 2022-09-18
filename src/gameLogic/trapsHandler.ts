import {
  Mesh,
  MeshBuilder,
  Scene,
  AdvancedTimer,
  StandardMaterial,
  Color3,
} from '@babylonjs/core';
import { generatePosition } from './utils/positionGenerator';

export class TrapsHandler {
  private trapMap: Map<string, Mesh> = new Map<string, Mesh>();
  private trapGenerationTimer: AdvancedTimer<Scene>;
  private trapDisposalTimer: AdvancedTimer<Scene>;
  constructor() {}

  public createTrap(scene: Scene) {
    const trapName = `trap${this.trapMap.size}`;
    const trap = MeshBuilder.CreateSphere(trapName, { diameter: Math.random() * 20 }, scene);
    const {x, y} = generatePosition()
    trap.position.x = x
    trap.position.y = y
    const greenMat = new StandardMaterial('trapMaterial', scene);
    greenMat.diffuseColor = new Color3(0, 0, 0);
    trap.material = greenMat;
    this.trapMap.set(trapName, trap);
    console.log('TRAP');
  }

  public isTrap(name: string) {
    return this.trapMap.has(name);
  }

  public startTrapTimers() {
    this.trapGenerationTimer.start();
    this.trapDisposalTimer.start();
  }

  public stopTrapTimers() {
    this.trapGenerationTimer.dispose();
    this.trapDisposalTimer.dispose();
  }

  private disposeRandomTrap() {
    if (this.trapMap.size < 5) {
      return;
    }
    const randomTrapNumber = Math.floor(Math.random() * this.trapMap.size);
    const trapToDispose = this.trapMap.get(`trap${randomTrapNumber}`);
    trapToDispose?.dispose();
  }

  public gameOverHandler() {
    this.trapMap.forEach((trap) => {
      trap.dispose()
    })
    this.trapMap.clear()
  }

  public setTrapTimer(scene: Scene) {
    this.trapGenerationTimer = new AdvancedTimer({
      timeout: 3000,
      contextObservable: scene.onBeforeRenderObservable,
    });

    this.trapDisposalTimer = new AdvancedTimer({
      timeout: 3000,
      contextObservable: scene.onBeforeRenderObservable,
    });

    this.trapGenerationTimer.onTimerEndedObservable.add(() => {
      this.createTrap(scene);
      const trapTimeout = Math.random() * 10000;
      this.disposeRandomTrap();
      this.trapGenerationTimer.start(trapTimeout);
    });

    this.trapDisposalTimer.onTimerEndedObservable.add(() => {
      this.disposeRandomTrap();
      this.trapDisposalTimer.start(4000);
    });
  }
}
