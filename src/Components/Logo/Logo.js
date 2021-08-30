import React from 'react';
import Tilty from 'react-tilty';
import food from './Food.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma2 mt0 center'>
      <Tilty className="Tilt br2 shadow-2 center" options={{ max : 70 }} style={{ height: 145, width: 150 }} >
          <img className="Tilt-inner pa1 pt3 center"style={{paddingTop: '5px'}} alt='logo' src={food}/>
     </Tilty>
     <div classname='center'>
     <p className='f4 mw8 pr6 pt4'>
      <text>
        Do you want to cook a meal, however you don't have a recipe? <strong>!!!EASY!!!</strong> Upload the picture link and this will detect ingredients in it!
      </text>
     </p>
     </div>
     
    </div>
  );
}

export default Logo;