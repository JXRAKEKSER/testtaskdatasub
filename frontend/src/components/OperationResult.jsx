import React from 'react';
import { Alert as AntAlert } from 'antd';

const OperationResult = ({type, message}) => {
  return (
    <>
      {message && <AntAlert type={type} message={message} showIcon/>}
    </>
  );
}

export default OperationResult;