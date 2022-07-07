import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Hall from '../hall/hall.component';
import TableConstructor from '../table-constructor/table-constructor.component';
import './admin-center.component.scss';


const AdminCenter : React.FC<any> = () => {
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
          <Hall id={1} maxTablesCount={2} />
          <Hall id={2} maxTablesCount={3} />
        </div>
      </main>
      <Routes>
        <Route path="tableConstructor" element={<TableConstructor/>}/>
      </Routes>
    </>
  );
}

export default AdminCenter;
