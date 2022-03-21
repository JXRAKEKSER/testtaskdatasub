import React from 'react';
//import { Tooltip as AntTooltop } from 'antd'

const ValidationCaption = ({ isEdited, captions }) => {
  
  return (isEdited &&
  <div className='validation-caption'>
      {captions?.map( caption => {
        return (caption.validationValue && <div className='caption'>
          <p className='caption__text'>{caption.text}</p>
        </div>)
      })}
    </div>
  );
};

export default ValidationCaption;