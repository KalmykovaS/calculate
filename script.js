"use strict";

// lesson01

let money;
let income;
let addExpenses;
let deposit;
let mission;
let period;

alert('Hello world');
console.log('Hello world');

// lesson02

money = 1000;
income = 'freelance';
addExpenses = 'Интернет, Такси, Коммуналка';
deposit = true;
mission = 2000;
period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);