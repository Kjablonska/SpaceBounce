import { Mesh, MeshBuilder, Scene } from '@babylonjs/core';
import { generatePosition } from './utils/positionGenerator';

let STARS_NUMBER: number = 10;

export class StarsHandler {
  private starsMap: Map<string, Mesh> = new Map<string, Mesh>();
  private regenerationTurn: number;
  private gameOver: boolean;
  private collectedStarsNumber: number;

  constructor() {
    this.regenerationTurn = 0;
    this.collectedStarsNumber = 0;
    this.gameOver = false;
  }

  public stopStarsGeneration() {
    this.gameOver = true;
  }

  public gameOverHandler() {
    this.starsMap.forEach((star) => {
      star.dispose()
    })
    this.starsMap.clear()
    this.regenerationTurn = 0;
    this.collectedStarsNumber = 0;
    this.gameOver = false;
  }

  public generateStars(scene: Scene) {
    if (this.gameOver) {
      return;
    }
    const starsToBeGenerated: number = STARS_NUMBER - this.starsMap.size;
    console.log('to gen', starsToBeGenerated);
    for (let i = starsToBeGenerated; i > 0; i--) {
      const starName = `star${i}${this.regenerationTurn}`;
      const star = MeshBuilder.CreateSphere(starName, { diameter: 5 }, scene);
      const {x, y} = generatePosition()
      star.position.x = x;
      star.position.y = y;
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
    this.collectedStarsNumber += 1;
  }

  public getStarsNumber() {
    return this.starsMap.size;
  }

  public getEatenStarsNumber() {
    return this.collectedStarsNumber
  }
}
