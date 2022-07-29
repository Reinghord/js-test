import { clients } from './clients.js';

/*
 * Написати клас Клієнти по роботі з масивом клієнтів.
 * Для ініціалізації клас повинен отримати параметри об'єкта з масивом клієнтів (клієнтів) і посилання на список із DOM (listRef).
 *
 * У класі повинні бути реалізовані методи:
 * 1. normalizeData() - готує і повертає масив клієнтів для рендера:
 * - з поля fullName або username створити загальне - ім'я, в якому має бути або прізвище клієнта (якщо є) або його ник
 * - країни повинні бути у верхньому реєстрі
 *
 * 2. createMarkup(preparedData) - отримує підготовлений для рендеринга масив, створює і повертає розмітку за шаблоном з index.html:
 * - якщо пошти немає, виведіть рядок "Немає електронної пошти"
 * - лишка повинна бути прикрашена тільки якщо в полі shouldColor значення true
 *
 * 3. render() - за допомогою методу normalizeData() готує дані, за допомогою методу createMarkup(preparedData) створює розмітку і додає її в список на сторінці.
 *
 * 4. handleClick(e) - обробіток події 'Click' за списком (делегування):
 * - якщо натиснути кнопку по кнопці видалити, клієнт видаляється з масиву і переробляє весь список
 * - якщо клік був по кнопці color, окрашивает всю лишку в потрібний колір, а в масиві змінює значення поля shouldColor цього клієнта на true
 *
 * Після цього отримайте посилання на список і створіть екземпляр класу (myClients).
 * Зарендерити масив на сторінку.
 * У список повісити слухача події з обробником handleClick.
 */

// Example for initialization

class Clients {
  constructor({ clients, listRef }) {
    this.clients = clients;
    this.listRef = listRef;
  }

  normalizeData() {
    return this.clients.map(client => ({
      ...client,
      name: client.fullName?.last_name ?? client.username,
      country: client.country.toUpperCase(),
      email: client?.email ?? 'no email',
    }));
  }

  createMarkup(preparedData) {
    const markup = preparedData.map(
      data => /* html */ ` <li style="background-color: ${
        data.shouldColor ? data.color : 'none'
      }">
            <div>
              <img
                src="${data.avatar}"
                alt="${data.name}"
                width="100"
              />
            </div>
            <div>
              <p>Name: ${data.name}</p>
              <p>Email: ${data.email}</p>
              <p>Gender: ${data.gender}</p>
              <p>Country: ${data.country}</p>
              <button data-color=${data.color} data-id=${
        data.id
      }>Color me</button>
              <button data-id=${data.id} data-action="delete">Delete</button>
            </div>
          </li>`,
    );
    return markup.join('');
  }

  render() {
    const normalizedClients = this.normalizeData();
    const markup = this.createMarkup(normalizedClients);
    this.listRef.innerHTML = markup;
  }

  handleClick(e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    if (e.target.dataset.action === 'delete') {
      this.clients = this.clients.filter(
        client => client.id !== Number(e.target.dataset.id),
      );
      this.render();
    }

    if (e.target.dataset.color) {
      this.clients = this.clients.map(client => ({
        ...client,
        shouldColor:
          client.id === Number(e.target.dataset.id) || client.shouldColor,
      }));
      this.render();
    }
    console.log(e.target.dataset.color);
  }
}

const listRef = document.querySelector('.clients');

// const myClients = new Clients({ clients, selector: '.clients' });
const myClients = new Clients({ clients, listRef });
// console.log(myClients);
listRef.addEventListener('click', myClients.handleClick.bind(myClients));

myClients.render();
