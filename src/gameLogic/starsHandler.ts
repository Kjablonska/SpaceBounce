import { Mesh, MeshBuilder, Scene } from '@babylonjs/core';

let STARS_NUMBER: number = 10;

export class StarsHandler {
  private starsMap: Map<string, Mesh> = new Map<string, Mesh>();
  private regenerationTurn: number;

  constructor(scene: Scene) {
    this.regenerationTurn = 0;
    this.generateStars(scene);
  }

  private generateStars(scene: Scene) {
    const starsToBeGenerated: number = STARS_NUMBER - this.starsMap.size;
    console.log('to gen', starsToBeGenerated);
    for (let i = starsToBeGenerated; i > 0; i--) {
      const starName = `star${i}${this.regenerationTurn}`;
      const star = MeshBuilder.CreateSphere(starName, { diameter: 1 }, scene);
      star.position.x = Math.random() * 10; // TODO
      star.position.y = Math.random() * 10; // TODO
      this.starsMap.set(starName, star);
    }
    STARS_NUMBER = this.starsMap.size;
  }

  public regenerateStars(scene: Scene) {
    if (this.starsMap.size < STARS_NUMBER / 3) {
      this.regenerationTurn += 1;
      this.generateStars(scene);
    }
  }

  public isStar(name: string) {
    return this.starsMap.has(name);
  }

  public eatStar(name: string) {
    const eatenStar = this.starsMap.get(name);
    this.starsMap.delete(name);
    eatenStar?.dispose();
  }
}
