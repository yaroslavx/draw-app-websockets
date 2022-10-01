import Tool from './Tool';

export default class Square extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseDownHandler = (event) => {
    this.mouseDown = true;
    this.context.beginPath();
    this.startX = event.pageX - event.target.offsetLeft;
    this.startY = event.pageY - event.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  };
  mouseUpHandler = (event) => {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'square',
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.context.fillStyle,
        },
      })
    );
  };
  mouseMoveHandler = (event) => {
    if (this.mouseDown) {
      let currentX = event.pageX - event.target.offsetLeft;
      let currentY = event.pageY - event.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  };

  draw = (x, y, w, h) => {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.rect(x, y, w, h);
      this.context.fill();
      this.context.stroke();
    };
  };

  static staticDraw = (context, x, y, w, h, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.rect(x, y, w, h);
    context.fill();
    context.stroke();
  };
}
