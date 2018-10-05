'use strict';

(function () {
  var GOODS_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие',
    'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн',
    'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке',
    'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение',
    'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];

  var GOODS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона',
    'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля',
    'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия',
    'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

  var GOODS_PICTURES = ['gum-cedar.jpg', 'gum-chile.jpg', 'gum-eggplant.jpg', 'gum-mustard.jpg', 'gum-portwine.jpg',
    'gum-wasabi.jpg', 'ice-cucumber.jpg', 'ice-eggplant.jpg', 'ice-garlic.jpg', 'ice-italian.jpg',
    'ice-mushroom.jpg', 'ice-pig.jpg', 'marmalade-beer.jpg', 'marmalade-caviar.jpg', 'marmalade-corn.jpg',
    'marmalade-new-year.jpg', 'marmalade-sour.jpg', 'marshmallow-bacon.jpg', 'marshmallow-beer.jpg', 'marshmallow-shrimp.jpg',
    'marshmallow-spicy.jpg', 'marshmallow-wine.jpg', 'soda-bacon.jpg', 'soda-celery.jpg', 'soda-cob.jpg',
    'soda-garlic.jpg', 'soda-peanut-grapes.jpg', 'soda-russian.jpg'];

  var GOODS_NUMBER = 26; // размер массива объектов

  var createRandomGoodsObjects = function () {
    var goodsObjects = [];

    var randomNameIndexes = window.util.createRandomIndexes(GOODS_NAMES.length);
    var randomPictureIndexes = window.util.createRandomIndexes(GOODS_PICTURES.length);
    var randomContentsIndexes = window.util.createRandomIndexes(GOODS_CONTENTS.length);

    for (var i = 0; i < GOODS_NUMBER; i++) {
      var goodItem = {
        name: '', // случайное значение из GOODS_NAMES
        picture: '', // случайное изображение из 'img/cards' + GOODS_PICTURES
        amount: 0, // количество, число от 0 до 20
        price: 0, // стоимость, от 100 до 1500
        weight: 0, // вес в граммах, от 30 до 300
        rating: {
          value: 0, // оценка: целое число от 1 до 5;
          number: 0 // количество оценок: целое число от 10 до 900
        },
        nutritionFacts: {
          sugar: false, // содержание сахара. Значение генерируется случайным образом
          energy: 0, // энергетическая ценность: целое число от 70 до 500
          contents: '' // состав: сгенерированная случайным образом строка. Генерируется из строк массива GOODS_CONTENTS
        }
      };

      goodItem.name = GOODS_NAMES[randomNameIndexes[i]];
      goodItem.amount = window.util.getRandomInt(0, 20);
      goodItem.picture = 'img/cards/' + GOODS_PICTURES[randomPictureIndexes[i]];
      goodItem.price = window.util.getRandomInt(100, 1500);
      goodItem.weight = window.util.getRandomInt(30, 300);
      goodItem.rating.value = window.util.getRandomInt(1, 5);
      goodItem.rating.number = window.util.getRandomInt(10, 900);

      var hasSugar = false;
      if (Math.round(Math.random())) {
        hasSugar = true;
      }
      goodItem.nutritionFacts.sugar = hasSugar;
      goodItem.nutritionFacts.energy = window.util.getRandomInt(70, 500);

      var contentsAmount = window.util.getRandomInt(2, 7);
      var minIndex = window.util.getRandomInt(0, GOODS_CONTENTS.length - contentsAmount);
      for (var j = minIndex; j < minIndex + contentsAmount; j++) {
        if (j === minIndex) {
          goodItem.nutritionFacts.contents = GOODS_CONTENTS[randomContentsIndexes[j]];
        } else {
          goodItem.nutritionFacts.contents += ', ';
          goodItem.nutritionFacts.contents += GOODS_CONTENTS[randomContentsIndexes[j]];
        }
      }

      goodsObjects.push(goodItem);
    }

    return goodsObjects;
  };

  var goodsObjects = createRandomGoodsObjects();
  var goodsInCartObjects = [];

  window.data = {
    goods: goodsObjects,
    goodsInCart: goodsInCartObjects
  };

})();
