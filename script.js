"use strict";

// lesson07

/* функция проверяет вводимое нами число на isNaN (проверяет является ли переменная нечисловым значением (Nan), перед эти parseFloat переводит строку в число(если это возможно), !(не) конвертирует ответ в true, если это число) и isFinite (является ли переданное значение конечным числом, если оно не бесконечное возвращается true, если бесконечное - false). Return передает true (если это число и оно конечно) либо false */
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

//функция задает при помощи prompt вопрос и если пользователь ввел не число перезапускает цикл
let start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();

let appData = {
  //дополнительные доходы
  income: {},
  //дополнительные доходы
  addIncome: [],
  //дополнительные расходы
  expenses: {},
  //возможные дополнительные расходы
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  //вопросы пользователю
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 
    'Квартплата, проездной, кредит');
    //пишем название объекта, для того,чтобы сразу записать его в ключ addExpenses
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    /*чтобы в цикле все отработало тогда когда нужно, сначала создаем пустые переменные, а потом вкладываем в них значение*/
    let key;
    let value;
    for (let i = 0; i < 2; i++) {
      key = prompt('Введите обязательную статью расходов?');
      
      do {
        value = prompt('Во сколько это обойдется?');
      }
      while (!isNumber(value));

      appData.expenses[key] = value;
    }
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0
};

appData.asking();

//функция при помощи цикла for...in проходит по всем ключам объекта и выводит сумму каждого, а потом суммирует
appData.getExpensesMonth = function() {
  let sum = 0;

  for (let key in appData.expenses) {
    sum += parseInt(appData.expenses[key]);
  }

  return sum;
};
appData.getExpensesMonth();

//функция считает свободные деньги за месяц (доход - расходы)
appData.getBudget = function() {
  appData.budgetMonth = money - appData.getExpensesMonth();
  appData.budgetDay = appData.budgetMonth / 30;
};
appData.getBudget();

//функция с условием вывода сообщения, в зависимости от того когда будет выполнена цель по накоплениям
appData.getTargetMonth = function() {
  if (appData.mission > 0) {
    return 'Цель будет достигнута за ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяца';
  } else {
    return 'Цель не будет достигнута';
  }
};
console.log(appData.getTargetMonth());

//функция содержит условия для вывода сообщений об уровне дохода
appData.getStatusIncome = function() {
  if (appData.budgetDay >= 1200) {
    return 'У вас высокий уровень дохода';
  } else if (appData.budgetDay >= 600 || appData.budgetDay < 1200) {
    return 'У вас средний уровень дохода';
  } else if (appData.budgetDay < 600 || appData.budgetDay >= 0) {
    return 'К сожалению у вас уровень дохода ниже среднего';
  } else {
    return 'Что то пошло не так';
  }
};
appData.getStatusIncome();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log('За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth(60000));
console.log('Уровень дохода: ' + appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(key + ':' + appData[key]);
}