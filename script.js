'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  
  movements.forEach((mov, index) => {
    const type = mov > 0 ? "deposit" : "withdrawal"

    const html = `
    <div class="movements__row">

      <div class="movements__type 
      movements__type--${type}">${index + 1} ${type}</div>

      <div class="movements__value">${mov}€</div>

    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);

  });
} 

displayMovements(account1.movements);
























































































/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr0 = ["a", "b", "c", "d", "e"];


//Slice
console.log(arr0.slice(0, 2));
console.log(arr0.slice(-1));
console.log(arr0.slice(1, -2));


//splice: mesma coisa que o slice, mas muda o array;
//console.log(arr0.splice(0, 2));
arr0.splice(-1); // apaga o ultimo elemento
console.log(arr0);
arr0.splice(1, 2);


//REVERSE inverte array
let arr1 = ["j", "i", "h", "g", "f"];
arr1.reverse();
console.log(arr1);


//CONCAT
arr0 = ["a", "b", "c", "d", "e"];

let letters = arr0.concat(arr1);
console.log(letters);
console.log([...arr0, ...arr1]);

//JOIN retorna uma string com o seprador que você escolher
console.log(letters.join("-"));
console.log(letters.join("0"));
console.log(letters.join(""));
console.log(letters.join(" "));



const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// começa a contar do final
console.log(arr.at(-1));
console.log(arr.at(-2));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);




const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const movement of movements1) {
  if(movement > 0) {
    console.log(`Deposited ${movement}`);
  } else {
    console.log(`Withdrew ${Math.abs(movement)}`);
  }
}

movements1.forEach(function(movement, index) {
  if(movement > 0) {
    console.log(`Movement ${index + 1}: Deposited ${movement}`);
  } else {
    console.log(`${index + 1}: Withdrew ${Math.abs(movement)}`);
  }
})

//map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key){
  console.log(`${key}:${value}`);
});

//Set SÓ ACEITA VALORES UNICOS
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);

currenciesUnique.forEach(function(value, _, map) {
  console.log(`${_}:${value}`);
});

// // MAP é igual forEach, porém cria um novo array com os elementos 

const array3 = [0, 1, 2, 3, 4, 5, 6, 7];
const arrary7 = array3.map((element) => {
  element * 2;
});

// FILTER cria um novo array com os elementos que resultam em true de acordo com a condição

const array4 = [0, 1, 2, 3, 4, 5, 6, 7];
const array5 = array4.filter();

// REDUCE gera todos os elementos de um array em um único valor de acordo com a condição passada, ex: somar todos os valores.

const array8 = [0, 1, 2, 3, 4, 5, 6, 7];
const array9 = array4.reduce(acc + current);