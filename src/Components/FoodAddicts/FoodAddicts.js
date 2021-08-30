import React from 'react';
import './FoodAddicts.css';



const FoodAddicts = ({ imageUrl, ingredients }) => {
  	return (
    <div>
     	 <div className='ma2'>
        	<img id='inputimage' alt='' src={imageUrl} width='auto' height='250px'/>
	        <p id='ingredients' className=''>{ingredients.length > 0 ? <p>Detection results = {ingredients.join(' | ')}</p> : null}</p>
	     </div>
 	</div>
  			)}
 	

export default FoodAddicts;


