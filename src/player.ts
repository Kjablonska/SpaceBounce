import {
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Color3,
} from '@babylonjs/core';

export class Player {
  private player: Mesh;

  constructor(scene: Scene) {
    this.createPlayer(scene);
  }

  public getPlayer() {
    return this.player;
  }

  private createPlayer(scene: Scene) {
    this.player = MeshBuilder.CreateSphere('player', { diameter: 1 }, scene);

    const greenMat = new StandardMaterial('playerMaterial', scene);
    greenMat.diffuseColor = new Color3(0, 0.63, 1);
    this.player.material = greenMat;
  }

  public updatePosition(x: number, y: number) {
    this.player.position.x = x;
    this.player.position.y = y;
  }
}
