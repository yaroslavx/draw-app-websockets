import React, { useEffect, useRef, useState } from 'react';
import '../styles/canvas.scss';
import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Pencil from '../tools/Pencil';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import Square from '../tools/Square';
import axios from 'axios';

const Canvas = observer(() => {
  const canvasRef = useRef();
  const usernameRef = useRef();
  const params = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    let context = canvasRef.current.getContext('2d');
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
      .then((response) => {
        const img = new Image();
        img.src = response.data;
        img.onload = () => {
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          context.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
        };
      });
  }, []);

  const handleDraw = (message) => {
    const figure = message.figure;
    const context = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'pencil':
        Pencil.draw(context, figure.x, figure.y);
        break;
      case 'square':
        Square.staticDraw(
          context,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;
      case 'finish':
        context.beginPath();
        break;
    }
  };

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:5000/`);
      canvasState.setSocket(socket);
      canvasState.setSessionId(params.id);
      toolState.setTool(new Pencil(canvasRef.current, socket, params.id));
      socket.onopen = () => {
        console.log(111);
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: 'connetion',
          })
        );
      };
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        switch (message.method) {
          case 'connection':
            console.log(`User ${message.username} is connected`);
            break;
          case 'draw':
            handleDraw(message);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const handleMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const handleConnect = () => {
    canvasState.setUsername(usernameRef.current.value);
    setShow(false);
  };

  const [show, setShow] = useState(true);

  return (
    <div className='canvas'>
      <Modal show={show} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={usernameRef} type='text' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => handleConnect()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        onMouseDown={() => handleMouseDown()}
      />
    </div>
  );
});

export default Canvas;
