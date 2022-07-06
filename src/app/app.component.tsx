import React from 'react';
// import { Route } from 'react-router-dom';
import '../styles.scss';
import './app.component.scss';
import Table from './table/table.component';



const App : React.FC = () => {

  return (
    <div className="appContainer">
      <div className="fixed-container flex-container">
        <Table type='circle' size={[1,1]} maxPlaces={5} />
        <Table type='square' size={[2,1]} maxPlaces={5} />
      </div>
    </div>
  )
}

export default App;
