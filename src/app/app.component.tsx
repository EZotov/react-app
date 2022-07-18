import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import AdminCenter from './admin-center/admin-center.component'
import ReserveService from './reserve-service/reserve-service.component';

import '../styles.scss';
import './app.component.scss';


const App : React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/administration');
  }, []);

  return (
    <div className="appContainer">
      <h1 className="appContainer__headline visually-hidden">Сервис бронирование столов</h1>
      <Routes>
        <Route path='/' element={<ReserveService />}/>
        <Route path='administration/*' element={<AdminCenter />}/>
      </Routes>
    </div>
  )
}

export default App;
