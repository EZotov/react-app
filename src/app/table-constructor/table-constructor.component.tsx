import Button from '@mui/material/Button';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import Table from '../table/table.component';
import './table-constructor.component.scss';

enum ContructorType {
  newTable = 'new',
  changeTable = 'edit'
}

const TableConstructor : React.FC = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate();
  const typeParameterValue : string = params.get('type');

  let contructorTableType : TableType;

  const onClickCloseConstructorBtn  = () : void => {
    navigate('/administration');
  }

  const onClickCircleTypeBtn = () : void => {
    contructorTableType = 'circle';
  }

  const onClickSquareTypeBtn = () : void => {
    contructorTableType = 'square';
  }


  if (typeParameterValue === ContructorType.newTable) {
    return (
      <div className="modalOverlay">
        <div className="constructorContainer">
          <h2 className="constructorContainer__headline">Конструктор</h2>
          <div className="contructorTableType">
            <Button className="contructorTableType__squareBtn" variant='outlined' disabled={contructorTableType === 'square' ? true : false} onClick={onClickSquareTypeBtn}>Квадратный</Button>
            <Button className="contructorTableType__roundBtn" variant='outlined' disabled={contructorTableType === 'circle' ? true : false} onClick={onClickCircleTypeBtn}>Круглый</Button>
          </div>
          <Table type='circle' maxPlaces={5} size={[2,2]} />
          <div className="controlPanel">
            <div className="controlPanelElement">
              <div className="controlPanelElementTextWrapper">
                <span className="controlPanelElementTextWrapper__label">Размер</span>
                <span className="controlPanelElementTextWrapper__value">2</span>
              </div>
              <div className="controlPanelElementBtnWrapper">
                <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained">Увеличить</Button>
                <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained">Уменьшить</Button>
              </div>
            </div>

            <div className="controlPanelElement">
              <div className="controlPanelElementTextWrapper">
                <span className="controlPanelElementTextWrapper__label">Кол-во мест</span>
                <span className="controlPanelElementTextWrapper__value">5</span>
              </div>
              <div className="controlPanelElementBtnWrapper">
                <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained">Увеличить</Button>
                <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained">Уменьшить</Button>
              </div>
            </div>
          </div>
          <button className="constructorContainer__closeBtn" type="button" onClick={onClickCloseConstructorBtn}/>
        </div>
      </div>
    );
  }
  // else if (ContructorType.changeTable) {
  //   return (
  //     <div className="modalOverlay">
  //       <div className="constructorContainer">
  //       <h2 className="constructorContainer__headline">Конструктор</h2>
  //       <Table type='square' maxPlaces={5} size={[1,1]} />
  //       <div className="controlPanel">
  //         <div className="controlPanelElement">
  //           <div className="controlPanelElementTextWrapper">
  //             <span className="controlPanelElementTextWrapper__label">Размер</span>
  //             <span className="controlPanelElementTextWrapper__value">2</span>
  //           </div>
  //           <div className="controlPanelElementBtnWrapper">
  //             <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained">Увеличить</Button>
  //             <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained">Уменьшить</Button>
  //           </div>
  //         </div>
  //
  //         <div className="controlPanelElement">
  //           <div className="controlPanelElementTextWrapper">
  //             <span className="controlPanelElementTextWrapper__label">Кол-во мест</span>
  //             <span className="controlPanelElementTextWrapper__value">5</span>
  //           </div>
  //           <div className="controlPanelElementBtnWrapper">
  //             <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained">Увеличить</Button>
  //             <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained">Уменьшить</Button>
  //           </div>
  //         </div>
  //       </div>
  //       <button className="constructorContainer__closeBtn" type="button" onClick={onClickCloseConstructorBtn} />
  //       </div>
  //     </div>
  //   );
  // }
}

export default TableConstructor;
