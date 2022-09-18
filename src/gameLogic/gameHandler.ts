import { Scene } from '@babylonjs/core';
import { Player } from '../player';
import { MessageHandler } from './messageHandler';
import { StarsHandler } from './starsHandler';
import { TrapsHandler } from './trapsHandler';

export class GameHandler {
  starsHandler: StarsHandler;
  trapHandler: TrapsHandler;
  scene: Scene;
  player: Player;
  messageHandler: MessageHandler;

  constructor(scene: Scene) {
    this.scene = scene;
    this.player = new Player(scene);
    this.starsHandler = new StarsHandler();
    this.trapHandler = new TrapsHandler();
    this.messageHandler = new MessageHandler(this.startNewGame.bind(this));
  }

  public startGame() {
    this.starsHandler.generateStars(this.scene);
    this.trapHandler.setTrapTimer(this.scene);
    this.createPlayerMovementHandler();
    this.trapHandler.startTrapTimers();
  }

  private createPlayerMovementHandler() {
    window.addEventListener('mousemove', () => {
      const pick = this.scene.pick(
        this.scene.pointerX,
        this.scene.pointerY,
        undefined,
        false,
        null,
      );

      if (pick?.pickedPoint?.x && pick?.pickedPoint?.y)
        this.player.updatePosition(pick.pickedPoint.x, pick.pickedPoint.y);

      const pickedMeshName = pick?.pickedMesh?.name;
      if (!pickedMeshName) {
        return;
      }
      if (this.starsHandler.isStar(pickedMeshName)) {
        this.starsHandler.eatStar(pickedMeshName);
        this.starsHandler.regenerateStars(this.scene);
      } else if (this.trapHandler.isTrap(pickedMeshName)) {
        console.log('game over');
        this.gameOverHandler();
      }
    });
  }

  private gameOverHandler() {
    this.trapHandler.stopTrapTimers();
    this.starsHandler.stopStarsGeneration();
    this.messageHandler.openMessageHandler(
      `Game over! You've collected ${this.starsHandler.getEatenStarsNumber()} stars.`,
    );
  }

  public startNewGame() {
    this.trapHandler.gameOverHandler();
    this.starsHandler.gameOverHandler();
    this.startGame();
  }
}
