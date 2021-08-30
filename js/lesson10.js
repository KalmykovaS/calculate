const booksList = document.querySelector('.books');
const booksElems = booksList.querySelectorAll('.book');
const body = document.querySelector('body');
const popUpAds = document.querySelector('.adv');
const chaptersOfSecondBook = booksElems[0].querySelectorAll('li');
const chaptersOfFifthBook = booksElems[5].querySelectorAll('li');
const chaptersOfSixthBook = booksElems[2].querySelectorAll('li');

booksList.prepend(booksElems[1]);
booksList.append(booksElems[2]);
booksElems[3].before(booksElems[4]);

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

booksElems[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

popUpAds.remove();

chaptersOfSecondBook[2].before(chaptersOfSecondBook[3]);
chaptersOfSecondBook[3].after(chaptersOfSecondBook[6]);
chaptersOfSecondBook[6].after(chaptersOfSecondBook[8]);
chaptersOfSecondBook[8].after(chaptersOfSecondBook[4]);
chaptersOfSecondBook[4].after(chaptersOfSecondBook[5]);
chaptersOfSecondBook[10].before(chaptersOfSecondBook[2]);

chaptersOfFifthBook[1].after(chaptersOfFifthBook[9]);
chaptersOfFifthBook[6].before(chaptersOfFifthBook[2]);
chaptersOfFifthBook[8].before(chaptersOfFifthBook[5]);

const elemClone = chaptersOfSixthBook[8].cloneNode(true);
booksElems[2].append(elemClone);
elemClone.textContent = 'Глава 8: За пределами ES6';
chaptersOfSixthBook[8].after(elemClone);