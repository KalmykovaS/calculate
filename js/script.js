"use strict";

// lesson09

/* функция проверяет вводимое нами число на isNaN (проверяет является ли переменная нечисловым значением (Nan), перед эти parseFloat переводит строку в число(если это возможно), !(не) конвертирует ответ в true, если это число) и isFinite (является ли переданное значение конечным числом, если оно не бесконечное возвращается true, если бесконечное - false). Return передает true (если это число и оно конечно) либо false */
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isNotEmptyString = function(value) {
    return typeof value === 'string' && value !== null && value.trim() !== '';
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
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    //дополнительные доходы
    income: {},
    //дополнительные доходы
    addIncome: [],
    //дополнительные расходы
    expenses: {},
    //возможные дополнительные расходы
    addExpenses: [],
    deposit: false,
    //процент депозита
    percentDeposit: 0,
    //сколько денег заложил пользователь
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    //вопросы пользователю
    asking: function() {
        //получаем дополнительный заработок, при отмене на confirm переходит сразу к след. вопросу
        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome;
            let cashIncome;
            let onlyDigits = false;

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок', 'Фриланс');
                //если у нас получается число, то мы выходим из цикла
                onlyDigits = isNumber(itemIncome);
            }
            //если itemIncome содержит только цифры или явл. пустой строкой - выполняем цикл
            while (onlyDigits || !isNotEmptyString(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?', 10000);
            }
            while (!isNumber(cashIncome));

            //передаем новое свойство в объект income
            appData.income[itemIncome] = parseFloat(cashIncome);
        }

        let addExpensesRaw = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'Квартплата, проездной, кредит');
        //пишем название объекта, для того,чтобы сразу записать его в ключ addExpenses
        let addExpenses = addExpensesRaw.toLowerCase().split(', ');
        // .map( str => str.charAt(0).toUpperCase() + str.slice(1));

        for (let i = 0; i < addExpenses.length; i++) {
            let str = addExpenses[i];
            addExpenses[i] = str.charAt(0).toUpperCase() + str.slice(1);
        }

        appData.addExpenses = addExpenses;
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        /*чтобы в цикле все отработало тогда когда нужно, сначала создаем пустые переменные, а потом вкладываем в них значение*/
        for (let i = 0; i < 2; i++) {
            let key;
            let value;
            let onlyDigits = false;

            do {
                key = prompt('Введите обязательную статью расходов?');
                //если у нас получается число, то мы выходим из цикла
                onlyDigits = isNumber(key);
            }
            //если itemIncome содержит только цифры или явл. пустой строкой - выполняем цикл
            while (onlyDigits || !isNotEmptyString(key));

            do {
                value = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(value));

            appData.expenses[key] = parseFloat(value);
        }
    },
    //функция при помощи цикла for...in проходит по всем ключам объекта и выводит сумму каждого, а потом суммирует
    getExpensesMonth: function() {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += parseInt(appData.expenses[key]);
        }

        return sum;
    },
    //функция считает свободные деньги за месяц (доход - расходы)
    getBudget: function() {
        appData.budgetMonth = money - appData.getExpensesMonth();
        appData.budgetDay = appData.budgetMonth / 30;
    },
    //функция с условием вывода сообщения, в зависимости от того когда будет выполнена цель по накоплениям
    getTargetMonth: function() {
        if (appData.mission > 0) {
            return 'Цель будет достигнута за ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяца';
        } else {
            return 'Цель не будет достигнута';
        }
    },
    //функция содержит условия для вывода сообщений об уровне дохода
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 || appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 || appData.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
    //получение данных по депозиту в банке
    getInfoDeposit: function() {
        if (appData.deposit) {

            do {
                appData.percentDeposit = prompt('Какой годовой процент?', '10');
            }
            while (!isNumber(appData.percentDeposit));

            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            }
            while (!isNumber(appData.moneyDeposit));
        }
        //конвертируем значение в число
        appData.moneyDeposit = parseFloat(appData.moneyDeposit);
    },
    //получаем сколько мы заработаем за period (по умолчанию 3)
    calcSaveMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log(appData.getTargetMonth());
appData.getStatusIncome();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.getExpensesMonth());
console.log('За какой период будет достигнута цель (в месяцах): ' + appData.getTargetMonth(60000));
console.log('Уровень дохода: ' + appData.getStatusIncome());
console.log(appData.addExpenses.join(', '));

console.log('Наша программа включает в себя данные:');
//key - имя свойства, которое назначается каждой переменной
//appData[key] - выводит значение свойства
for (let key in appData) {
    console.log(key, appData[key]);
}

const startButton = document.getElementById('start');
const incomeButton = document.getElementsByTagName('button')[0];
const expensesButton = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');

const additionalIncome = document.querySelector('.additional_income');
const additionalIncomeFields = additionalIncome.querySelectorAll('.additional_income-item');

const budgetDayValue = document.getElementsByClassName('budget_day-value');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
const targetMonthValue = document.getElementsByClassName('target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('input.income-title');
const incomeAmount = document.querySelector('input.income-amount');
const expensesTitle = document.querySelector('input.expenses-title');
const expensesAmount = document.querySelector('input.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');