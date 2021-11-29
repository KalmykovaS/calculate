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

const AppData = function() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    //дополнительные доходы
    this.income = {};
    this.incomeMounth = 0;
    //дополнительные доходы
    this.addIncome = [];
    //дополнительные расходы
    this.expenses = {};
    //возможные дополнительные расходы
    this.addExpenses = [];
    this.deposit = false;
    //процент депозита
    this.percentDeposit = 0;
    //сколько денег заложил пользователь
    this.moneyDeposit = 0;
    //функция задает при помощи prompt вопрос и если пользователь ввел не число перезапускает цикл
}

AppData.prototype.check = function() {
    if (salaryAmount.value !== '') {
        startButton.removeAttribute('disabled')
    }
};

AppData.prototype.start = function() {
    if (salaryAmount.value === '') {
        startButton.setAttribute('disabled', 'disabled');
        return;
    }

    let allInput = document.querySelectorAll('input[type=text]');
    allInput.forEach((element) => {
        element.setAttribute('disabled', 'disabled');
    });

    incomeButton.setAttribute('disabled', 'disabled');
    expensesButton.setAttribute('disabled', 'disabled');

    startButton.style.display = 'none';
    resetButton.style.display = 'block';

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getStatusIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = +_this.calcPeriod();
    });
};

// добавляем еще одно значение наименование и сумма для "Обязательные расходы"
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesButton);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesButton.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeButton);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomeButton.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });

    for (let key in this.income) {
        this.incomeMounth += +this.income[key];
    }
};

//Получение "Возможных расходов"
AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;

    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

//Получение "Возможных доходов"
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

//функция при помощи цикла for...in проходит по всем ключам объекта и выводит сумму каждого, а потом суммирует
AppData.prototype.getExpensesMonth = function() {
    for (let key in this.expenses) {
        this.expensesMonth += parseInt(this.expenses[key]);
    }
};

//функция считает свободные деньги за месяц (доход - расходы)
AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMounth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

//функция с условием вывода сообщения, в зависимости от того когда будет выполнена цель по накоплениям
AppData.prototype.getTargetMonth = function() {
    return targetAmount.value / this.budgetMonth;
};

//функция содержит условия для вывода сообщений об уровне дохода
AppData.prototype.getStatusIncome = function() {
    if  (this.budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 || this.budgetDay < 1200) {
        return 'У вас средний уровень дохода';
    } else if (this.budgetDay < 600 || this.budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};

//получение данных по депозиту в банке
AppData.prototype.getInfoDeposit = function() {
    if (this.deposit) {

        do {
            this.percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while (!isNumber(this.percentDeposit));

        do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
        while (!isNumber(this.moneyDeposit));
    }
    //конвертируем значение в число
    this.moneyDeposit = parseFloat(this.moneyDeposit);
};

//получаем сколько мы заработаем за period (по умолчанию 3)
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
    let inputTextData = document.querySelectorAll('.data input[type=text]');
    let resultTextData = document.querySelectorAll('.result input[type=text]');

    inputTextData.forEach((elem) => {
        elem.value = '';
        elem.removeAttribute('disabled');
        periodSelect.value = '0';
        periodAmount.innerHTML = periodSelect.value;
    });
    
    resultTextData.forEach((elem) => {
        elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
        incomeItems[i].parentNode.removeChild(incomeItems[i]);
        incomeButton.style.display = 'block';
    }

    for (let i = 1; i < expensesItems.length; i++) {
        expensesItems[i].parentNode.removeChild(expensesItems[i]);
        expensesButton.style.display = 'block';
    }

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMounth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];

    resetButton.style.display = 'none';
    startButton.style.display = 'block';

    incomeButton.removeAttribute('disabled');
    expensesButton.removeAttribute('disabled');
    depositCheck.checked = false;
};

AppData.prototype.eventListeners = function () {
    startButton.addEventListener('click', appData.start.bind(appData));
    expensesButton.addEventListener('click', appData.addExpensesBlock);
    incomeButton.addEventListener('click', appData.addIncomeBlock);
    salaryAmount.addEventListener('keyup', appData.check)
    resetButton.addEventListener('click', appData.reset.bind(appData))
    
    periodSelect.addEventListener('change', function() {
        periodAmount.innerHTML = periodSelect.value;
    });
};

const appData = new AppData();
console.log(appData);

appData.eventListeners();

//key - имя свойства, которое назначается каждой переменной
//appData[key] - выводит значение свойства

/*
console.log('Наша программа включает в себя данные:');

for (let key in appData) {
    console.log(key, appData[key]);
}
*/