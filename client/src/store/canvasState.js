import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;
  socket = null;
  sessionid = null;
  undoList = [];
  redoList = [];
  username = '';

  constructor() {
    makeAutoObservable(this);
  }

  setSessionId(id) {
    this.sessionid = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  setUsername(username) {
    this.username = username;
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    let contex = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
        contex.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      contex.clearRect(0, 0, this.canvas.width, this.canvas.heigth);
    }
  }

  redo() {
    let contex = this.canvas.getContext('2d');
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
        contex.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
