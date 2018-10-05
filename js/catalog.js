'use strict';

(function () {
  var catalogElements = document.querySelector('.catalog__cards');
  catalogElements.classList.remove('catalog__cards--load');
  var catalogLoad = catalogElements.querySelector('.catalog__load');
  catalogLoad.classList.add('visually-hidden');

  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

  // создание карточки товара для Каталога
  var createCard = function (goodObject) {
    var goodElement = cardTemplate.cloneNode(true);

    var amount = goodObject.amount;
    goodElement.classList.remove('card--in--stock');
    var availabilityClass = 'card--in-stock';
    if (amount === 0) {
      availabilityClass = 'card--soon';
      goodElement.querySelector('.card__btn').disabled = true;
    } else if ((amount >= 1) && (amount <= 5)) {
      availabilityClass = 'card--little';
    }
    goodElement.classList.add(availabilityClass);

    goodElement.querySelector('.card__title').textContent = goodObject.name;
    goodElement.querySelector('.card__img').src = goodObject.picture;
    goodElement.querySelector('.card__img').alt = goodObject.name;

    var price = goodElement.querySelector('.card__price');
    price.firstChild.textContent = goodObject.price;

    goodElement.querySelector('.card__weight').textContent = '/ ' + goodObject.weight + ' Г';

    var rating = goodElement.querySelector('.stars__rating');
    rating.classList.remove('stars__rating--five');
    var ratingValue = goodObject.rating.value;
    var ratingClass = '';
    switch (ratingValue) {
      case 1:
        ratingClass = 'one';
        break;
      case 2:
        ratingClass = 'two';
        break;
      case 3:
        ratingClass = 'three';
        break;
      case 4:
        ratingClass = 'four';
        break;
      case 5:
        ratingClass = 'five';
        break;
      default:
        ratingClass = '';
        break;
    }
    rating.textContent = ratingValue + ' ' + window.util.numDecline(ratingValue, 'звезда', 'звёзд', 'звезды');
    rating.classList.add('stars__rating--' + ratingClass);

    goodElement.querySelector('.star__count').textContent = goodObject.rating.number;

    var sugarText = 'Без сахара. ';
    if (goodObject.nutritionFacts.sugar) {
      sugarText = 'Содержит сахар. ';
    }
    goodElement.querySelector('.card__characteristic').textContent = sugarText + goodObject.nutritionFacts.energy + ' ккал';
    goodElement.querySelector('.card__composition-list').textContent = goodObject.nutritionFacts.contents;

    return goodElement;
  };

  var renderCatalog = function () {
    var fragmentOfCards = document.createDocumentFragment();
    for (var i = 0; i < window.data.goods.length; i++) {
      var goodElement = createCard(window.data.goods[i]);
      fragmentOfCards.appendChild(goodElement);
    }
    catalogElements.appendChild(fragmentOfCards);
  };

    // обработчик добавления в корзину
  var addGoodInCart = function (title) {
    var indexOfGood = window.util.getIndexByTitle(window.data.goods, title);
    var indexOfGoodInCart = window.util.getIndexByTitle(window.data.goodsInCart, title);
    // товара в корзине нет
    if (indexOfGoodInCart === -1) {
      window.cart.addGood(window.data.goods[indexOfGood]);
    } else { // товар в корзине есть
      window.cart.increaseAmountOfGood(indexOfGoodInCart);
    }
  };

  var processCatalogEvent = function (eventString, target) {
    while (target !== catalogElements) {
      if (target.classList.contains('catalog__card')) {
        if (eventString === 'favorite') {
          target.classList.toggle('card__btn-favorite--selected');
          target.querySelector('.card__btn-favorite').blur();
          break;
        } else if (eventString === 'add_in_cart') {
          var title = target.querySelector('.card__title').textContent;
          addGoodInCart(title);
          break;
        } else if (eventString === 'show_composition') {
          var composition = target.querySelector('.card__composition');
          composition.classList.toggle('card__composition--hidden');
        }
      }
      target = target.parentNode;
    }
  };

  var onCatalogCardsClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('card__btn-favorite')) {
      // обработка события добавления/удаления из Избранного
      processCatalogEvent('favorite', target);
    } else if (target.classList.contains('card__btn') && !target.disabled) {
      // добавление товара в корзину
      processCatalogEvent('add_in_cart', target);
    } else if (target.classList.contains('card__btn-composition')) {
      // закрывает / раскрывает состав карточки
      processCatalogEvent('show_composition', target);
    }
  };

  renderCatalog();

  catalogElements.addEventListener('click', onCatalogCardsClick);

})();
