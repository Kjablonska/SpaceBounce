import { Color3, GlowLayer, Mesh, MeshBuilder, PointLight, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import { Counter } from './counter';
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
      star.dispose();
    });
    this.starsMap.clear();
    this.regenerationTurn = 0;
    this.collectedStarsNumber = 0;
    this.gameOver = false;
  }

  public generateStars(scene: Scene) {
    if (this.gameOver) {
      return;
    }
    const starsToBeGenerated: number = STARS_NUMBER - this.starsMap.size;
    for (let i = starsToBeGenerated; i > 0; i--) {
      const starName = `star${i}${this.regenerationTurn}`;
      const star = this.createStarMesh(scene, starName);
      this.starsMap.set(starName, star);
    }
    STARS_NUMBER = this.starsMap.size;
  }

  public regenerateStars(scene: Scene) {
    if (this.starsMap.size < STARS_NUMBER / 2) {
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
    return this.collectedStarsNumber;
  }

  private createStarMesh(scene: Scene, starName: string) {
    const star = MeshBuilder.CreateSphere(starName, { diameter: 5 }, scene);
    const { x, y } = generatePosition();
    star.position.x = x;
    star.position.y = y;
    const trapMaterial = new StandardMaterial('starMaterial', scene);
    trapMaterial.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());


    const light = new PointLight('starlight', new Vector3(-1, 1, -1), scene);
    light.diffuse = new Color3(Math.random(), Math.random(), Math.random());
    light.intensity = Math.random()
    const material = new StandardMaterial('sunMaterial', scene);
    material.emissiveColor = light.diffuse;
    star.material = material;
    return star;
  }
}
