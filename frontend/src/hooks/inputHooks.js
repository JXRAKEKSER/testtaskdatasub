import { useState, useEffect } from 'react'

const useValidate = (value, validations, isEdited) => {
  
  const initialState = {};
  Object.keys(validations).forEach( key => {
    initialState[`${key}Error`] = true;
  });

  const [validationValues, setValidationValues] = useState(initialState);

  useEffect(() => {
    for(const validation in validations) {
        switch(validation) {
          case 'isEmpty':
            value ? setValidationValues(prev => ({...prev, [`${validation}Error`]: false})) : setValidationValues(prev => ({...prev, [`${validation}Error`]: true}));
            break;
          case 'pattern':
              validations[validation].test(value) ?  setValidationValues(prev => ({...prev, [`${validation}Error`]: false})) : setValidationValues(prev => ({...prev, [`${validation}Error`]: true}));
              break;
          case 'maxLength':
              value.length !== validations[validation] ? setValidationValues(prev => ({...prev, [`${validation}Error`]: true})) : setValidationValues(prev => ({...prev, [`${validation}Error`]: false}));
          default: 
        }
      }
  }, [value]);
  const isInValidField = Object.values(validationValues).reduce( (prev ,validationValue) => {
    return (prev || validationValue);
  }, false)
  
  return {validationValues, isInValidField};
}

export { useValidate };