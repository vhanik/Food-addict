import React from 'react';
import './LinkForm.css';


const LinkForm = ({ inputLink, buttonSubmit }) => {
  return (
    <div>
      <div className='center'>
        <div className='w-70 form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-80' type='tex' onChange={inputLink}/>
          <button className='w-20 grow f4 link ph3 pv2 dib white bg-red' 
          onClick={buttonSubmit}>
          Go!
           </button>
        </div>
      </div>
    </div>
  );
}

export default LinkForm;

 