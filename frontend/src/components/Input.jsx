import React from 'react';
import {Input as AntInput } from 'antd';


const Input = ({ handleChange, handleBlur, name, value, type, maxLength, status, addedClassName, suffixIcon, captionComponent: CaptionComponent, captionComponentProps }) => {
  return (
    <>
      <div className={`${addedClassName}`}>
        <AntInput type={type}
         className={`input`}
         name={name}
         required
         suffix={suffixIcon}
         status={status}
         onChange={handleChange}
         onBlur={handleBlur}
         maxLength={maxLength}
         value={value}/>
         {CaptionComponent && <CaptionComponent {...captionComponentProps}/>}
      </div>
      
    </>
  );
}

export default Input;