import { Mesh, MeshBuilder, Scene } from '@babylonjs/core';

export class Player {
  private player: Mesh;

  constructor(scene: Scene) {
      this.createPlayer(scene)
      this.createMovementListener(scene)
  }

  public getPlayer() {
    return this.player;
}

  private createPlayer(scene: Scene) {
    this.player = MeshBuilder.CreateSphere('player', { diameter: 1 }, scene);
  }

  private createMovementListener(scene: Scene) {
    window.addEventListener('mousemove', () => {
      var pick = scene.pick(
        scene.pointerX,
        scene.pointerY,
        undefined,
        false,
        null
      );

      this.player.position.x = pick?.pickedPoint?.x ?? 0;
      this.player.position.y = pick?.pickedPoint?.y ?? 0;
    });
  }
}
