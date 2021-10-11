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

// Singleton class
class LoginView {
  constructor() {
    if (!!LoginView._instance) {
      return LoginView._instance;
    }

    this.view = this.#createView();

    LoginView._instance = this;

    return this;
  }

  #createView() {
    const div = new Div('login', [],
      `<div id="login-panel" style="display: flex; flex-direction: column; width: 300px;">
        <!--<h3 style="text-align: center; margin: 0 auto 25px;">HJ Task Manager</h3>-->
        <label for="username">Username</label>
        <input id="username" type="text" name="username" />
        <label for="password">Password</label>
        <input id="password" type="password" name="password" />
        <div id="error" style="visibility: hidden; margin: 16px 0; color: red;"></div>
        <button class="btn" onclick="doLogin(event)" style="margin-left: 0;">Login</button>
        <br>
        <span style="text-align: center;">Are you a new user?</span>
        <a href="" onclick="doRegister(event)" style="text-align: center;">Register</a>
      </div>`
    );

    return div.element;
  }

  deleteView() {
    this.view.remove();
  }
}

class Login {
  isLoggedIn = false;

  register(username, password) {
    localStorage.setItem('credentials', this.encode(`${username}-${password}`));
  }

  login(username, password) {
    const credentialsIn = this.encode(`${username}-${password}`);
    const credentials = localStorage.getItem('credentials');
    if (credentialsIn != credentials) {
      this.isLoggedIn = false;
      throw 'Login failed due to incorrect username or password!';
    } else this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  encode(str) {
    var encodedStr = "";
    for (let i = 0; i < str.length; i++) {
      encodedStr += str[i].charCodeAt().toString(16);
    };
    return encodedStr;
  }
}

class Div {
  constructor(id, attributes, child) {
    this.element = this.#create(id, attributes, child);
  }

  #create(id, attributes, child) {
    const el = document.createElement('div');
    el.id = id;
    attributes.forEach((attr, index) => {
      el.setAttribute(attr.key, attr.value);
    });

    if (typeof (child) == 'string') {
      el.innerHTML = child;
    } else {
      el.appendChild(child);
    }

    return el;
  }
}
