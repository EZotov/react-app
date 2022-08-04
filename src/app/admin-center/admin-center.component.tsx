import Button from '@mui/material/Button';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { addHall, setLanguage } from '../../redux/actions/general.actions';
import { GeneralSelector } from '../../redux/selectors';
import Hall from '../hall/hall.component';
import { Hall as HallInterface } from '../../types/interfaces';
import TableConstructor from '../table-constructor/table-constructor.component';
import { loadHallsRequest } from '../../redux/actions/http.actions';
import  AdminCenterService from '../services/admin-center.service';
import { changeLanguage, LocaleKeys, t } from '../locales';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Language } from '../../types/enums.type';

import './admin-center.component.scss';


const AdminCenter : React.FC = () => {
  const dispatch = useDispatch();
  const halls = useSelector(GeneralSelector.selectHalls);
  const currentLang = useSelector(GeneralSelector.selectLanguage);

  React.useEffect(() => {
    dispatch(loadHallsRequest());
  }, []);

  const maxTablesCount = 20;

  const onClickAddHall = useCallback(() : void => {
    const newHallId : number = AdminCenterService.defindIndexNewHallItem(halls);

    const newHall : HallInterface = {
      hallId : newHallId,
      maxTablesCount : maxTablesCount,
      tables : []
    }
    dispatch(addHall(newHall));
  }, [halls]);


  const changeLang = useCallback((e) => {
    if (e.target.value === Language.russian) {
      changeLanguage(Language.russian);
      dispatch(setLanguage(Language.russian));
    } else if (e.target.value === Language.english) {
      changeLanguage(Language.english);
      dispatch(setLanguage(Language.english));
    }
  }, [currentLang]);


  return (
    <>
      <header className="header-section">
        <div className="fixed-container flex-container">
          <h2 className="header-section__headline">{t(LocaleKeys.main_headline_adm)}</h2>
          <div className="header-info-container">
            <span className="header-info-container__username">{t(LocaleKeys.user)}</span>
            <div className="lang-control-adm">
              <FormControl fullWidth sx={{backgroundColor : '#ffffff'}}>
                <InputLabel className="lang-control-adm__label" id="lang-select">{t(LocaleKeys.lang_title)}</InputLabel>
                <Select
                  labelId="lang-select"
                  value={currentLang}
                  onChange={(e) => changeLang(e)}
                  >
                  <MenuItem value={'ru'}>{t(LocaleKeys.lang_ru)}</MenuItem>
                  <MenuItem value={'en'}>{t(LocaleKeys.lang_en)}</MenuItem>
                </Select>
              </FormControl>
          </div>

        </div>
        </div>
      </header>

      <main className="main-section">
        <div className="fixed-container flex-container">
          <div className="add">
            <Button className="add__btn" variant="outlined" sx={{border : '1px solid #e87b16', color : '#e87b16'}} onClick={onClickAddHall}>{t(LocaleKeys.add_hall)}</Button>
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
