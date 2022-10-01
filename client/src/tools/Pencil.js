import Tool from './Tool';

export default class Pencil extends Tool {
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
    this.context.moveTo(
      event.pageX - event.target.offsetLeft,
      event.pageY - event.target.offsetTop
    );
  };
  mouseUpHandler = (event) => {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'finish',
        },
      })
    );
  };
  mouseMoveHandler = (event) => {
    if (this.mouseDown) {
      // this.draw(
      //   event.pageX - event.target.offsetLeft,
      //   event.pageY - event.target.offsetTop
      // );
      this.socket.send(
        JSON.stringify({
          method: 'draw',
          id: this.id,
          figure: {
            type: 'pencil',
            x: event.pageX - event.target.offsetLeft,
            y: event.pageY - event.target.offsetTop,
          },
        })
      );
    }
  };

  static draw = (context, x, y) => {
    context.lineTo(x, y);
    context.stroke();
  };
}
