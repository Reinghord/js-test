// ?.
// Оператор опциональной последовательности (необов'язкове з'єднання)
// Оператор ?. дозволяє отримати значення властивостей, що знаходяться на будь-якому рівні вкладеності в ланцюгу відношення між собою об'єктів, без необхідності перевіряти кожне з проміжних властивостей в його на існування.
// ?. працює відповідно до оператора ., за рахунок того, що не виключає виключення, якщо об'єкт, до властивості або методу, до якого відноситься звернення, має рівність null або undefined. У цих випадках він повертає undefined.
// Таким чином, ми отримуємо більш короткий і зрозумілий код при зверненні до вкладених по ланцюгу властивостей об'єкта, коли є ймовірність, що яке-то з них відсутнє.

const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
  getName() {
    console.log(this.name);
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined

//////////////////////////////////

let customer = {
  name: 'Carl',
  details: {
    age: 82,
    location: 'Paradise Falls', // точна адреса невідома
  },
};
let customerCity = customer.details?.address?.city;

// … це також працює з викликом функцій
let birthYear = customer.details?.getBirth?.();

///////////////////////////////////////////////////////////

// Оператор нулевого злиття (Оператор нульового об'єднання)
// Оператор ?? це логічний оператор, який повертає значення правої операнди, коли значення лівої операнди дорівнює null або undefined, у протилежному випадку буде повернуто значення лівої операнди.
// На відміну від логічного ІЛІ (||), лева частина оператора вираховується та повертається, навіть якщо її результат після приведення до логічного типу виявляється неправильним, але не є нульовим або невизначеним. Другими словами, якщо ви використовуєте || щоб встановити значення за замовчуванням, ви можете скористатись неожиданною поведінкою, якщо вважаєте деякі неправильні значення придатними для використання (наприклад, "" або 0).

const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0

////////////////////////////////

const nullValue = null;
const emptyText = ''; // falsy
const someNumber = 42;

const valA = nullValue ?? 'default for A';
const valB = emptyText ?? 'default for B';
const valC = someNumber ?? 0;

console.log(valA); // "default for A"
console.log(valB); // "" (тому що пустий рядок не null или undefined)
console.log(valC); // 42

/////////////////////////////////////////////////////////////////////////////////////

// ??=
// Оператор логічного нульового присвоєння (присвоєння логічного нуля)
// Оператор (x ??= y) присвоює нове значення х, тільки якщо x має нульове значення (рівно null або undefined)
// if (x === null || x === undefined) { x = y };
// x ?? (x = y);

const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);
// expected output: 50

a.speed ??= 25;
console.log(a.speed);
// expected output: 25

///////////////////////////////////

function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }

///////////////////////////////////////////////////////////////////////////////////

// ||=
// Оператор присвоєння з логічним ІЛИ (присвоєння логічного АБО)
// Оператор (x ||= y) присвоює нове значення х, тільки якщо x ложно (x || (x = y))

const lesson = { duration: 50, title: '' };

lesson.duration ||= 10;
console.log(lesson.duration);
// expected output: 50

lesson.title ||= 'title is empty.';
console.log(lesson.title);
// expected output: "title is empty"

///////////////////////////

document.getElementById('lyrics').textContent ||= 'No lyrics.';

/////////////////////////////////////////////////////////////////////////////////

// &&=
// Оператор присвоєння з логічним І (присвоєння логічного І)
// Оператор (x &&= y) присвоює нове значення х, тільки якщо x істинно (x && (x = y))

let c = 1;
let d = 0;

c &&= 2;
console.log(c);
// expected output: 2

d &&= 2;
console.log(d);
// expected output: 0

///////////////////////////////

let x = 0;
let y = 1;

x &&= 0; // 0
x &&= 1; // 0
y &&= 1; // 1
y &&= 0; // 0

/////////////////////////////////////////////////////

// Повторити перед 9-м модулем
// 1) 7-й модуль:
// - DOM-свойства та атрибути
// - Створення та видалення вузлів
// - Події
// 2) 8-й модуль:
// - Делегування
