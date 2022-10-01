import React from 'react';
import '../styles/toolbar.scss';
import { HiPencil } from 'react-icons/hi';
import { BsSquare } from 'react-icons/bs';
import { BsCircle } from 'react-icons/bs';
import { BsEraser } from 'react-icons/bs';
import { BsDash } from 'react-icons/bs';
import { CgRedo } from 'react-icons/cg';
import { CgUndo } from 'react-icons/cg';
import { MdSave } from 'react-icons/md';
import toolState from '../store/toolState';
import Pencil from '../tools/Pencil';
import canvasState from '../store/canvasState';
import Square from '../tools/Square';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

const Toolbar = () => {
  const handleChangeColor = (e) => {
    toolState.setFillColor(e.target.value);
    toolState.setStrokeColor(e.target.value);
  };

  const download = () => {
    const download = () => {
      const dataUrl = canvasState.canvas.toDataURL();
      console.log(dataUrl);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = canvasState.sessionid + '.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  };
  return (
    <div className='toolbar'>
      <button
        onClick={() => {
          toolState.setTool(
            new Pencil(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <HiPencil className='icon' />
      </button>
      <button
        onClick={() => {
          toolState.setTool(
            new Square(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionid
            )
          );
        }}
      >
        <BsSquare className='icon' />
      </button>
      <button
        onClick={() => {
          toolState.setTool(new Circle(canvasState.canvas));
        }}
      >
        <BsCircle className='icon' />
      </button>
      <button
        onClick={() => {
          toolState.setTool(new Eraser(canvasState.canvas));
        }}
      >
        <BsEraser className='icon' />
      </button>
      <button
        onClick={() => {
          toolState.setTool(new Line(canvasState.canvas));
        }}
      >
        <BsDash className='icon' />
      </button>
      <input
        type='color'
        className='colorInput'
        onChange={(e) => handleChangeColor(e)}
      />
      <button className='left' onClick={() => canvasState.undo()}>
        <CgUndo className='icon' />
      </button>
      <button>
        <CgRedo className='icon' onClick={() => canvasState.redo()} />
      </button>
      <button>
        <MdSave className='icon' onClick={() => download()} />
      </button>
    </div>
  );
};

export default Toolbar;
