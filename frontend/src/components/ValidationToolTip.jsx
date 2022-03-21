import React from 'react';
import { Tooltip as AntTooltip } from 'antd';

const ValidationToolTip = ( { isEdited, captions} ) => {
    let isInvalid = false;
    const captionText = captions.reduce((result, caption) => {
      isInvalid+=caption.validationValue;
      if (caption.validationValue) {
        return result+' '+caption.text;
      } else {
        return result+'';
      }
    }, '');
    
  return (
    <>
     {isEdited && <AntTooltip title={captionText} visible={isInvalid} overlayStyle={{fontSize: '12px'}} placement='bottom' arrowPointAtCenter={true}/>}
    </>
  );
};

export default ValidationToolTip;