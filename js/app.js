/*
  MIT License

  Copyright (c) 2020 Hirakjyoti Sarma

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*/

const headTitle = document.head.querySelector('title');
headTitle.innerText = AppInfo.name;

const stylelink = document.createElement('link')
stylelink.setAttribute('rel', 'stylesheet');
stylelink.setAttribute('href', './css/theme_light.css');
document.head.appendChild(stylelink);

const app = document.querySelector('#app');

const brand = document.querySelector('#brand');
brand.innerHTML = AppInfo.name;

const footer = document.querySelector('footer');
footer.innerHTML = `&copy; ${(new Date()).getFullYear()}. Code with <3`;

const content = document.querySelector('#content');

const tasks = [];

const columnEls = Settings.columns.map(col => {
  return createColumnDiv(col);
});

columnEls.forEach(columnEl => {
  columnEl.addTaskBtn.addEventListener('click', () => {
    const data = prompt('Enter task info:', '');
    if (data) {
      const cardEl = createCardEl(data);
      columnEl.columnContentEl.appendChild(cardEl);
    }
  });
});

function createColumnDiv(columnName) {
  const columnEl = document.createElement('div');
  columnEl.setAttribute('id', `col-${columnName.toLowerCase().replace(' ', '-')}`);
  columnEl.setAttribute('class', 'col');

  const columnHeaderEl = document.createElement('div');
  columnHeaderEl.setAttribute('class', 'col-header');

  const columnHeaderName = document.createElement('div');
  columnHeaderName.setAttribute('class', 'col-header-name');
  columnHeaderName.innerHTML = columnName;

  columnHeaderEl.appendChild(columnHeaderName);

  const addTaskBtn = document.createElement('button');
  addTaskBtn.setAttribute('class', 'btn');
  addTaskBtn.innerHTML = '+';

  columnHeaderEl.appendChild(addTaskBtn);

  columnEl.appendChild(columnHeaderEl);

  const columnContentEl = document.createElement('div');
  columnContentEl.setAttribute('class', 'col-content');

  columnEl.appendChild(columnContentEl);
  
  content.appendChild(columnEl);

  return {
    columnContentEl: columnContentEl,
    addTaskBtn: addTaskBtn
  };
}

function createCardEl(data) {
  const divEl = document.createElement('div');
  divEl.setAttribute('class', 'card');
  divEl.innerHTML = data;

  divEl.addEventListener('click', () => {
    const m_data = prompt('Edit task info:', divEl.innerHTML);
    if (m_data) {
      divEl.innerHTML = m_data;
    }
  });

  divEl.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (confirm('Do you really wanna delete the task?')) {
      divEl.remove();
    }
  })

  return divEl;
}
