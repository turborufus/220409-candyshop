'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/candyshop/data';
  var URL_UPLOAD = 'https://js.dump.academy/candyshop';
  var SERVER_TIMEOUT = 10000;
  var CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var initXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE.OK) {
        onSuccess(xhr.response);
      } else if (xhr.status === CODE.BAD_REQUEST) {
        onError('Неправильный запрос: ' + xhr.status);
      } else if (xhr.status === CODE.NOT_FOUND) {
        onError('Ничего не найдено: ' + xhr.status);
      } else if (xhr.status === CODE.INTERNAL_SERVER_ERROR) {
        onError('Внутренняя ошибка сервера: ' + xhr.status);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = initXHR(onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = initXHR(onSuccess, onError);
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload
  };

})();
