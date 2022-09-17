import { Scene } from '@babylonjs/core';
import { Player } from '../player';
import { StarsHandler } from './starsHandler';
import { TrapsHandler } from './trapsHandler';

function createPlayerMovementHandler(
  scene: Scene,
  player: Player,
  starsHandler: StarsHandler,
  trapHandler: TrapsHandler
) {
  window.addEventListener('mousemove', () => {
    var pick = scene.pick(
      scene.pointerX,
      scene.pointerY,
      undefined,
      false,
      null
    );

    player.updatePosition(pick?.pickedPoint?.x ?? 0, pick?.pickedPoint?.y ?? 0);

    console.log(pick?.pickedMesh?.name);
    const pickedMeshName = pick?.pickedMesh?.name;
    if (!pickedMeshName) {
      return;
    }
    if (starsHandler.isStar(pickedMeshName)) {
      starsHandler.eatStar(pickedMeshName);
      starsHandler.regenerateStars(scene);
    } else if (trapHandler.isTrap(pickedMeshName)) {
      console.log('game over');
    }
  });
}

export function gameLogic(
  scene: Scene,
  player: Player,
  starsHandler: StarsHandler,
  trapHandler: TrapsHandler
) {
  createPlayerMovementHandler(scene, player, starsHandler, trapHandler);
  trapHandler.startTrapTimer()
}
