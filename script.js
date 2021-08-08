"use strict";

// lesson05

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 60000;
const period = 6;
let expenses = [];

let showTypeOff = function(item) {
  console.log(typeof item);
};

showTypeOff(money);
showTypeOff(income);
showTypeOff(deposit);

console.log(addExpenses.toLowerCase().split(', '));

let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();
console.log(start);

let getExpensesMonth = function() {
  let sum = 0;
  let amount;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
    do {
      amount = prompt('Во сколько это обойдется?');
    }
    while (!isNumber(amount));

    sum += parseInt(amount);
  }

  return sum;
};

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesAmount);

let getAccumulatedMonth = function(budget, allCosts) {
  return budget - allCosts;
};

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
console.log(accumulatedMonth);

let getTargetMonth = function(target) {
  if (target > 0) {
    return 'Цель будет достигнута за ' + Math.ceil(target / accumulatedMonth) + ' месяца';
  } else {
    return 'Цель не будет достигнута';
  }
};
console.log(getTargetMonth(0));

let budgetDay = accumulatedMonth / 30;
console.log(budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 || budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 || budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}