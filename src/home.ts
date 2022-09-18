import {
  AdvancedDynamicTexture,
  StackPanel,
  TextBlock,
  Button,
} from '@babylonjs/gui';

export class HomeScreen {
  private stackPanel: StackPanel;
  private message: TextBlock;
  private button: Button;

  constructor(starGameButtonAction: () => void) {
    const homeScreen = AdvancedDynamicTexture.CreateFullscreenUI('homeScreen');
    const stackPanel = this.initStackPanel();
    homeScreen.addControl(stackPanel);
    this.instructions();
    this.starGameButton(starGameButtonAction);
    this.stackPanel.addControl(this.message);
    this.stackPanel.addControl(this.button);
  }

  private initStackPanel() {
    const stackPanel = new StackPanel();
    stackPanel.height = '30%';
    stackPanel.width = '100%';
    stackPanel.isVertical = true;
    this.stackPanel = stackPanel;
    return stackPanel;
  }

  private instructions = () => {
    this.message = new TextBlock();
    this.message.fontSize = '22px';
    this.message.color = 'white';
    this.message.resizeToFit = true;
    this.message.width = '100%';
    this.message.fontFamily = 'Courier New';
    this.message.text =
      'Welcome to the SpaceBounce! \n Your job is to catch all stars while avoiding meteorites. \n Good luck 👽 \n';
  };

  private starGameButton(starGameActionButton: () => void) {
    this.button = Button.CreateSimpleButton('new_game', 'New game');
    this.button.width = '120px';
    this.button.height = '30px';
    this.button.top = '100px';
    this.button.color = 'white';
    this.button.cornerRadius = 5;
    this.button.background = '#609e48';
    this.button.fontFamily = 'Courier New';
    this.button.onPointerUpObservable.add(() => {
      this.button.isVisible = false;
      this.message.isVisible = false;
      starGameActionButton();
    });
  }
}
