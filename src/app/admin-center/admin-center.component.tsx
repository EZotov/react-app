import Button from '@mui/material/Button';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { addHall } from '../../redux/actions/general.actions';
import { GeneralSelector } from '../../redux/selectors';
import Hall from '../hall/hall.component';
import { Hall as HallInterface } from '../../types/interfaces';
import TableConstructor from '../table-constructor/table-constructor.component';
import { loadHallsRequest } from '../../redux/actions/http.actions';
import  AdminCenterService from '../services/admin-center.service';

import './admin-center.component.scss';


const maxTablesCount = 20;

const AdminCenter : React.FC = () => {
  const dispatch = useDispatch();
  const halls = useSelector(GeneralSelector.selectHalls);

  React.useEffect(() => {
    dispatch(loadHallsRequest());
  }, [])

  const onClickAddHall = useCallback(() : void => {
    const newHallId : number = AdminCenterService.defindIndexNewHallItem(halls);

    const newHall : HallInterface = {
      hallId : newHallId,
      maxTablesCount : maxTablesCount,
      tables : []
    }
    dispatch(addHall(newHall));
  }, [halls]);

  return (
    <>
      <header className="header-section">
        <div className="fixed-container flex-container">
          <h2 className="header-section__headline">Бронирование столов. Администрирование</h2>
          <div className="header-info-container">
            <span className="header-info-container__username">Пользователь</span>
          </div>
        </div>
      </header>

      <main className="main-section">
        <div className="fixed-container flex-container">
          <div className="add">
            <Button className="add__btn" variant="outlined" sx={{border : '1px solid #e87b16', color : '#e87b16'}} onClick={onClickAddHall}>Добавить зал</Button>
          </div>
          {
            halls.map(hall => (
                <Hall key={hall.hallId} id={hall.hallId} maxTablesCount={hall.maxTablesCount} />
              )
            )
          }
        </div>
      </main>
      <Routes>
        <Route path="tableConstructor" element={<TableConstructor />}/>
      </Routes>
    </>
  );
};

export default AdminCenter;
