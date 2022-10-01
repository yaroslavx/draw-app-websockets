import Tool from './Tool';

export default class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    let canvasData = this.canvas.toDataURL();
    this.context.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = canvasData;
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let curentX = e.pageX - e.target.offsetLeft;
      let curentY = e.pageY - e.target.offsetTop;
      let width = curentX - this.startX;
      let height = curentY - this.startY;
      let r = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, r);
    }
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.saved;
    img.onload = async function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.arc(x, y, r, 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();
    }.bind(this);
  }
}
