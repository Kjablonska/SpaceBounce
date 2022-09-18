export function generatePosition() {
    return {x: generatePositionSign() * Math.random() * 120, y: generatePositionSign() * Math.random() * 90}
}

function generatePositionSign() {
    return Math.random() < 0.5 ? -1 : 1;
  }