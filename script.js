'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-09-07T23:36:17.929Z',
    '2022-09-08T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-10-07T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////
// Functions

const formatMovementDate = function(date, locale) {
    
    const calcDaysPassed = (date1, date2) => {
      return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    };

    const daysPassed = calcDaysPassed(new Date(), date);

    if(daysPassed === 0) return "Today";
    if(daysPassed === 1) return "Yesterday";
    if(daysPassed <= 7) return `${daysPassed} days ago`;
    
    return new Intl.DateTimeFormat(locale).format(date);
}

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {style: "currency", currency: currency}).format(value);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? acc.movements.slice().sort((a, b) => {
    return a - b;
  }) : acc.movements;
  
  movs.forEach((mov, index) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    
    const date = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formatedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">

      <div class="movements__type 
      movements__type--${type}">${index + 1} ${type}</div>

      <div class="movements__date">${displayDate}</div>

      <div class="movements__value">${formatedMov}</div>

    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);

  });
} 

const calcDisplayBalance = function(acc) {
  acc.balance  = acc.movements.reduce((acc, element) => {
    return acc + element;
  }, 0);

  const formatedMov = formatCur(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formatedMov;
}

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
     .filter((mov) => {
      return mov > 0;
    }).reduce((accumulator, mov) => {
      return accumulator + mov;
    }, 0);

    

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);;

  const out = acc.movements.filter((mov) => {
      return mov < 0;
  }).reduce((accumulator, mov) => {
      return accumulator + mov;
  }, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => {
      return mov > 0;
  }).map((deposit) => {
      return deposit * acc.interestRate / 100; 
  }).filter((element) => {
      return element >= 1;
  }).reduce((accumulator, element) => {
      return accumulator + element;
  }, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

const createUserNames = function(accs) {

  accs.forEach((acc) => {
    acc.username = acc.owner
    .toLowerCase()
    .split(" ")
    .map((element) => {
      return element.at(0);
    }).join("");
  });
}
createUserNames(accounts);

const updateUI = function(account) {
    displayMovements(account);
    calcDisplayBalance(account);
    calcDisplaySummary(account);
};

const startLogOutTimer = function() {

  const tick = function(){
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
      
    if(time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    time--;
  }

  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
}



// Event handlers

let currentAccount;
let timer;


btnLogin.addEventListener("click", function(event) {
  event.preventDefault();

  currentAccount = accounts.find((element) => {
    return element.username === inputLoginUsername.value;
  });

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


    // Clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();

    //Timer 
    if(timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();


    // Display data
    updateUI(currentAccount);

  }
});

btnTransfer.addEventListener("click", function(event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => {
    return acc.username === inputTransferTo.value
  });
  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    
    //Display transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //Display Data
    updateUI(currentAccount);
  } 
});

btnLoan.addEventListener("click", function(event) {
  event.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((element) => {
    return element >= amount / 10;
  })) {
    setTimeout(function(){
      currentAccount.movements.push(amount);

      //Display loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Display data
      updateUI(currentAccount);
      }, 3000);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function(event) {
  event.preventDefault();

  if(inputCloseUsername.value === currentAccount.username 
  && Number(inputClosePin.value) === currentAccount.pin) {

    const index = accounts.findIndex((element) => {
      return element.username === currentAccount.username;
    }); 

    accounts.splice(index, 1);
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = "";
  inputClosePin.value = "";
});

let sorted = false;

btnSort.addEventListener("click", function(event) {
  event.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});


// Lectures

//Parse  Number.parseInt(valor, tipo de base (10 para 0 a 9 e 2 para binários))
console.log(Number.parseInt("1.5"));// 1 
console.log(Number.parseFloat('1.5'));//1.5

// isNaN
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); // true

//ifFinite
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite(20 / 0)); //false
console.log(Number.isFinite("20"));// false

//isInteger
console.log(Number.isInteger(20));//true
console.log(Number.isInteger(20.5));//false

//sqrt

console.log(Math.sqrt(25));// 5
console.log(25 ** (1 / 2));// 5

//max retorna o maior elemento
console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23

//min retorna o menor valor
console.log(Math.min(5, 18, 23, 11, 2)); //5

//PI gera o valor de PI, 3.14
console.log(Math.PI); //3.14

//random

console.log(Math.trunc(Math.random() * 6 + 1));
const randomIn = function(min, max) {
  return Math.trunc(Math.random() * (max - min) + 1) + min;
}

//Rounding integers

console.log(Math.round(23.3));//23
console.log(Math.round(23.9));//23
console.log(Math.round(-23.3));//-24

console.log(Math.trunc(23.9));//24
console.log(Math.trunc(23.3));//23
console.log(Math.round(-23.9));//-23

console.log(Math.floor(23.3));//23
console.log(Math.floor(23.3));//23

console.log(Math.ceil(23.3));//24
console.log(Math.ceil(23.9));//24

//rounding decimals
console.log((2.7).toFixed(0));// retorna string "3"

// resto/remainder

console.log(5 % 2);// 1
console.log(8 % 3);// 2 
console.log(6 % 2);// 0

//separator apenas visual

const diameter = 287_460_000_000;
const priceCents = 345_99;
const trasnferFee = 15_00;

//n transforma o numero em bigInt
console.log(4394893843427398479847242134123434712983472137492137498127n);
console.log(BigInt(43948938434273));// transforma qualquer número em bigInt

// Date and time

const now1 = new Date();
console.log(now1);
console.log(new Date("Sep 07 2022 19:35:00"))

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19));

console.log(new Date(0));

//  working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

console.log(new Date(2142267780000));

console.log(Date.now());

console.log(future.setFullYear(2040));
console.log(future.setMonth(2));
console.log(future.setDate(3));
console.log(future.setHours(4));
console.log(future.setMinutes(5));
console.log(future.setSeconds(6));
console.log(future.setTime());

// Date calc

const add = function(a) {
  return a + 10;
}
 
const future1 = new Date(2037, 10, 19, 15, 23);
console.log(Number(future1));

