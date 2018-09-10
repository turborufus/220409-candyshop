'use strict';

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
var GOODS_IN_CART_NUMBER = 3;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomIndexes = function (arrayLength) {
  var randomIndexes = [];
  for (var i = 0; i < arrayLength; i++) { // заполняем массив
    randomIndexes.push(i);
  }

  for (i = arrayLength - 1; i > 0; i--) { // перемешиваем элементы
    var j = getRandomInt(0, i);
    var temp = randomIndexes[j];
    randomIndexes[j] = randomIndexes[i];
    randomIndexes[i] = temp;
  }

  return randomIndexes;
};

var createGoodsList = function (goodsNumber) {
  var goodsList = [];

  var randomNameIndexes = createRandomIndexes(GOODS_NAMES.length);
  var randomPictureIndexes = createRandomIndexes(GOODS_PICTURES.length);
  var randomContentsIndexes = createRandomIndexes(GOODS_CONTENTS.length);

  for (var i = 0; i < goodsNumber; i++) {
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
    goodItem.amount = getRandomInt(0, 20);
    goodItem.picture = 'img/cards/' + GOODS_PICTURES[randomPictureIndexes[i]];
    goodItem.price = getRandomInt(100, 1500);
    goodItem.weight = getRandomInt(30, 300);
    goodItem.rating.value = getRandomInt(1, 5);
    goodItem.rating.number = getRandomInt(10, 900);

    var hasSugar = false;
    if (Math.round(Math.random())) {
      hasSugar = true;
    }
    goodItem.nutritionFacts.sugar = hasSugar;
    goodItem.nutritionFacts.energy = getRandomInt(70, 500);

    var contentsAmount = getRandomInt(2, 7);
    var minIndex = getRandomInt(0, GOODS_CONTENTS.length - contentsAmount);
    for (var j = minIndex; j < minIndex + contentsAmount; j++) {
      if (j === minIndex) {
        goodItem.nutritionFacts.contents = GOODS_CONTENTS[randomContentsIndexes[j]];
      } else {
        goodItem.nutritionFacts.contents += ', ';
        goodItem.nutritionFacts.contents += GOODS_CONTENTS[randomContentsIndexes[j]];
      }
    }

    goodsList.push(goodItem);
  }

  return goodsList;
};

var createCard = function (cardTemplate, goodObject) {
  var goodElement = cardTemplate.cloneNode(true);

  var amount = goodObject.amount;
  var availabilityClass = 'card--in-stock';
  if (amount === 0) {
    availabilityClass = 'card--soon';
  } else if ((goodsList[i].amount >= 1) && (goodsList[i].amount <= 5)) {
    availabilityClass = 'card--little';
  }
  goodElement.classList.add(availabilityClass);

  var title = goodElement.querySelector('.card__title');
  title.textContent = goodObject.name;

  var picture = goodElement.querySelector('.card__img');
  picture.src = goodObject.picture;
  picture.alt = goodObject.name;

  var price = goodElement.querySelector('.card__price');
  price.textContent = goodObject.price;

//  var weight = goodElement.querySelector('.card__weight');
//  weight.textContent = '/ ' + goodObject.weight + ' Г';

  var rating = goodElement.querySelector('.card__rating');
  var ratingClass = '';
  switch (goodObject.rating.value) {
    case 1:
      ratingClass = 'stars__rating--one';
      break;
    case 2:
      ratingClass = 'stars__rating--two';
      break;
    case 3:
      ratingClass = 'stars__rating--three';
      break;
    case 4:
      ratingClass = 'stars__rating--four';
      break;
    case 5:
      ratingClass = 'stars__rating--five';
      break;
    default:
      ratingClass = '';
      break;
  }
  rating.classList.add(ratingClass);

  var starCount = goodElement.querySelector('.star__count');
  starCount.textContent = goodObject.rating.number;

  var sugarText = 'Без сахара. ';
  if (goodObject.nutritionFacts.sugar) {
    sugarText = 'Содержит сахар. ';
  }
  var characteristic = goodElement.querySelector('.card__characteristic');
  characteristic.textContent = sugarText + goodObject.nutritionFacts.energy + ' ккал';

  var compositionList = goodElement.querySelector('.card__composition-list');
  compositionList.textContent = goodObject.nutritionFacts.contents;

  return goodElement;
};

var createCardInCart = function (cardInCartTemplate, goodObject) {
  var goodElement = cardTemplate.cloneNode(true);

  var title = goodElement.querySelector('.card-order__title');
  title.textContent = goodObject.name;

  var picture = goodElement.querySelector('.card-order__img');
  picture.src = goodObject.picture;
  picture.alt = goodObject.name;

  var price = goodElement.querySelector('.card-order__price');
  price.textContent = goodObject.price + ' ₽';

  return goodElement;
};

var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var catalogLoad = catalogCards.querySelector('.catalog__load');
catalogLoad.classList.add('visually-hidden');

var goodsList = createGoodsList(GOODS_NUMBER);
var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

for (var i = 0; i < goodsList.length; i++) {
  var goodElement = createCard(cardTemplate, goodsList[i]);
  catalogCards.appendChild(goodElement);
}

var cardsInCart = document.querySelector('.goods__cards');
cardsInCart.classList.remove('goods__cards--empty');

var cardEmpty = document.querySelector('.goods__card-empty');
cardEmpty.classList.add('visually-hidden');

var goodsInCartList = createGoodsList(GOODS_IN_CART_NUMBER);
var cardInCartTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

for (i = 0; i < goodsInCartList.length; i++) {
  var elementInCart = createCardInCart(cardInCartTemplate, goodsInCartList[i]);
  cardsInCart.appendChild(elementInCart);
}


