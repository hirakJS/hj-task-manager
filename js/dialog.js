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

const Dialog = (function(){
  return {
    create: createDialog,
    data: getFormValues
  };
}());

function createDialog(dialogObj) {
  const id = dialogObj.id;
  const title = dialogObj.title;
  const body = dialogObj.body;

  const divEl = document.createElement('div');
  divEl.id = id;
  divEl.setAttribute('class', 'dialog');

  const dialogHeaderEl = document.createElement('div');
  dialogHeaderEl.setAttribute('class', 'dialog-header');
  dialogHeaderEl.innerHTML = title;

  const dialogBodyEl = document.createElement('div');
  dialogBodyEl.setAttribute('class', 'dialog-body');

  const formEl = document.createElement('form');
  
  const textInputEl = createInputEl('text-one', 'text', 'text-one', '', 'Title');

  const textAreaEl = createTextAreaEl('description', 'Description');

  const dialogFooterEl = document.createElement('div');
  dialogFooterEl.setAttribute('class', 'dialog-footer');
  dialogFooterEl.appendChild(createButtonEl('cancel', 'Cancel', 'closeDialog()', true));
  dialogFooterEl.appendChild(createButtonEl('submit', 'Submit', 'addCard(event)'));
  
  if (textInputEl.labelEl)
    formEl.appendChild(textInputEl.labelEl);
  formEl.appendChild(textInputEl.inputEl);

  if (textAreaEl.labelEl)
    formEl.appendChild(textAreaEl.labelEl);
  formEl.appendChild(textAreaEl.inputEl);

  dialogBodyEl.appendChild(formEl);

  divEl.appendChild(dialogHeaderEl);
  divEl.appendChild(dialogBodyEl);
  divEl.appendChild(dialogFooterEl);

  return divEl;
}

function createInputEl(id, type, name, value, label) {
  const inputEl = document.createElement('input');
  inputEl.id = id;
  inputEl.type = type;
  inputEl.name = name;

  return {
    inputEl: inputEl,
    labelEl: label ? createLabelEl(name, label) : null
  };
}

function createTextAreaEl(name, label) {
  const textAreaEl = document.createElement('textarea');
  textAreaEl.name = name;
  textAreaEl.rows = "10";

  return {
    inputEl: textAreaEl,
    labelEl: label ? createLabelEl(name, label) : null
  };
}

function createLabelEl(forName, value) {
  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', forName);
  labelEl.innerHTML = value;
  return labelEl;
}

function createButtonEl(id, label, action, hasNoBackground) {
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

function getFormValues() {
  const form = {};
  const formElements = document.querySelector('form').elements;

  form.title = formElements["text-one"].value;

  return form;
}