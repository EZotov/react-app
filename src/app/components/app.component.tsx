import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminCenter from './admin-center/admin-center.component'
import ReserveService from './reserve-service/reserve-service.component';
import { init } from '../locales';

import '../../styles.scss';
import './app.component.scss';

const App : React.FC = () => {
  init();

  return (
    <div className="app-container">
      <h1 className="app-container__headline visually-hidden">Сервис бронирование столов</h1>
      <Routes>
        <Route path='/*' element={<ReserveService />}/>
        <Route path='administration/*' element={<AdminCenter />}/>
      </Routes>
    </div>
  );
};

export default App;
