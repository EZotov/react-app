import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import { setLanguage } from '../../../redux/actions/general.actions';
import { loadHallsRequest } from '../../../redux/actions/http.actions';
import { GeneralSelector } from '../../../redux/selectors';
import { Language } from '../../../types/enums.type';
import { changeLanguage, LocaleKeys, t } from '../../locales';
import HallListComponent from './hall-list/hall-list.component';
import ReserveHallComponent from './reserve-hall/reserve-hall.component';

import './reserve-service.component.scss';

const ReserveService : React.FC = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector(GeneralSelector.selectLanguage);
  const halls = useSelector(GeneralSelector.selectHalls);

  React.useEffect(() => {
    if (!halls.length) {
      dispatch(loadHallsRequest());
    }
  }, []);

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
        <div className="fixed-container">
          <h2 className="header-section__headline">{t(LocaleKeys.main_headline)}</h2>
          <div className="lang-control">
            <FormControl fullWidth sx={{backgroundColor : '#ffffff'}}>
              <InputLabel className="lang-control__label" id="lang-select">{t(LocaleKeys.lang_title)}</InputLabel>
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
      </header>

      <main className="main-section">
        <div className="fixed-container">
          <div className="reserve-container">
            <Link to="/administration">
              {t(LocaleKeys.link_to_administration)}
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
};

export default ReserveService;
