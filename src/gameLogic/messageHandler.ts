import {
  AdvancedDynamicTexture,
  StackPanel,
  TextBlock,
  Control,
  Button,
} from '@babylonjs/gui';

export class MessageHandler {
  private stackPanel: StackPanel;
  private message: TextBlock;
  private button: Button;

  constructor(newGameButtonAction: () => void) {
    const error = AdvancedDynamicTexture.CreateFullscreenUI('Message');
    const stackPanel = this.initStackPanel();
    error.addControl(stackPanel);
    this.messageText();
    this.stackPanel.addControl(this.message);
    this.newGameButton(newGameButtonAction);
    this.stackPanel.addControl(this.button);
  }

  public openMessageHandler(message: string) {
    if (this.button.isVisible) {
      return;
    }
    this.message.text = message;
    this.message.isVisible = true;
    this.button.isVisible = true;
  }

  public closeMessageHandler() {
    this.message.isVisible = false;
    this.button.isVisible = false;
  }

  private initStackPanel() {
    const stackPanel = new StackPanel();
    stackPanel.height = '30%';
    stackPanel.width = '650px';
    stackPanel.top = '50px';
    stackPanel.isVertical = false;
    stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.stackPanel = stackPanel;
    return stackPanel;
  }

  private messageText = () => {
    this.message = new TextBlock();
    this.message.fontSize = '22px';
    this.message.color = 'white';
    this.message.resizeToFit = true;
    this.message.height = '96px';
    this.message.width = '220px';
    this.message.fontFamily = 'Courier New';
    this.message.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.message.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    this.message.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
  };

  private newGameButton(newGameButtonAction: () => void) {
    this.button = Button.CreateSimpleButton('new_game', 'New game');
    this.button.width = '120px';
    this.button.height = '30px';
    this.button.color = 'white';
    this.button.cornerRadius = 5;
    this.button.background = '#609e48';
    this.button.paddingLeft = '10px';
    this.button.fontFamily = 'Courier New';
    this.button.onPointerUpObservable.add(() => {
      this.button.isVisible = false;
      this.message.isVisible = false;
      newGameButtonAction();
    });
    this.button.isVisible = false;
  }
}

