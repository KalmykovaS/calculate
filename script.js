"use strict";

// lesson03

let money = +prompt('Ваш месячный доход?');
const income = 'freelance';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 60000;
const period = 6;
let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));

let budgetMonth = money - amount1 - amount2;
console.log(budgetMonth);

let missionMounth = Math.ceil(mission / budgetMonth);
console.log(missionMounth);

let budgetDay = budgetMonth / 30;
console.log(budgetDay);

// switch (budgetDay) {
//   case budgetDay >= 1200: 
//     console.log('У вас высокий уровень дохода');
//     break;
//   case budgetDay >= 600 || budgetDay < 1200:
//     console.log('У вас средний уровень дохода');
//     break;
//   case budgetDay < 600 || budgetDay >= 0:
//     console.log('К сожалению у вас уровень дохода ниже среднего');
//     break;
//   default:
//     console.log('Что то пошло не так');
// }

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 || budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 || budgetDay >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что то пошло не так');
}