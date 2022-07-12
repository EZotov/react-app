import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AdministrationSelectors } from '../../redux/selectors';
import Hall from '../hall/hall.component';
import TableConstructor from '../table-constructor/table-constructor.component';

import './admin-center.component.scss';


const AdminCenter : React.FC = () => {
  const { halls } = useSelector(AdministrationSelectors.selectAdmin);

  return (
    <>
      <header className="headerSection">
        <div className="fixed-container flex-container">
          <h2 className="headerSection__headline">Бронирование столов. Администрирование</h2>
          <div className="headerInfoContainer">
            <span className="headerInfoContainer__username">Пользователь</span>
          </div>
        </div>
      </header>

      <main className="mainSection">
        <div className="fixed-container flex-container">
          <div className="add">
            <Button className="add__btn" variant="outlined" sx={{border : '1px solid #e87b16', color : '#e87b16'}}>Добавить зал</Button>
          </div>
          {
            halls.map(hall => {
              return (
                <Hall key={hall.hallId} id={hall.hallId} maxTablesCount={hall.maxTablesCount} />
              );
            })
          }
        </div>
      </main>
      <Routes>
        <Route path="tableConstructor" element={<TableConstructor/>}/>
      </Routes>
    </>
  );
}

export default AdminCenter;
