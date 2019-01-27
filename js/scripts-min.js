(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _menu = require('./modules/menu');

var _ageGate = require('./modules/age-gate');

var _slider = require('./modules/slider');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ageGate = document.getElementById('age-gate');

if (ageGate) {
  (0, _ageGate.gate)();
};

(function (d) {})(document);

(function (d) {
  var menu = $('#Header');
  menu.on('click', 'a', function (e) {
    e.preventDefault();
    var link = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(link).offset().top
    }, 2000);
    $('#close-menu').trigger('click');
  });
})(document);

(function (d) {
  var products = [].concat(_toConsumableArray(d.querySelectorAll('.banner-img')));
  products.map(function (prod) {
    var width = prod.clientWidth;
    prod.style.height = width + 'px';
  });
})(document);

(function (d) {
  d.getElementById('current-year').textContent = new Date().getFullYear();
})(document);

(function (d) {
  var square = [].concat(_toConsumableArray(document.querySelectorAll('.square')));
  var size = square[0].clientWidth;
  square.map(function (el) {
    el.style.height = size + 'px';
  });
})(document);

(0, _menu.menu)(document.getElementById('togle-nav'), document.getElementById('close-menu'), document.getElementById('navigator'));

if (!ageGate && document.getElementById('slider')) (0, _slider.slider)(document.getElementById('slider'), document.getElementById('products-menu'));
;

(function (w, d, c) {
  var form = d.forms[0];
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var button = e.target.querySelector('button');
    var notes = d.getElementById("notes");
    var msg = notes.querySelector('p');
    var data = new FormData(e.target),
        t = e.target,
        url = t.action,
        authOptions = {
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    };
    axios(authOptions).then(function (res) {
      var resp = res.data;
      msg.innerHTML = resp.msg;
      if (resp.status) {
        notes.classList.remove('error');
        notes.classList.add('success');
        button.classList.add('disabled');
        button.textContent = "Enviado";
        button.setAttribute('disabled', 'disabled');
      } else {
        msg.classList.add('error');
        msg.classList.remove('success');
      }
    }).catch(function (err) {
      return c(err);
    });
  });
})(window, document, console.log);

},{"./modules/age-gate":2,"./modules/menu":3,"./modules/slider":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var gate = exports.gate = function gate() {
  var form = document.getElementById('form-age-gate');
  var year = document.getElementById('input-year');
  var month = document.getElementById('input-month');
  var day = document.getElementById('input-day');

  var inputs = [].concat(_toConsumableArray(form.querySelectorAll('input')));

  var character = void 0;

  year.addEventListener('keyup', function (e) {
    var maxLenght = e.target.getAttribute("maxlength");
    var max = e.target.getAttribute("max");
    if (e.target.value.length == maxLenght) {
      verifyInput(e.target, maxLenght, max, inputs);
    }
  });

  month.addEventListener('keyup', function (e) {
    var maxLenght = e.target.getAttribute("maxlength");
    var max = e.target.getAttribute("max");
    if (e.target.value.length == maxLenght) {
      verifyInput(e.target, maxLenght, max, inputs);
    }
  });

  day.addEventListener('keyup', function (e) {
    var maxLenght = e.target.getAttribute("maxlength");
    var max = e.target.getAttribute("max");
    if (e.target.value.length == maxLenght) {
      verifyInput(e.target, maxLenght, max, inputs);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    processForm(e.target);
  });
};

var verifyInput = function verifyInput(input, mL, m, inputs) {
  var num = input.value * 1;
  if (!num || num > m) {
    input.value = '';
    input.focus();
  } else {
    if (!input.classList.contains('input-day')) {
      input.parentElement.parentElement.nextElementSibling.querySelector('input').focus();
    } else {
      var button = input.parentElement.parentElement.parentElement.parentElement.querySelector('button');
      button.classList.add('show');
      button.focus();
    }
  }
};

var processForm = function processForm(form) {
  var data = new FormData(form);
  var button = form.querySelector('button');
  button.textContent = "";
  button.innerHTML = '<img src="img/Rolling-1s-200px.svg">';
  var year = data.get('year');
  var month = data.get('month');
  var day = data.get('day');
  var birdDate = new Date(year, month - 1, day);
  var now = new Date();
  setTimeout(function () {
    if (getYears(now - birdDate) > 18) {
      sessionStorage.setItem('age', now - birdDate);
      location.href = "./";
    } else {
      button.innerHTML = '';
      button.textContent = 'Enter';
      button.classList.remove('show');

      var inputs = [].concat(_toConsumableArray(form.querySelectorAll('input')));
      inputs.map(function (input) {
        return input.value = "";
      });
      inputs[0].focus();
    }
  }, 2000);
};

var getSecond = function getSecond(ms) {
  return Math.round(ms / 1000);
};
var getMinutes = function getMinutes(ms) {
  return getSecond(ms) / 60;
};
var getHours = function getHours(ms) {
  return getMinutes(ms) / 60;
};
var getDays = function getDays(ms) {
  return getHours(ms) / 24;
};
var getYears = function getYears(ms) {
  return getDays(ms) / 365;
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var menu = exports.menu = function menu(open, close, _menu) {
  open.addEventListener('click', function (e) {
    _menu.classList.add('show');
  });
  close.addEventListener('click', function (e) {
    _menu.classList.remove('show');
  });
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var slider = exports.slider = function slider(parent, menu) {
  var slides = [].concat(_toConsumableArray(parent.querySelectorAll('.product')));
  menu.addEventListener('click', function (e) {
    var _t = e.target;
    if (_t.tagName === 'LI') {
      // console.log(_t.dataset.id)
      var _this = e.target;
      activeSlider(slides, _t.dataset.id, menu, _this);
    }
  });
};

var activeSlider = function activeSlider(slides, id, menu, _this) {
  var links = [].concat(_toConsumableArray(menu.querySelectorAll('li')));
  links.map(function (el) {
    return el.classList.remove('show');
  });
  _this.classList.add('show');
  slides.map(function (el) {
    el.classList.remove('show');
  });
  slides[id].classList.add('show');
};

},{}]},{},[1]);

//# sourceMappingURL=scripts-min.js.map
