import {
  Mesh,
  MeshBuilder,
  Scene,
  AdvancedTimer,
  StandardMaterial,
  Color3,
  Texture,
} from '@babylonjs/core';
import { generatePosition } from './utils/positionGenerator';

let velocityY: number = 3;

export class TrapsHandler {
  private trapMap: Map<string, Mesh> = new Map<string, Mesh>();
  private velocityMap: Map<string, number> = new Map<string, number>();
  private trapGenerationTimer: AdvancedTimer<Scene>;
  private trapDisposalTimer: AdvancedTimer<Scene>;
  private regenerationTurn: number;
  constructor() {
    this.regenerationTurn = 0;
  }

  public createTrap(scene: Scene) {
    const trapName = `trap${this.regenerationTurn}`;
    const trap = MeshBuilder.CreateSphere(
      trapName,
      { diameter: Math.random() * 20 },
      scene,
    );
    const { x, y } = generatePosition();
    trap.position.x = x;
    trap.position.y = y;
    const trapMaterial = new StandardMaterial('trapMaterial', scene);
    trapMaterial.diffuseTexture = new Texture(`../assets/trap.png`, scene);
    trap.material = trapMaterial;
    this.trapMap.set(trapName, trap);
    this.velocityMap.set(trapName, Math.random() * 4 + 1);
  }

  public updatePosition() {
    this.trapMap.forEach((trap, trapName) => {
      let velocity = this.velocityMap.get(trapName) ?? velocityY;
      trap.position.y += velocity;
      if (trap.position.y > 90) {
        velocity -= velocityY;
      } else if (trap.position.y < -90) {
        velocity += velocityY;
      }
      this.velocityMap.set(trapName, velocity);
    });
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
    const randomTrapNumber = Math.floor(Math.random() * this.regenerationTurn);
    const trapToDispose = this.trapMap.get(`trap${randomTrapNumber}`);
    this.trapMap.delete(`trap${randomTrapNumber}`);
    this.velocityMap.delete(`trap${randomTrapNumber}`);
    trapToDispose?.dispose();
  }

  public gameOverHandler() {
    this.trapMap.forEach((trap) => {
      trap.dispose();
    });
    this.trapMap.clear();
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
      this.regenerationTurn += 1;
      this.createTrap(scene);
      const trapTimeout = (Math.floor(Math.random() * 5) + 1) * 1000;
      this.disposeRandomTrap();
      this.trapGenerationTimer.start(trapTimeout);
    });

    this.trapDisposalTimer.onTimerEndedObservable.add(() => {
      this.disposeRandomTrap();
      this.trapDisposalTimer.start(3000);
    });
  }
}
