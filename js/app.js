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

for (i in cols = Settings.columns) {
  const divEl = document.createElement('div');
  divEl.setAttribute('id', `col-${cols[i].toLowerCase().replace(' ', '-')}`);
  divEl.setAttribute('class', 'col');
  
  content.appendChild(divEl);
}