const checkResponse = (response) => {
    return response.json()
    .then( data => {
        console.log(data)
        if(response.ok){
            return data;
        }
        return Promise.reject(`${data.message}&${response.status}` || 'Что-то сломалось');
    }) 
}

const payment = ({ cardNumber, cvcCode, month, year, amount}) => {
  return fetch('http://localhost:5000/payment', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({
        cardNumber,
        cvcCode,
        expDate: `${month}/${year}`,
        amount,
    })
  }).then(checkResponse);
};

export { payment };