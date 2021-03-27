/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    

    view.on('add', this.addTodo.bind(this));
    view.on('toggle', this.toggleTodo.bind(this));
    view.on('edit', this.editTodo.bind(this));
    view.on('remove', this.removeTodo.bind(this));
 
    view.show(model.state);
  }



  addTodo(title) {
    //test 
    console.log(title);

    const todo = this.model.addItem({
      
      id: Date.now(),
      
      title,
      titlefromController: 'fromController',
      completed: false,
    });

    this.view.addItem(todo);
  }
 
  toggleTodo( {id, completed}) {
     const todo = this.model.updateItem(id, {completed});

     this.view.toggleItem(todo);
  }

  editTodo({id, title}) {
    const todo = this.model.updateItem(id, {title});

    this.view.editItem(todo);
  }

  removeTodo(id) {
    console.log(id);
      this.model.removeItem(id);
      this.view.removeItem(id);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);



/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter),
/* harmony export */   "save": () => (/* binding */ save),
/* harmony export */   "load": () => (/* binding */ load)
/* harmony export */ });
function createElement(tag, props, ...children) {
  const element = document.createElement(tag);

  Object.keys(props).forEach(key => {
    if(key.search('data') !== -1) {
      element.setAttribute(key, props[key]);

    }  else {

      element[key] = props[key];
    }
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;

}

class EventEmitter {
  constructor() {
    this.events = {};

  }

  on(type, callback) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(callback);
  }
  emit(type, arg) {


    if (this.events[type]) {


      this.events[type].forEach(callback => callback(arg));
    }


  }
}

function save(data) {
  const string = JSON.stringify(data);

  localStorage.setItem('todos', string);
}

function load() {
  const string = localStorage.getItem('todos');
  const data = JSON.parse(string);

  return data;
}



/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");


class Model extends _helpers__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  constructor( state= []) {
    super();

    this.state = state;
  } 

  getItem(id) { 
    return this.state.find(item => item.id == id);
  }
 
  addItem(item) {
    

    this.state.push(item);

    this.emit('change', this.state);

    // save(item);
    
    return item;
  }

  updateItem(id, data) {
    const item = this.getItem(id);

    Object.keys(data).forEach(prop => item[prop] = data[prop]);

    this.emit('change', this.state);


    


    return item;
  }

  removeItem(id) {
    const index = this.state.findIndex(item => item.id == id);

    


    if( index > -1) {
      this.state.splice(index, 1);
    }

    this.emit('change', this.state);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Model);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers.js */ "./src/helpers.js");


class View extends _helpers_js__WEBPACK_IMPORTED_MODULE_0__.EventEmitter {
  constructor() {
    super();

    this.form = document.getElementById('todo-form');
    this.input = document.getElementById('add-input');
    this.list = document.getElementById('todo-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this));



  }

  createElement(todo) {
    const checkbox = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      type: 'checkbox',
      className: 'checkbox',
      checked: todo.completed ? 'checked ' : ''
    });
    const label = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('label', {
      className: 'title'
    }, todo.title);
    const editInput = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('input', {
      type: 'text',
      className: 'textfield'
    });
    const editButton = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      className: 'edit',
    }, 'изменить');
    const removeButton = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('button', {
      className: 'remove',
    }, 'удалить');
    const item = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createElement)('li', {
        className: `todo-item${todo.completed ? ' completed' : ' '}`,
        'data-id': todo.id
      },
      checkbox, label, editInput, editButton, removeButton);

    


    return this.addEventListeners(item);
  }

  addEventListeners(listItem) {
    
    const checkbox = listItem.querySelector('.checkbox');
    const editButton = listItem.querySelector('button.edit');
    const removeButton = listItem.querySelector('button.remove');

    checkbox.addEventListener('change', this.handleToggle.bind(this));
    editButton.addEventListener('click', this.handleEdit.bind(this));
    removeButton.addEventListener('click', this.handleRemove.bind(this));

    return listItem;
  }

  handleAdd(event) {
    event.preventDefault();

    if (!this.input.value) {
      return alert('необходимо ввести название задачи');
    }

    const value = this.input.value;

    this.emit('add', value);
  }

  handleToggle({
    target
  }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    const completed = target.checked;

    this.emit('toggle', {
      id,
      completed
    });
  }

  handleEdit({
    target
  }) {
    const listItem = target.parentNode;

    const id = listItem.getAttribute('data-id');

    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editButton = listItem.querySelector('button.edit');
    const title = input.value;
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
      this.emit('edit', {
        id,
        title
      });
    } else {
      input.value = label.textContent;
      editButton.textContent = 'сохранить';
      listItem.classList.add('editing');
    }
  }

  handleRemove({
    target
  }) {
    const listItem = target.parentNode;
    const id = listItem.getAttribute('data-id');
    this.emit('remove', id);

  }

  show(todos) {
    todos.forEach(todo => {
      const listItem = this.createElement(todo);

      this.list.appendChild(listItem);
    });
  }


  findListItem(id) {
    return this.list.querySelector(`[data-id="${id}"]`);
  }

  addItem(todo) {
    const listItem = this.createElement(todo);

    this.input.value = '';
    this.list.appendChild(listItem);
  }

  toggleItem(todo) {
    const listItem = this.findListItem(todo.id);
    const checkbox = listItem.querySelector('.checkbox');

    checkbox.checked = todo.completed;

    if (todo.completed) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }

  }

  editItem(todo) {
    const listItem = this.findListItem(todo.id);
    const label = listItem.querySelector('.title');
    const input = listItem.querySelector('.textfield');
    const editButton = listItem.querySelector('button.edit');

    label.textContent = todo.title;
    editButton.textContent = 'изменить';
    listItem.classList.remove('editing');

  }

  removeItem(id) {

    // const listItem = this.findListItem(todo.id);
    const listItem = this.findListItem(id);

    this.list.removeChild(listItem);
  }


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (View);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ "./src/controller.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");
// const myModule  = require('./main');

// const myModuleInstance = new myModule();

// myModuleInstance.hello();  
// myModuleInstance.by(); 
// myModuleInstance.by(); 
// myModuleInstance.by(); 







const state = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.load)();


//test
// const model = new Model();
const model = new _model__WEBPACK_IMPORTED_MODULE_0__.default(state || undefined);
model.on('change', state => (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.save)(state));
// model.on('change', state => console.log(state));


const view = new _view__WEBPACK_IMPORTED_MODULE_1__.default();
const controller = new _controller__WEBPACK_IMPORTED_MODULE_2__.default(model, view);
})();

/******/ })()
;
//# sourceMappingURL=app.js.map