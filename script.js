"use strict";

// lesson04

let money = +prompt('Ваш месячный доход?');
const income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 60000;
const period = 6;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));

let getExpensesMonth = function(cost1, cost2) {
  return cost1 + cost2;
};

let getAccumulatedMonth = function(budget, allCosts) {
  return budget - allCosts;
};

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
console.log(accumulatedMonth);

let getTargetMonth = function(target) {
  return Math.ceil(target / accumulatedMonth);
};
console.log(getTargetMonth(60000));

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