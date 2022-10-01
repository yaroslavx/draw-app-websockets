import React from 'react';
import Canvas from './components/Canvas';
import SettingsBar from './components/SettingsBar';
import ToolBar from './components/ToolBar';
import './styles/app.scss';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/:id'
          element={
            <div>
              <ToolBar />
              <SettingsBar />
              <Canvas />
            </div>
          }
        />
        <Route
          path='*'
          element={<Navigate to={`f${(+new Date()).toString(16)}`} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
