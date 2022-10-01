import Pencil from './Pencil';

export default class Eraser extends Pencil {
  constructor(canvas) {
    super(canvas);
  }

  draw(x, y) {
    this.context.strokeStyle = 'white';
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}
