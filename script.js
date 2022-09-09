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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => {
    return a - b;
  }) : movements;
  
  movs.forEach((mov, index) => {
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

const calcDisplayBalance = function(acc) {
  acc.balance  = acc.movements.reduce((acc, element) => {
    return acc + element;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
     .filter((mov) => {
      return mov > 0;
    }).reduce((accumulator, mov) => {
      return accumulator + mov;
    }, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements.filter((mov) => {
      return mov < 0;
  }).reduce((accumulator, mov) => {
      return accumulator + mov;
  }, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

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
  labelSumInterest.textContent = `${interest}€`;
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
    displayMovements(account.movements);
    calcDisplayBalance(account);
    calcDisplaySummary(account);
}

// Event handlers

let currentAccount;

btnLogin.addEventListener("click", function(event) {
  event.preventDefault();

  currentAccount = accounts.find((element) => {
    return element.username === inputLoginUsername.value;
  });

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();


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
    
    //Display Data
    updateUI(currentAccount);
  } 
});

btnLoan.addEventListener("click", function(event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((element) => {
    return element >= amount / 10;
  })) {
    currentAccount.movements.push(amount);

    //Display data
    updateUI(currentAccount);
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

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})





////FILL preenche um array de acordo com o parametro passado

const x = new Array(7);// [emptyArray x7]
x.fill(1, 3); //[1, 1, 1, emptyArray x4]

//ARRAY.FROM
const y = Array.from({length: 7}, () => {
  return 1;
});

const z = Array.from({length: 7}, (cur, i) => {
  return i + 1;
});

const w = Array.from(document.querySelectorAll(".class"));