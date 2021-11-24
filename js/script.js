"use strict";

// lesson11

/* функция проверяет вводимое нами число на isNaN (проверяет является ли переменная нечисловым значением (Nan), перед эти parseFloat переводит строку в число(если это возможно), !(не) конвертирует ответ в true, если это число) и isFinite (является ли переданное значение конечным числом, если оно не бесконечное возвращается true, если бесконечное - false). Return передает true (если это число и оно конечно) либо false */
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let isNotEmptyString = function(value) {
    return typeof value === 'string' && value !== null && value.trim() !== '';
};

const startButton = document.getElementById('start');
const resetButton = document.getElementById('cancel');
const incomeButton = document.getElementsByTagName('button')[0];
const expensesButton = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const data = document.querySelector('.data');
const calc = document.querySelector('.calc');

const additionalIncome = document.querySelector('.additional_income');
const additionalIncomeItem = additionalIncome.querySelectorAll('.additional_income-item');

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('input.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

startButton.setAttribute('disabled', 'disabled');
startButton.style.opacity = '0.7';
salaryAmount.addEventListener('input', function() {
    if (salaryAmount.value.trim() !== '') {
        startButton.removeAttribute('disabled');
        startButton.style.opacity = '';
    } else {
        alert('Введите месячный доход!');
    }
});

let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    //дополнительные доходы
    income: {},
    incomeMounth: 0,
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
    //функция задает при помощи prompt вопрос и если пользователь ввел не число перезапускает цикл
    start: function() {

        this.budget = +salaryAmount.value;
        console.log(salaryAmount.value);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getStatusIncome();
        this.getInfoDeposit();

        this.getBudget();

        this.showResult();

        data.querySelectorAll('input[type=text]').forEach((element) => {
            element.setAttribute("readonly", "readonly");
        });
        
        startButton.remove();
        resetButton.style = 'display: block';
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = +appData.calcPeriod();
        });
    },
    // добавляем еще одно значение наименование и сумма для "Обязательные расходы"
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesButton);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesButton.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeButton);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomeButton.style.display = 'none';
        }
    },

    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    //сделать также как в getExpenses
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMounth += +appData.income[key];
        }
    },
    //Получение "Возможных расходов"
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    //Получение "Возможных доходов"
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    //функция при помощи цикла for...in проходит по всем ключам объекта и выводит сумму каждого, а потом суммирует
    getExpensesMonth: function() {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += parseInt(appData.expenses[key]);
        }
        appData.expensesMonth = +sum;
        return appData.expensesMonth;
    },
    //функция считает свободные деньги за месяц (доход - расходы)
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMounth - appData.getExpensesMonth();
        appData.budgetDay = appData.budgetMonth / 30;
    },
    //функция с условием вывода сообщения, в зависимости от того когда будет выполнена цель по накоплениям
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
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
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    }
};

startButton.addEventListener('click', appData.start.bind(appData));
expensesButton.addEventListener('click', appData.addExpensesBlock);
incomeButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = periodSelect.value;
});

console.log('Наша программа включает в себя данные:');
//key - имя свойства, которое назначается каждой переменной
//appData[key] - выводит значение свойства
for (let key in appData) {
    console.log(key, appData[key]);
}