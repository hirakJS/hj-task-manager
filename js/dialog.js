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

'use strict';

const InputType = Object.freeze({
  "text": 1,
  "number": 2,
  "textArea": 3
});

class Dialog {
  #id;
  #title;
  body;
  #buttons;
  element;

  constructor(id, title, body, buttons) {
    this.#id = id;           // string
    this.#title = title;     // string
    this.body = body;       // array of objects
    this.#buttons = buttons; // array

    this.element = document.createElement('div');
    this.#createDialog();
  }

  #createDialog() {
    const divEl = this.element;
    const dialogHeaderEl = document.createElement('div');
    const dialogBodyEl = document.createElement('div');
    const dialogFooterEl = document.createElement('div');
    const formEl = document.createElement('form');

    divEl.id = this.#id;
    divEl.setAttribute('class', 'dialog');

    dialogHeaderEl.setAttribute('class', 'dialog-header');
    dialogHeaderEl.innerHTML = this.#title;

    dialogBodyEl.setAttribute('class', 'dialog-body');

    dialogFooterEl.setAttribute('class', 'dialog-footer');

    this.body.forEach((b, i) => {
      var inputEl;
      switch (b.type) {
        case InputType.text:
          inputEl = this.createInputEl(`text-${b.name}-${i}`, 'text', b.name, '', b.label);
          break;
        case InputType.textArea:
          inputEl = this.createTextAreaEl(`textarea-${b.name}-${i}`, b.name, b.label);
          break;
        default:
          break;
      }

      if (inputEl) {
        if (inputEl.labelEl)
          formEl.appendChild(inputEl.labelEl);
        
        formEl.appendChild(inputEl.inputEl);
      }
    });

    dialogBodyEl.appendChild(formEl);

    dialogFooterEl.appendChild(this.createButtonEl('cancel', 'Cancel', 'closeDialog()', true));
    dialogFooterEl.appendChild(this.createButtonEl('submit', 'Submit', 'addCard()'));

    divEl.appendChild(dialogHeaderEl);
    divEl.appendChild(dialogBodyEl);
    divEl.appendChild(dialogFooterEl);
  }

  createInputEl(id, type, name, value, label) {
    const inputEl = document.createElement('input');
    inputEl.id = id;
    inputEl.type = type;
    inputEl.name = name;

    return {
      inputEl: inputEl,
      labelEl: label ? this.createLabelEl(name, label) : null
    };
  }

  createTextAreaEl(id, name, label) {
    const textAreaEl = document.createElement('textarea');
    textAreaEl.id = id;
    textAreaEl.name = name;
    textAreaEl.rows = "10";

    return {
      inputEl: textAreaEl,
      labelEl: label ? this.createLabelEl(name, label) : null
    };
  }

  createLabelEl(forName, value) {
    const labelEl = document.createElement('label');
    labelEl.setAttribute('for', forName);
    labelEl.innerHTML = value;
    return labelEl;
  }

  createButtonEl(id, label, action, hasNoBackground) {
    const buttonEl = document.createElement('button');
    buttonEl.id = id;
    if (hasNoBackground)
      buttonEl.setAttribute('class', 'btn no-bg');
    else
      buttonEl.setAttribute('class', 'btn');

    buttonEl.innerHTML = label;
    buttonEl.setAttribute('onclick', action);

    return buttonEl;
  }

  getFormValues() {
    const form = {};
    const formElements = document.querySelector('form').elements;

    for (let i = 0; i < formElements.length; i++) {
      const el = formElements[i];
      form[el.name] = el.value;
    }

    return form;
  }
}