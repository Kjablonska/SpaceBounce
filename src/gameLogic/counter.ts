import {
  AdvancedDynamicTexture,
  StackPanel,
  TextBlock,
  Control,
  Button,
} from '@babylonjs/gui';

export class Counter {
  private stackPanel: StackPanel;
  private message: TextBlock;

  constructor(count: number) {
    const error = AdvancedDynamicTexture.CreateFullscreenUI('Counter');
    const stackPanel = this.initStackPanel();
    error.addControl(stackPanel);
    this.counterText(count);
    this.stackPanel.addControl(this.message);
  }

  public startCounter() {
    this.message.isVisible = true; 
  }

  private initStackPanel() {
    const stackPanel = new StackPanel();
    stackPanel.height = '20%';
    stackPanel.width = '300px';
    stackPanel.top = '30px';
    stackPanel.isVertical = false;
    stackPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    stackPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.stackPanel = stackPanel;
    return stackPanel;
  }

  private counterText = (count: number) => {
    this.message = new TextBlock();
    this.message.fontSize = '22px';
    this.message.color = 'white';
    this.message.resizeToFit = true;
    this.message.height = '96px';
    this.message.width = '220px';
    this.message.fontFamily = 'Courier New';
    this.message.text = `Collected stars: ${count}`;
    this.message.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.message.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    this.message.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    this.message.isVisible = false;
  };

  public updateCounterText(count: number) {
    this.message.text = `Collected stars: ${count}`;
  } 
}

