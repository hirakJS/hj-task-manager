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

const createBtn = document.querySelector('#create-btn');
const logoutBtn = document.querySelector('#logout-btn');

const footer = document.querySelector('footer');
footer.innerHTML = `&copy; ${(new Date()).getFullYear()}. Code with <3`;

const content = document.querySelector('#content');

const absoluteArea = document.querySelector('#absolute-area');

const tasks = [];

// const countsEls = Settings.counts.map(col => {
//   return createCountDiv(col);
// });

const loginView = new LoginView;

loadLoginPage();

logoutBtn.addEventListener('click', () => {
  doLogout();
});

window.addEventListener('hashchange', (e) => {
  if (location.hash == "#login") {
    loadLoginPage();
  } else {
    loadMainPage();
  }
});

// const columnEls = Settings.columns.map(col => {
//   return createColumnDiv(col);
// });

function loadMainPage() {
  loginView.deleteView();
  logoutBtn.style.display = "block";
  createBtn.style.visibility = "visible";
  Settings.columns.forEach(col => {
    createColumnDiv(col);
  });
}

function loadLoginPage() {
  logoutBtn.style.display = "none";
  createBtn.style.visibility = "hidden";
  content.appendChild(loginView.view);
}

const login = new Login;

function doLogin(event) {
  const data = event.target.parentElement.children;
  const username = data.username.value;
  const password = data.password.value;
  const errorDiv = data.error;
  if (!login.isLoggedIn) {
    try {
      login.login(username, password);
      login.isLoggedIn = true;
      loadMainPage();
    } catch (error) {
      console.error(error);
      errorDiv.innerHTML = error;
      errorDiv.style.visibility = "visible";
    }
  }
}

function doRegister(event) {
  const data = event.target.parentElement.children;
  const username = data.username.value;
  const password = data.password.value;
  const errorDiv = data.error;

  login.register(username, password);
  errorDiv.innerHTML = "You're successfully registered!";
  errorDiv.style.visibility = "visible";
  errorDiv.style.color = "#009688";
}

function doLogout() {
  loadLoginPage();
}

const dialog = new Dialog(
  id = 'dialog-1',
  title = 'Create Task',
  body = [
    { type: InputType.text, name: 'title', label: 'Title' },
    { type: InputType.textArea, name: 'description', label: 'description' },
  ],
  buttons = [
    'cancel',
    'submit'
  ]
);

createBtn.addEventListener('click', () => {
  openDialog();
});

function openDialog() {
  absoluteArea.style.display = "block";
  absoluteArea.appendChild(dialog.element);

  const focusTarget = `#text-${dialog.body[0].name}-0`;
  const inputTextOne = document.querySelector(focusTarget);
  inputTextOne.focus();
}

function closeDialog() {
  absoluteArea.removeChild(dialog.element);
  absoluteArea.style.display = "none";
}

function addCard() {
  const data = dialog.getFormValues();
  closeDialog();
  if (data.title != '') {
    const cardEl = createCardEl(data.title);
    content.firstElementChild.lastElementChild.appendChild(cardEl);
  }
}

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

  columnEl.appendChild(columnHeaderEl);

  const columnContentEl = document.createElement('div');
  columnContentEl.setAttribute('class', 'col-content');

  columnEl.appendChild(columnContentEl);

  content.appendChild(columnEl);

  return {
    columnContentEl: columnContentEl
  };
}

function createCardEl(data) {
  if (tasks == '') {
    count = {'count': parseInt(data[0].length)}
    tasks.push(count)}
  else {
    tasks[0].count = tasks[0].count+1
    tasks.push(tasks[0].count)}

  const divEl = document.createElement('div');
  divEl.setAttribute('class', 'draggable');
  divEl.setAttribute('draggable', 'true');
  divEl.setAttribute('class', 'card');
  divEl.innerHTML = tasks[0].count+'. '+data;
  // tasks.push(data[0].length)
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
      // tasks.pop(data[0].length)
    }
  })
  return divEl;
}

function createCountDiv(columnName) {
  const countsEls = document.createElement('div');
  countsEls.setAttribute('id', `col-${columnName.toLowerCase().replace(' ', '-')}`);
  countsEls.setAttribute('class', 'col');

  const columnHeaderEl = document.createElement('div');
  columnHeaderEl.setAttribute('class', 'col-header');

  const columnHeaderName = document.createElement('div');
  columnHeaderName.setAttribute('class', 'col-header-name');
  columnHeaderName.innerHTML = columnName;

  columnHeaderEl.appendChild(columnHeaderName);
  columnHeaderEl.appendChild(columnHeaderName);
  countsEls.appendChild(columnHeaderEl);

  const columnContentEl = document.createElement('div');
  columnContentEl.setAttribute('class', 'col-content');
  countsEls.appendChild(columnContentEl);

  content1.appendChild(countsEls);
  return {
    columnContentEl: columnContentEl,
  };
}


