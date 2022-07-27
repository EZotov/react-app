import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import { loadHallsRequest } from '../../redux/actions/http.actions';
import HallListComponent from './hall-list/hall-list.component';
import ReserveHallComponent from './reserve-hall/reserve-hall.component';

import './reserve-service.component.scss';

const ReserveService : React.FC<any> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadHallsRequest());
  }, []);

  return (
    <>
      <header className="header-section">
        <div className="fixed-container">
          <h2 className="">Бронирование столов</h2>
        </div>
      </header>

      <main className="main-section">
        <div className="fixed-container">
          <div className="reserve-container">
            <Link to="/administration">
              Перейти в админинистрирование
            </Link>
            <Routes>
              <Route path="/" element={<HallListComponent/>}/>
              <Route path="hall/:id/*" element={<ReserveHallComponent />} />
            </Routes>
          </div>
        </div>
      </main>
    </>
  )
}

export default ReserveService;
