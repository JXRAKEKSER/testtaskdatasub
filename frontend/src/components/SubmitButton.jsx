import React from 'react';
import { Button as AntButton } from 'antd';

const SubmitButton = ({ disabled, isLoading, amount, addedClasses}) => {
    
  return (
     <AntButton className={addedClasses}
      disabled={disabled}
      loading={isLoading}
      htmlType='submit'
      type='primary'>Оплатить {disabled ? '' : `${amount}`}</AntButton>
  );
};

export default SubmitButton;