import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import Table from '../table/table.component';
import './table-constructor.component.scss';

enum ContructorType {
  newTable = 'new',
  changeTable = 'edit'
}

const TableConstructor : React.FC<any> = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate();
  const typeParameterValue : string = params.get('type');

  const onClickCloseConstructorBtn  = () : void => {
    navigate('/administration');
  }

  if (typeParameterValue === ContructorType.newTable) {
    return (
      <div className="modalOverlay">
        <div className="constructorContainer">
          <h2 className="constructorContainer__headline">Конструктор</h2>
          <Table type='circle' maxPlaces={5} size={[1,1]} />
          <div className="">

          </div>
          <button className="constructorContainer__closeBtn" type="button" onClick={onClickCloseConstructorBtn}></button>
        </div>
      </div>
    );
  }
  else if (ContructorType.changeTable) {
    return (
      <div className="modalOverlay">
        <div className="constructorContainer">

        </div>
      </div>
    );
  }
}

export default TableConstructor;
