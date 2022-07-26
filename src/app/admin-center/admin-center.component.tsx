import Button from '@mui/material/Button';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { addHall } from '../../redux/actions/administration.actions';
import { AdministrationSelectors } from '../../redux/selectors';
import Hall from '../hall/hall.component';
import { Hall as HallInterface } from '../../types/interfaces';
import TableConstructor from '../table-constructor/table-constructor.component';
import { loadHallsRequest } from '../../redux/actions/http.actions';

import './admin-center.component.scss';


const maxTablesCount : number = 20;


const AdminCenter : React.FC = () => {
  const dispatch = useDispatch();
  const { halls } = useSelector(AdministrationSelectors.selectAdmin);

  React.useEffect(() => {
    dispatch(loadHallsRequest());
  }, [])

  const onClickAddHall = () : void => {
    let newHallId : number = 0;
    if (halls.length) {
      halls.forEach(hall => {
        if (hall.hallId >= newHallId) {
          newHallId = hall.hallId;
          newHallId++;
        }
      });
    }
    else {
      newHallId = 1;
    }
    const newHall : HallInterface = {
      hallId : newHallId,
      maxTablesCount : maxTablesCount,
      tables : []
    }
    dispatch(addHall(newHall));
  }

  const onClickAddHallMemo = useCallback(() => onClickAddHall(), []);

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
            <Button className="add__btn" variant="outlined" sx={{border : '1px solid #e87b16', color : '#e87b16'}} onClick={onClickAddHallMemo}>Добавить зал</Button>
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
