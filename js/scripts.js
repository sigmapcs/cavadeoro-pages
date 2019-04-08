(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _menu = require('./modules/menu');

var _ageGate = require('./modules/age-gate1');

var _slider = require('./modules/slider');

var _instagram = require('./modules/instagram');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ageGate = document.getElementById('age-gate');
console.log(ageGate);
if (ageGate) {
  (0, _ageGate.gate)();
};

(function (d) {})(document);

(function (d) {})(document);

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
  // const titleTequila =  d.getElementById('lastTitle')
  // console.log(titleTequila)
  // const hl = d.getElementById('hl')
  // console.log(hl)
  // hl.style.width= `${titleTequila.clientWidth}px`
})(document);

(function (d) {
  if (!ageGate) {

    var contactFooter = document.getElementById('contact__footer');
    var imgs = [].concat(_toConsumableArray(contactFooter.querySelectorAll('img')));
    var cF = contactFooter.clientWidth;
    imgs.map(function (img) {
      img.style.height = cF / 5 + 'px';
    });
    var square = [].concat(_toConsumableArray(document.querySelectorAll('.square')));
    var size = square[0].clientWidth;
    square.map(function (el) {
      el.style.height = cF / 5 + 'px';
    });
    window.addEventListener('resize', function (e) {
      imgs.map(function (img) {
        img.style.height = contactFooter.clientWidth / 5 + 'px';
      });
      square.map(function (el) {
        el.style.height = contactFooter.clientWidth / 5 + 'px';
      });
    });
  }
})(document);

if (!ageGate) {
  (0, _menu.menu)(document.getElementById('toogle-nav'), document.getElementById('close-menu'), document.getElementById('navigator'));
}
if (!ageGate) {
  (0, _instagram.getImages)(document.getElementById('contact__footer'));
}

if (!ageGate && document.getElementById('slider')) (0, _slider.slider)(document.getElementById('slider'), document.getElementById('products-menu'));
;

(function (w, d, c) {
  if (!ageGate) {
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
  }
})(window, document, console.log);

},{"./modules/age-gate1":2,"./modules/instagram":3,"./modules/menu":4,"./modules/slider":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var gate = exports.gate = function gate() {
  var formInputs = document.getElementById('form-inputs');
  var year1 = document.getElementById('year1');
  year1.focus();
  var year2 = document.getElementById('year2');
  var month1 = document.getElementById('month1');
  var day1 = document.getElementById('day1');
  var inputs = [].concat(_toConsumableArray(formInputs.querySelectorAll('input')));
  var button = document.getElementById('send-input');
  inputs.forEach(function (input, i) {
    input.addEventListener('keyup', function (e) {
      var t = e.target;
      var maxLenght = t.getAttribute("maxlength");
      if (t.value.length == maxLenght) {
        if (i < 2) {
          inputs[i + 1].focus();
        } else {
          inputs[2].blur();
          button.classList.add('show');
          button.addEventListener('click', function (e) {
            var year = year1.value;
            var month = month1.value;
            var day = day1.value;
            var birdDate = new Date(year, month - 1, day);
            var now = new Date();
            console.log(getYears(now - birdDate));
            if (!birdDate * 1) {
              button.classList.remove('show');
              inputs.map(function (input) {
                return input.value = "";
              });
              inputs[0].focus();
              return;
            }
            if (getYears(now - birdDate) > 18) {
              sessionStorage.setItem('age', now - birdDate);
              location.href = "./";
            } else {
              button.classList.remove('show');
              inputs.map(function (input) {
                return input.value = "";
              });
              inputs[0].focus();
            }
          });
        }
      }
    });
  });
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getImages = exports.getImages = function getImages(container) {
  var images = [].concat(_toConsumableArray(container.querySelectorAll('.img img')));
  var links = [].concat(_toConsumableArray(container.querySelectorAll('.img a')));
  axios.get('https://api.instagram.com/v1/users/self/media/recent?access_token=1800102315.1677ed0.a6f1b7763fc44afcb3e3a6e9c7f98fbb').then(function (res) {
    // console.log(res.data.data)
    showData(res.data.data, images, links);
  }).catch(function (err) {
    return console.log(err);
  });
};

var showData = function showData(data, images, links) {
  console.log(images);
  data.forEach(function (da, i) {
    if (i < images.length) {
      images[i].src = da.images.standard_resolution.url;
      links[i].href = da.link;
      console.log(da);
    }
  });
};

},{}],4:[function(require,module,exports){
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
  var header = document.getElementById('Header');
  console.log(header);
  _menu.addEventListener('click', function (e) {
    var t = e.target;
    if (t.nodeName === 'A') {
      console.dir(t);
      var linksTarget = $('.btn-target');
      e.preventDefault();
      var link = t.hash;
      close.click();
      $('html, body').animate({
        scrollTop: $(link).offset().top
      }, 2000);
    }
  });
  var logo = document.querySelector('.logo');
  console.log(logo.hash);
  logo.addEventListener('click', function (e) {
    var link = e.target.parentElement.hash;
    e.preventDefault();
    close.click();
    $('html, body').animate({
      scrollTop: $(link).offset().top
    }, 2000);
  });
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var slider = exports.slider = function slider(parent, menu) {
  console.log(parent, menu);
  // const menuLink = [...menu.querySelectorAll('li')]
  menu.addEventListener('click', function (e) {
    var t = e.target;
    console.log(t.nodeName);
    var menuLi = [].concat(_toConsumableArray(menu.querySelectorAll('li')));
    if (t.nodeName === 'LI') {
      menuLi.map(function (el) {
        return el.classList.remove('show');
      });
      var idMenu = t.dataset.id;
      t.classList.add('show');
      activeSlider(parent, idMenu);
    }
  });
};

var activeSlider = function activeSlider(slides, idMenu) {
  var imagesSlider = [].concat(_toConsumableArray(slides.querySelectorAll('img')));
  imagesSlider.map(function (img) {
    return img.classList.remove('show');
  });
  imagesSlider[idMenu].classList.add('show');
};

},{}]},{},[1]);

//# sourceMappingURL=scripts.js.map
