import React, { useState } from 'react';
import { CreditCardOutlined } from '@ant-design/icons'

import Form from './Form';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { useValidate } from '../hooks/inputHooks';
import { useFormState } from '../hooks/formHooks';
import { payment } from '../utils/api';
import ValidationCaption from './ValidationCaption';
import ValidationToolTip from './ValidationToolTip';
import OperationResult from './OperationResult';


const Payment = () => {
  const { formState, inputsEditedState, handleChange, handleBlur } = useFormState({ cardNumber: '', cvcCode: '', month: '', year: '', amount: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [operationResultState, setOperationResult] = useState({type: '', message: '', isPaid: false});
  // в принципе, можно было указывать тип полей ввода как phone number, тогда можно было бы обойтись вообще без регулярных выражений в номере карты
  const cardNumberValidate = useValidate(formState.cardNumber, { isEmpty: true, pattern: /\d{16}/}, inputsEditedState.cardNumberEdited);
  const cvcCodeValidate = useValidate(formState.cvcCode, {isEmpty: true, pattern: /\d{3}/}, inputsEditedState.cvcCodeEdited);
  const monthValidate = useValidate(formState.month, {isEmpty: true, pattern: /(0[1-9])|(1[0-2])/}, inputsEditedState.monthEdited);
  // валидация по году выплняется до 2029, просто ограничение, я подумал, что карт позже этого периода не существует
  const yearValidate = useValidate(formState.year, {isEmpty: true, pattern: /202[2-9]/}, inputsEditedState.yearEdited); 
  const amountValidate = useValidate(formState.amount, {isEmpty: true, pattern: /^[1-9]\d+/}, inputsEditedState.amountEdited);
  const cardNumberStatus = cardNumberValidate.isInValidField && inputsEditedState.cardNumberEdited ? 'error' : '';
  const cvcCodeStatus = cvcCodeValidate.isInValidField && inputsEditedState.cvcCodeEdited ? 'error' : '';
  const monthStatus = monthValidate.isInValidField && inputsEditedState.monthEdited ? 'error' : '';
  const yearStatus = yearValidate.isInValidField && inputsEditedState.yearEdited ? 'error' : '';
  const amountStatus = amountValidate.isInValidField && inputsEditedState.amountEdited ? 'error' : '';
  const isInvalidForm = cardNumberValidate.isInValidField || cvcCodeValidate.isInValidField || monthValidate.isInValidField || yearValidate.isInValidField || amountValidate.isInValidField;
  console.log(operationResultState)
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    payment({
      cardNumber: formState.cardNumber,
      cvcCode: formState.cvcCode,
      month: formState.month,
      year: formState.year,
      amount: formState.amount,
    })
    .finally(() => setIsLoading(false)) // для проверки работы лоадера можно поставить таймаут в функции обратного вызова обработчика finally
    .then(({requestId, amount}) => {
      setOperationResult({...operationResultState, type: 'success', message: 'Успешно оплачено!', isPaid: true});
    })
    .catch(error => {
        setOperationResult({...operationResultState, type: 'error', message: 'Возникла ошибка!'});
    });
  }

  
  return (
      <div className='payment'>
          <h2 className='payment__title'>Оплата по карте</h2>
          <Form handleSubmit={handleSubmit}>
            <lable className="payment__lable">Номер карты</lable>
            <Input type={'text'}
              name={'cardNumber'}
              status={cardNumberStatus}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={16}
              value={formState.cardNumber}
              isEdited={inputsEditedState.cardNumberEdited}
              addedClassName={'form__input'}
              suffixIcon={<CreditCardOutlined />}
              captionComponentProps={{isEdited: inputsEditedState.cardNumberEdited, captions: [{text: 'Поле не должно быть пустым', validationValue: cardNumberValidate.validationValues.isEmptyError},
              {text: 'Поле должно содержать 16 цифр', validationValue: cardNumberValidate.validationValues.patternError}]}}
              captionComponent={ValidationCaption}/>

            <div className='date-code-zone'>
                <label className='date-code-zone__labletext date-code-zone__labletext_area_exptext'>ExpDate</label>
                <Input type={'text'}
                 name='month'
                 status={monthStatus}
                 handleChange={handleChange}
                 handleBlur={handleBlur}
                 maxLength={2}
                 value={formState.month}
                 isEdited={inputsEditedState.monthEdited}
                 addedClassName={'date-code-zone__monthinput '}
                 captionComponent={ValidationToolTip}
                 captionComponentProps={{isEdited: inputsEditedState.monthEdited, captions: [{text: 'Поле не должно быть пустым', validationValue: monthValidate.validationValues.isEmptyError},
                 {text: 'Поле должно содержать 2 цифры - код месяца', validationValue: monthValidate.validationValues.patternError}]}}
                 />

                 <p className='date-code-zone__separator'>/</p>
                <Input type={'text'}
                 name='year'
                 status={yearStatus}
                 handleChange={handleChange}
                 handleBlur={handleBlur}
                 maxLength={4}
                 value={formState.year}
                 isEdited={inputsEditedState.yearEdited}
                 addedClassName={'date-code-zone__yearinput'}
                 captionComponent={ValidationToolTip}
                 captionComponentProps={{isEdited: inputsEditedState.yearEdited, captions: [{text: 'Поле не должно быть пустым', validationValue: yearValidate.validationValues.isEmptyError},
                 {text: 'Поле должно содержать 4 цифры - код года', validationValue: yearValidate.validationValues.patternError}]}}/>

                <label className='date-code-zone__labletext date-code-zone__labletext_area_cvctext'>CVC</label>
                <Input type={'text'}
                 name='cvcCode'
                 status={cvcCodeStatus}
                 handleChange={handleChange}
                 handleBlur={handleBlur}
                 maxLength={3}
                 value={formState.cvcCode}
                 isEdited={inputsEditedState.cvcCodeEdited}
                 addedClassName={'date-code-zone__cvcinput'}
                 captionComponent={ValidationToolTip}
                 captionComponentProps={{isEdited: inputsEditedState.cvcCodeEdited, captions: [{text: 'Поле не должно быть пустым', validationValue: cvcCodeValidate.validationValues.isEmptyError},
                 {text: 'Поле должно содержать 3 цифры', validationValue: cvcCodeValidate.validationValues.patternError}]}}/>
            </div>

            <lable className="payment__lable">Сумма</lable>
            <Input type={'text'}
             name='amount'
             status={amountStatus}
             handleChange={handleChange}
             handleBlur={handleBlur}
             maxLength={6}
             value={formState.amount}
             isEdited={inputsEditedState.amountEdited}
             addedClassName={'form_input'}
             captionComponent={ValidationCaption}
             captionComponentProps={{isEdited: inputsEditedState.amountEdited, captions: [{text: 'Поле не должно быть пустым', validationValue: amountValidate.validationValues.isEmptyError},
              {text: 'Поле должно содержать число больше 9', validationValue: amountValidate.validationValues.patternError}]}}/>
            <div className='form__controll'>
              <SubmitButton addedClasses={'payment__submit-button'} disabled={isInvalidForm || operationResultState.isPaid} isLoading={isLoading} amount={formState.amount}/>
              <OperationResult message={operationResultState.message} type={operationResultState.type} />
            </div>
            

          </Form>
      </div>
  );
};

export default Payment;