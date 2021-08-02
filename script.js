"use strict";

// lesson02

const money = 1000;
const income = 'freelance';
const addExpenses = 'Интернет, Такси, Коммуналка';
const deposit = true;
const mission = 2000;
const period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);