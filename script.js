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

const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementsUSD2 = movements2.map((element) => {
  return element * eurToUsd;
});


// FILTER cria um novo array com os elementos que resultam em true de acordo com a condição

const array4 = [0, 1, 2, 3, 4, 5, 6, 7];
const array5 = array4.filter(function(element) {
  return element > 0;
});


// REDUCE gera todos os elementos de um array em um único valor de acordo com a condição passada, ex: somar todos os valores, encontrar o maior valor.
//Tem como parametros uma callback function e o valor inicial do acumulador. A callback recebe como parametros um acumulador (que vai persistir os valores), o elemento atual, index e o array.

const array8 = [0, 1, 2, 3, 4, 5, 6, 7];
const array9 = array4.reduce((acc, current) => {
  return acc + current;
});

const balance00 = array8.reduce((accumulator, currentEl) => {
  return accumulator + currentEl;
}, 0);

const maxValue = array8.reduce((accumulator, currentEl) => {
  if(accumulator > currentEl) {
    return accumulator
  } else {
    return currentEl;
  }
}, array8[0]);

// FIND retorna o primeiro elemento que satisfaça a condição

let array10 = [-1, 0, 1, 2, 3, 4, 5, 6, 7];
const found = array10.find((element) => {
  return element < 0;
});
 
console.log(found);

const account = accounts.find((element) => {
  return element.owner === 'Jessica Davis';
});
console.log(account);


// SOME retorna um booleano de acordo com a condição. 
array10 = [0, 1, 2, 3, 4, 5, 6, 7];

array10.some((element) => {
  return element === 1;
}); //true

array10.some((element) => {
  return element > 1000;
}); //true


// EVERY só retorna true se todos os elementos satisfazerem a condição
array10 = [1, 2, 3, 4, 5, 6, 7];

array10.every((element)=> {
  return element > 1;
}); //false

array10.every((element)=> {
  return element > 0;
}); //true

//FLAT remove aninhamentos em arrays, 1 por vez. Recebe como argumento depth, para escolhermos quandos níveis de aninhamento vamos remover;

array10 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat(1));
