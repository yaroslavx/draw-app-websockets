export default class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.context = canvas.getContext('2d');
    this.deleteListeners();
  }

  set fillColor(color) {
    this.context.fillStyle = color;
  }

  set strokeColor(color) {
    this.context.strokeStyle = color;
  }

  set lineWidth(width) {
    this.context.lineWidth = width;
  }

  deleteListeners = () => {
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousemove = null;
  };
}
