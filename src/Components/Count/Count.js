import React from 'react';


const Count = ({ name, count }) => {
  return (
    <div>
      <div className='white f3'>
        {"Hey "+ name + " your current food search is "+ count}
      </div>
    </div>
  );
}

export default Count;
